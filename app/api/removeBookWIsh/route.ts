import { NextResponse } from 'next/server';
import { google } from 'googleapis';

export const DELETE = async (request: Request) => {
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

    try {
        // Step 1: Retrieve all rows
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: SHEET_ID as string,
            range: 'wishlist!A:G',
        });

        const rows = response.data.values;

        if (!rows || rows.length === 0) {
            return NextResponse.json({ message: 'No books found in the sheet.' }, { status: 404 });
        }

        console.log('Rows in the sheet:', rows);

        // Step 2: Find the index of the row with the specific book ID
        const rowIndex = rows.findIndex(row => row[4] === bookId); // 4 is the index for book ID

        if (rowIndex === -1) {
            return NextResponse.json({ message: 'Book not found in the sheet.' }, { status: 404 });
        }

        // Calculate the indices correctly
        const startIndex = rowIndex;
        const endIndex = startIndex + 1;

        console.log(`Attempting to delete rows from ${startIndex} to ${endIndex}`);

        // Step 3: Construct delete request
        const deleteRequest = {
            spreadsheetId: SHEET_ID as string,
            resource: {
                requests: [
                    {
                        deleteDimension: {
                            range: {
                                sheetId: 1046370208, // Ensure this is the correct sheet ID
                                dimension: 'ROWS',
                                startIndex: startIndex,
                                endIndex: endIndex,
                            },
                        },
                    },
                ],
            },
        };

        console.log('Delete request:', JSON.stringify(deleteRequest, null, 2));

        // Step 4: Send delete request
        const deleteResponse = await sheets.spreadsheets.batchUpdate(deleteRequest);

        console.log('Delete response:', deleteResponse);

        return NextResponse.json({ message: 'Book removed successfully!' });
    } catch (error) {
        console.error('Error removing book from Google Sheets:', error);

        // Handle the error to avoid the "unknown" type issue
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        
        return NextResponse.json({ message: 'Failed to remove book from Google Sheets.', error: errorMessage }, { status: 500 });
    }
};