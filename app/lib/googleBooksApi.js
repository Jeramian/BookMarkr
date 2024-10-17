import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY;
const BASE_URL = 'https://www.googleapis.com/books/v1';

export const fetchBooks = async (query) => {
    try {
        const response = await axios.get(`${BASE_URL}/volumes`, {
            params: {
                q: query,
                key: API_KEY,
            },
        });
        console.log('Query:', query);
        console.log('Response:', response.data);
        return response.data.items;
    } catch (error) {
        console.error('Error fetching books', error)
        throw error;
    }
}