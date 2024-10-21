import { useEffect, useState } from 'react';

export default function SheetData() {
    const [data, setData] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/sheetData'); // Correct path
                if (!response.ok) throw new Error('Failed to fetch data');
                const result = await response.json();
                setData(result);
            } catch (error: unknown) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError('An unknown error occurred');
                }
            }
        };
        fetchData();
    }, []);

    if (error) return <div>Error: {error}</div>;
    if (!data.length) return <div>Loading...</div>;

    return (
        <div>
            <h2>Fetched Sheet Data:</h2>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
}