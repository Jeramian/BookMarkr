import { NextResponse } from 'next/server';
import { google } from 'googleapis';

export const DELETE = async (request: Request) => {
    try {
        const { bookId } = await request.json();

        if (!bookId) {
            return NextResponse.json({ message: 'Book ID is required' }, { status: 400 });
        }

        const { PRIVATEKEY, CLIENTEMAIL, SHEET_ID } = process.env;

        const auth = new google.auth.JWT({
            email: CLIENTEMAIL,
            key: PRIVATEKEY,
            scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });

        const sheets = google.sheets({ version: 'v4', auth });

        // Retrieve all rows
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: SHEET_ID as string,
            range: 'wishlist!A:G',
        });

        const rows = response.data.values;

        if (!rows || rows.length === 0) {
            return NextResponse.json({ message: 'No books found in the sheet.' }, { status: 404 });
        }

        // Find the index of the row with the specific book ID
        const rowIndex = rows.findIndex(row => row[4] === bookId);

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
                                sheetId: 1046370208, // Update this to your actual sheet ID
                                dimension: 'ROWS',
                                startIndex: rowIndex,
                                endIndex: rowIndex + 1,
                            },
                        },
                    },
                ],
            },
        };

        await sheets.spreadsheets.batchUpdate(deleteRequest);

        return NextResponse.json({ message: 'Book removed successfully!' });
    } catch (error) {
        console.error('Error removing book from Google Sheets:', error);
        
        // Enhance error logging
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        return NextResponse.json({ message: 'Failed to remove book from Google Sheets.', error: errorMessage }, { status: 500 });
    }
};