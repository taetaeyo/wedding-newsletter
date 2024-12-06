// pages/api/guestbook.js
import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
    const { method } = req;
    const { id } = req.query; // URL에서 id를 받기

    try {
        switch (method) {
            case 'GET': // 조회
                const entries = await sql`
                    SELECT 
                        id,
                        name,
                        message,
                        password,
                        TO_CHAR("date", 'YYYY-MM-DD HH24:MI:SS') AS date
                    FROM guestbook 
                    ORDER BY "date" DESC`;

                res.status(200).json(entries.rows);
                break;

            case 'POST': // 추가
                const { name, message, password } = req.body;

                if (!name || !message || !password) {
                    return res.status(400).json({ error: 'Missing required fields' });
                }

                const date = new Date().toISOString();

                try {
                    const result = await sql`
                        INSERT INTO guestbook (name, message, password, "date")
                        VALUES (${name}, ${message}, ${password}, ${date})
                        RETURNING id, name, message, TO_CHAR("date", 'YYYY-MM-DD HH24:MI:SS') AS date`;

                    res.status(201).json(result.rows[0]);
                } catch (error) {
                    console.error('Failed to add entry:', error);
                    res.status(500).json({ error: 'Failed to add entry' });
                }
                break;

            case 'PUT': // 수정
                const { id, newName, newMessage, newPassword } = req.body;

                if (!id || !newName || !newMessage || !newPassword) {
                    return res.status(400).json({ error: 'Missing required fields' });
                }

                const checkPassword = await sql`
                    SELECT * FROM guestbook WHERE id = ${id} AND password = ${newPassword}`;

                if (checkPassword.rowCount === 0) {
                    return res.status(403).json({ error: 'Invalid password' });
                }

                try {
                    const result = await sql`
                        UPDATE guestbook
                        SET name = ${newName}, 
                            message = ${newMessage}, 
                            "date" = CURRENT_TIMESTAMP
                        WHERE id = ${id}
                        RETURNING id, name, message, TO_CHAR("date", 'YYYY-MM-DD HH24:MI:SS') AS date`;

                    res.status(200).json(result.rows[0]);
                } catch (error) {
                    console.error('Failed to update entry:', error);
                    res.status(500).json({ error: 'Failed to update entry' });
                }
                break;

            case 'DELETE': {
                const entryId = parseInt(req.query.id, 10);
                const { deletePassword } = req.body;

                if (!entryId || !deletePassword) {
                    return res.status(400).json({ error: 'Missing required fields for deletion' });
                }

                // 비밀번호 확인
                const checkDeletePassword = await sql`
                        SELECT COUNT(*) AS count 
                        FROM guestbook 
                        WHERE id = ${entryId} AND password = ${deletePassword}
                    `;

                const isValidPassword = checkDeletePassword.rows[0]?.count > 0;

                if (!isValidPassword) {
                    return res.status(403).json({ error: 'Invalid password' });
                }

                // 삭제
                try {
                    await sql`
                            DELETE FROM guestbook WHERE id = ${entryId}
                        `;
                    res.status(200).json({ message: 'Entry deleted' });
                } catch (error) {
                    console.error('Failed to delete entry:', error);
                    res.status(500).json({ error: 'Failed to delete entry' });
                }

                break;
            }

            default:
                res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
                res.status(405).end(`Method ${method} Not Allowed`);
        }
    } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}