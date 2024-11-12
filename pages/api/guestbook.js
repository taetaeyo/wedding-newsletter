// pages/api/guestbook.js
import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
    const { method } = req;
    const { id } = req.query; // URL에서 id를 받기

    try {
        switch (method) {
            case 'GET': // 조회
                const entries = await sql`SELECT * FROM guestbook ORDER BY "date" DESC`;
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

                await sql`
                    INSERT INTO guestbook (name, message, password, "date")
                    VALUES (${name}, ${message}, ${password}, ${formattedDate})
                `;
                res.status(201).json({ message: 'Entry added' });
                break;

            case 'PUT': // 수정
                const { newName, newMessage, newPassword } = req.body;

                // 필수 입력값이 누락된 경우
                if (!id || !newMessage || !newPassword) {
                    return res.status(400).json({ error: '입력 값을 확인해주세요.' });
                }

                // 비밀번호 확인 후 수정
                const checkPassword = await sql`
                    SELECT * FROM guestbook WHERE id = ${id} AND password = ${newPassword}
                `;

                if (checkPassword.rowCount === 0) {
                    return res.status(403).json({ error: 'Invalid password' });
                }

                await sql`
                    UPDATE guestbook
                    SET name = ${newName}, message = ${newMessage}, "date" = CURRENT_TIMESTAMP
                    WHERE id = ${id}
                `;

                res.status(200).json({ message: 'Entry updated' });
                break;

            case 'DELETE': // 삭제
                const { deletePassword } = req.body;

                // 필수 입력값이 누락된 경우
                if (!id || !deletePassword) {
                    return res.status(400).json({ error: 'Missing required fields for deletion' });
                }

                // 비밀번호 확인 후 삭제
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

            default:
                res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
                res.status(405).end(`Method ${method} Not Allowed`);
        }
    } catch (error) {
        console.error('Error occurred:', error); // 에러 로그 출력
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
