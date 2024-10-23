import { NextResponse } from 'next/server';
import { google } from 'googleapis';

export const GET = async (request: Request) => {
    const { PRIVATEKEY, CLIENTEMAIL, SHEET_ID } = process.env;

    const auth = new google.auth.JWT({
        email: CLIENTEMAIL,
        key: PRIVATEKEY,
        scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    const url = new URL(request.url);
    const username = url.searchParams.get('username');

    if (!username) {
        return NextResponse.json({ message: 'Username is required.' }, { status: 400 });
    }

    try {
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: SHEET_ID as string,
            range: 'wishlist!A2:F',
        });

        const rows = response.data.values || [];
        console.log('Fetched rows:', rows); // Log fetched rows to debug

        const books = rows
            .filter(row => {
                // Log for debugging
                console.log('Comparing username:', username, 'with row username:', row[5]);
                return row[5] && row[5].toLowerCase() === username.toLowerCase(); // Case-insensitive comparison
            })
            .map(row => ({
                id: row[4], // Assuming book ID is in the 5th column (E)
                volumeInfo: {
                    title: row[0], // Assuming title is in the 1st column (A)
                    authors: row[1]?.split(','), // Assuming authors are in the 2nd column (B)
                    pageCount: row[2], // Assuming page count is in the 3rd column (C)
                    categories: row[3]?.split(','), // Assuming categories are in the 4th column (D)
                }
            }));

        console.log('Filtered books:', books); // Log filtered books
        return NextResponse.json({ books });
    } catch (error) {
        console.error('Error fetching books from Google Sheets:', error);
        return NextResponse.json({ message: 'Failed to fetch books.' }, { status: 500 });
    }
};