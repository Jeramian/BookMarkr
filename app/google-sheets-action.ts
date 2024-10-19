'use server'
import { google } from "googleapis";
import keys from './secrets.json';

export async function getSheetData() {
    const glAuth = await google.auth.getClient({
        projectId: keys.project_id,
        credentials: {
            "type": keys.type,
            "project_id": keys.project_id,
            "private_key_id": keys.private_key_id,
            "private_key": keys.private_key,
            "client_email": keys.client_email,
            "universe_domain": keys.universe_domain
        },
        scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const glsheets = google.sheets({ version: 'v4', auth: glAuth});

    const data = await glsheets.spreadsheets.values.get({
        spreadsheetId: process.env.SHEET_ID,
        range: 'users!A2:D2'
    });

    return { data: data.data.values };
}