import { NextResponse } from 'next/server';
import { google } from 'googleapis';

export const GET = async () => {
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
            range: 'wishlist!A2:G', // Adjust range as needed
        });

        const rows = response.data.values || [];
        const books = rows.map(row => ({
            id: row[4], // Assuming book ID is in the 5th column (E)
            volumeInfo: {
                title: row[0], // Assuming title is in the 1st column (A)
                authors: row[1]?.split(','), // Assuming authors are in the 2nd column (B)
                pageCount: row[2], // Assuming page count is in the 3rd column (C)
                categories: row[3]?.split(','), // Assuming categories are in the 4th column (D)
            }
        }));

        return NextResponse.json({ books });
    } catch (error) {
        console.error('Error fetching books from Google Sheets:', error);
        return NextResponse.json({ message: 'Failed to fetch books.' }, { status: 500 });
    }
};