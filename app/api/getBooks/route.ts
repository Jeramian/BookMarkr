import { NextResponse } from 'next/server';
import { google } from 'googleapis';

export const GET = async (request: Request) => { // Explicitly typing the request parameter
    const { PRIVATEKEY, CLIENTEMAIL, SHEET_ID } = process.env;

    const auth = new google.auth.JWT({
        email: CLIENTEMAIL,
        key: PRIVATEKEY,
        scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    try {
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: SHEET_ID as string,
            range: 'bookshelf!A2:G', // Adjust range as needed
        });

        const rows = response.data.values || [];
        console.log('Fetched rows:', rows); // Log fetched rows to debug

        // Get the username from the query parameters
        const url = new URL(request.url);
        const username = url.searchParams.get('username');

        if (!username) {
            return NextResponse.json({ message: 'Username is required.' }, { status: 400 });
        }

        const books = rows
            .filter(row => row[5] && row[5].toLowerCase() === username.toLowerCase()) // Assuming username is in the 6th column (F)
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