// pages/api/guestbook.js
import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
    const { method } = req;

    switch (method) {
        case 'GET': // Read all entries
            const entries = await sql`SELECT * FROM guestbook ORDER BY date DESC`;
            res.status(200).json(entries.rows);
            break;
        case 'POST': // Create a new entry
            const { name, message, password } = req.body;
            const date = new Date().toLocaleString();
            await sql`
        INSERT INTO guestbook (name, message, password, date)
        VALUES (${name}, ${message}, ${password}, ${date})
      `;
            res.status(201).json({ message: 'Entry added' });
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
