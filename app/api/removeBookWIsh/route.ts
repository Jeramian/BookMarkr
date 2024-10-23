import { NextResponse } from 'next/server';
import { google } from 'googleapis';

export const DELETE = async (request: Request) => {
    try {
        const { bookId } = await request.json();

        // Check if bookId is provided
        if (!bookId) {
            return NextResponse.json({ message: 'Book ID is required' }, { status: 400 });
        }

        const { PRIVATEKEY, CLIENTEMAIL, SHEET_ID } = process.env;

        // Ensure all necessary environment variables are set
        if (!PRIVATEKEY || !CLIENTEMAIL || !SHEET_ID) {
            return NextResponse.json({ message: 'Environment variables are not set correctly' }, { status: 500 });
        }

        const auth = new google.auth.JWT({
            email: CLIENTEMAIL,
            key: PRIVATEKEY,
            scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });

        const sheets = google.sheets({ version: 'v4', auth });

        // Retrieve all rows from the specified range
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: SHEET_ID as string,
            range: 'wishlist!A:G',
        });

        const rows = response.data.values;

        // Log the rows for debugging
        console.log('Rows found:', rows);

        if (!rows || rows.length === 0) {
            return NextResponse.json({ message: 'No books found in the sheet.' }, { status: 404 });
        }

        // Find the index of the row with the specific book ID
        const rowIndex = rows.findIndex(row => row[4] === bookId);

        // Log the row index for debugging
        console.log('Row index found:', rowIndex);

        if (rowIndex === -1) {
            return NextResponse.json({ message: 'Book not found in the sheet.' }, { status: 404 });
        }

        // Prepare the delete request
        const deleteRequest = {
            spreadsheetId: SHEET_ID as string,
            resource: {
                requests: [
                    {
                        deleteDimension: {
                            range: {
                                sheetId: 1046370208, // Ensure this matches your actual sheet ID
                                dimension: 'ROWS',
                                startIndex: rowIndex,
                                endIndex: rowIndex + 1,
                            },
                        },
                    },
                ],
            },
        };

        // Execute the delete request
        await sheets.spreadsheets.batchUpdate(deleteRequest);

        return NextResponse.json({ message: 'Book removed successfully!' });
    } catch (error) {
        console.error('Error removing book from Google Sheets:', error);
        
        // Log more details about the error
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        console.error('Full error details:', error);
        
        return NextResponse.json({ message: 'Failed to remove book from Google Sheets.', error: errorMessage }, { status: 500 });
    }
};