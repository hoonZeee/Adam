// server.js

const express = require('express');
const path = require('path');
const mysql = require('mysql');
const bodyParser = require('body-parser'); // body-parser 추가
const app = express();
const port = 3000;

app.use(bodyParser.json()); // JSON 형식의 데이터 파싱
app.use(bodyParser.urlencoded({ extended: true })); // URL-encoded 데이터 파싱

// MySQL 연결 설정
const db = mysql.createConnection({
    host: 'localhost', 
    user: 'root', 
    password: '1234', 
    database: 'Users' 
});

// MySQL 연결
db.connect((err) => {
    if (err) {
        console.error('MySQL 연결 실패:', err);
    } else {
        console.log('MySQL 연결 성공!');

        // 테이블 생성
        const createTableQuery = `
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(50) NOT NULL,
                nickname VARCHAR(50) NOT NULL,
                user_id VARCHAR(50) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL
            );
        `;
        
        db.query(createTableQuery, (err, result) => {
            if (err) {
                console.error('테이블 생성 실패:', err);
            } else {
                console.log('테이블 생성 성공');
            }
        });
    }
});

// 사용자 데이터 추가 라우트
app.post('/process/adduser', (req, res) => {
    const { name, nickname, userId, password } = req.body;

    const query = `INSERT INTO users (username, nickname, user_id, password) VALUES (?, ?, ?, ?)`;
    db.query(query, [name, nickname, userId, password], (err, result) => {
        if (err) {
            console.error('회원가입 실패:', err);
            res.json({ success: false, message: '회원가입 실패' });
        } else {
            console.log('회원가입 성공:', result);
            console.log('회원 추가 성공: 사용자명 -', name, ', 닉네임 -', nickname, ', 아이디 -', userId);
            res.json({ success: true, message: '회원가입 성공' });
        }
    });
});

// 정적 파일 제공
app.use(express.static(path.join(__dirname)));

// Main.html 파일을 기본 경로에 연결
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Main', 'Main.html'));
});

// 서버 실행
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
