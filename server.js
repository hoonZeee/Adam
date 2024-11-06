const express = require('express');
const path = require('path');
const mysql = require('mysql');
const app = express();
const port = 15012;

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
        
        // 임의 테이블 삭제 (테이블이 존재하는 경우)
        db.query('DROP TABLE IF EXISTS example_table', (err, result) => {
            if (err) {
                console.error('테이블 삭제 실패:', err);
            } else {
                console.log('기존 테이블 삭제 또는 테이블 없음');

                // 임의 테이블 생성
                const createTableQuery = `
                    CREATE TABLE example_table (
                        id INT AUTO_INCREMENT PRIMARY KEY,
                        name VARCHAR(50),
                        age INT
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
    }
});

// 정적 파일 제공
app.use(express.static(path.join(__dirname)));

// Main.html 파일을 기본 경로에 연결
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Main', 'Main.html'));
});

// discover.html 파일을 /discover 경로에 연결
app.get('/discover', (req, res) => {
    res.sendFile(path.join(__dirname, 'product', 'discover.html'));
});

// 서버 실행
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
