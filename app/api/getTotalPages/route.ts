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

    try {
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: SHEET_ID as string,
            range: 'bookshelf!A2:G', // Adjust range as needed
        });

        const rows = response.data.values || [];
        const totalPages = rows.reduce((sum, row) => {
            if (row[5] === username) { // Assuming username is in the 6th column (F)
                return sum + (parseInt(row[2]) || 0); // Assuming page count is in the 3rd column (C)
            }
            return sum;
        }, 0);

        return NextResponse.json({ totalPages });
    } catch (error) {
        console.error('Error fetching total pages from Google Sheets:', error);
        return NextResponse.json({ message: 'Failed to fetch total pages.' }, { status: 500 });
    }
};