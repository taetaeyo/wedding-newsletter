// pages/api/guestbook.js
import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
    const { method } = req;
    const { id } = req.query; // URL에서 id를 받기

    try {
        switch (method) {
            case 'GET': // 조회
                const entries = await sql
                    `SELECT 
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

                // 필수 입력값이 누락된 경우
                if (!name || !message || !password) {
                    return res.status(400).json({ error: 'Missing required fields' });
                }

                const date = new Date();
                const formattedDate = date.toISOString(); // '2024-11-12T12:20:59.000Z'

                try {
                    const result = await sql`
                        INSERT INTO guestbook (name, message, password, "date")
                        VALUES (${name}, ${message}, ${password}, ${formattedDate})
                        RETURNING id, name, message, TO_CHAR("date", 'YYYY-MM-DD HH24:MI:SS') AS date
                    `;

                    const newEntry = result.rows[0];

                    // 생성된 항목 데이터 반환
                    res.status(201).json(newEntry);
                } catch (error) {
                    console.error('Failed to add entry:', error);
                    res.status(500).json({ error: 'Failed to add entry' });
                }

                break;

            case 'PUT': // 수정
                const { id, newName, newMessage, newPassword } = req.body;

                // 필수 입력값이 누락된 경우
                if (!id || !newName || !newMessage || !newPassword) {
                    return res.status(400).json({ error: '입력 값을 확인해주세요.' });
                }

                // 비밀번호 확인 후 수정
                const checkPassword = await sql`
                    SELECT * FROM guestbook WHERE id = ${id} AND password = ${newPassword}
                `;

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
                        RETURNING id, name, message, TO_CHAR("date", 'YYYY-MM-DD HH24:MI:SS') AS date
                    `;

                    const updatedEntry = result.rows[0];
                    res.status(200).json(updatedEntry); // 수정된 데이터 반환
                } catch (error) {
                    console.error('Failed to update entry:', error);
                    res.status(500).json({ error: 'Failed to update entry' });
                }
                break;

            case 'DELETE': {
                const { deletePassword } = req.body;

                if (!id || !deletePassword) {
                    return res.status(400).json({ error: 'Missing required fields for deletion' });
                }

                const checkDeletePassword = await sql`
                        SELECT * FROM guestbook WHERE id = ${id} AND password = ${deletePassword}
                    `;

                if (checkDeletePassword.rowCount === 0) {
                    return res.status(403).json({ error: 'Invalid password' });
                }

                await sql`
                        DELETE FROM guestbook WHERE id = ${id}
                    `;

                res.status(200).json({ message: 'Entry deleted' });
                break;
            }

            default:
                res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
                res.status(405).end(`Method ${method} Not Allowed`);
        }
    } catch (error) {
        console.error('Error occurred:', error); // 에러 로그 출력
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
