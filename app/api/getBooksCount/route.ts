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

    // Get the username from the query parameters
    const url = new URL(request.url);
    const username = url.searchParams.get('username');

    try {
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: SHEET_ID as string,
            range: 'bookshelf!A2:G',
        });

        const rows = response.data.values || [];
        const userBooks = rows.filter(row => row[5] === username); // Assuming username is in the 6th column (F)

        return NextResponse.json({ count: userBooks.length });
    } catch (error) {
        console.error('Error fetching books from Google Sheets:', error);
        return NextResponse.json({ message: 'Failed to fetch books.' }, { status: 500 });
    }
};