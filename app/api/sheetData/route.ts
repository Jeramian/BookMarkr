import { NextResponse } from 'next/server';
import { google } from 'googleapis';

export async function GET() {
    try {
        const privateKey = process.env.PRIVATEKEY!;
        const clientEmail = process.env.CLIENTEMAIL!;
        const spreadsheetId = process.env.SHEET_ID!;

        // Check for required environment variables
        if (!privateKey || !clientEmail || !spreadsheetId) {
            console.error('Missing environment variables:', {
                privateKey: !!privateKey,
                clientEmail: !!clientEmail,
                spreadsheetId: !!spreadsheetId,
            });
            return NextResponse.json({ error: 'Missing environment variables' }, { status: 500 });
        }

        const auth = new google.auth.GoogleAuth({
            credentials: {
                client_email: clientEmail,
                private_key: privateKey.replace(/\\n/g, '\n'),
            },
            scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
        });

        const client = await auth.getClient();

        // Explicitly cast client to the expected type
        const sheets = google.sheets({ version: 'v4', auth: client as any });

        // Define the range of cells you want to retrieve
        const range = 'users!B2:B8'; // Adjust this range as needed

        // Get the response from Google Sheets API
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range,
        });

        // Check if response has data
        const data = response.data.values;

        if (data) {
            return NextResponse.json(data);
        } else {
            return NextResponse.json({ error: 'No data found' }, { status: 404 });
        }
    } catch (error: unknown) {
        console.error('Error fetching data from Google Sheets:', error);
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        } else {
            return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
        }
    }
}