import { NextResponse } from 'next/server';
import { google } from 'googleapis';

export const POST = async (request: Request) => {
    const { book, username } = await request.json(); // Extract username from the request

    console.log('Received book data:', book);
    console.log('Received username:', username);

    if (!book || !username) {
        return NextResponse.json({ message: 'Book data and username are required' }, { status: 400 });
    }

    const { PRIVATEKEY, CLIENTEMAIL, SHEET_ID } = process.env;

    const auth = new google.auth.JWT({
        email: CLIENTEMAIL,
        key: PRIVATEKEY,
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    const range = 'wishlist!A1'; // Adjust this based on where you want to append
    const valueInputOption = 'RAW';

    const values = [
        [
            book.volumeInfo.title,
            book.volumeInfo.authors?.join(', '),
            book.volumeInfo.pageCount,
            book.volumeInfo.categories?.join(', '),
            book.id,
            username, // Include the username
        ],
    ];

    const resource = {
        values,
    };

    try {
        const response = await sheets.spreadsheets.values.append({
            spreadsheetId: SHEET_ID as string,
            range,
            valueInputOption,
            requestBody: resource,
        });

        return NextResponse.json({ message: 'Book added successfully!', response });
    } catch (error) {
        console.error('Error adding book to Google Sheets:', error);
        return NextResponse.json({ message: 'Failed to add book to Google Sheets.' }, { status: 500 });
    }
};