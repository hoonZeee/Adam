const express = require('express');
const path = require('path');
const mysql = require('mysql');
const fs = require('fs');
const bodyParser = require('body-parser');
const session = require('express-session'); // 세션 패키지 추가
const multer = require('multer'); // 이미지 업로드를 위한 multer
const app = express();
const port = 3000;

app.use(session({
    secret: 'your_secret_key', // 세션 암호화 키
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // HTTPS를 사용할 경우 true로 설정
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MySQL 연결 설정
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '0000',
    database: 'art',
});

db.connect((err) => {
    if (err) {
        console.error('MySQL 연결 실패:', err);
        return;
    }

    console.log('MySQL 연결 성공!');

    // 각 테이블 생성
    const createCustomerTable = `
        CREATE TABLE IF NOT EXISTS Customer (
            customer_id VARCHAR(15) NOT NULL,
            customer_pw VARCHAR(15),
            customer_name VARCHAR(15),
            gender CHAR(1),
            phone CHAR(11),
            membership VARCHAR(15),
            adress VARCHAR(100),
            PRIMARY KEY (customer_id)
        );
    `;

    const createArtistTable = `
        CREATE TABLE IF NOT EXISTS Artist (
            artist_id VARCHAR(15) NOT NULL,
            artist_pw VARCHAR(15),
            artist_name VARCHAR(15),
            gender CHAR(1),
            phone CHAR(11),
            partener VARCHAR(15),
            adress VARCHAR(100),
            PRIMARY KEY (artist_id)
        );
    `;

    const createCartTable = `
        CREATE TABLE IF NOT EXISTS cart (
            product_id VARCHAR(30) NOT NULL,
            cart_name VARCHAR(20),
            price INT,
            amount INT,
            PRIMARY KEY (product_id)
        );
    `;

    const createProductTable = `
        CREATE TABLE IF NOT EXISTS Product (
            product_id VARCHAR(25) NOT NULL,
            product_name VARCHAR(25),
            product_price INT,
            description VARCHAR(300),
            product_artist VARCHAR(20),
            product_condition VARCHAR(50),
            tema VARCHAR(20),
            color VARCHAR(20),
            size VARCHAR(20),
            PRIMARY KEY (product_id)
        );
    `;

    const createPostsTable = `
        CREATE TABLE IF NOT EXISTS posts (
            posts_id VARCHAR(20) NOT NULL,
            artist_id VARCHAR(15) NOT NULL,
            post_date DATETIME DEFAULT CURRENT_TIMESTAMP,
            artwork_image VARCHAR(255),
            description VARCHAR(255),
            PRIMARY KEY (posts_id, artist_id),
            FOREIGN KEY (artist_id) REFERENCES Artist(artist_id) ON DELETE CASCADE
        );
    `;

    // 테이블 생성 쿼리를 순차적으로 실행
    const queries = [
        createCustomerTable,
        createArtistTable,
        createCartTable,
        createProductTable,
        createPostsTable,
    ];

    queries.forEach((query) => {
        db.query(query, (err) => {
            if (err) {
                console.error('테이블 생성 실패:', err);
            } else {
                console.log('테이블 생성 성공:', query.split(' ')[2]); // 테이블 이름 출력
            }
        });
    });
});



// 로그인 처리
app.post('/process/login', (req, res) => {
    const { user_id, password } = req.body;
    const query = 'SELECT * FROM users WHERE user_id = ?';
    db.query(query, [user_id], (err, results) => {
        if (err) {
            console.error('로그인 쿼리 실패:', err);
            return res.json({ success: false, message: '로그인 실패' });
        }

        if (results.length > 0) {
            const user = results[0];
            if (user.password === password) {
                req.session.user_id = user.user_id;
                req.session.userName = user.user_name;
                res.json({ success: true, redirectUrl: '/' });
            } else {
                res.json({ success: false, message: '비밀번호가 일치하지 않습니다.' });
            }
        } else {
            res.json({ success: false, message: '아이디가 존재하지 않습니다.' });
        }
    });
});

// 로그아웃 처리
app.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.json({ success: false, message: '로그아웃 실패' });
        }
        res.redirect('/');
    });
});

// 업로드 디렉터리 생성 (없을 경우 생성)
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// 이미지 업로드 설정
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});
const upload = multer({ storage });

// 글쓰기 데이터 처리
app.post('/submit-post', upload.single('artworkImage'), (req, res) => {
    const { description } = req.body;
    const artworkImage = req.file ? req.file.filename : '';
    const userId = req.session.user_id;

    if (!userId) {
        return res.json({ success: false, message: '로그인 정보가 필요합니다.' });
    }

    const query = `
        INSERT INTO posts (artist_id, artwork_image, description)
        VALUES (?, ?, ?)
    `;

    db.query(query, [userId, artworkImage, description], (err) => {
        if (err) {
            console.error('게시물 저장 중 오류:', err);
            res.json({ success: false });
        } else {
            res.json({ success: true });
        }
    });
});

// 세션 사용자 정보 제공
app.get('/session-user', (req, res) => {
    res.json({ userName: req.session.userName || null });
});

// 기본 경로에 Main.html 연결
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Main', 'Main.html'));
});

// 게시물 데이터 제공 라우트
app.get('/posts', (req, res) => {
    const query = 'SELECT * FROM posts';
    db.query(query, (err, results) => {
        if (err) {
            console.error('게시물 데이터를 가져오는 중 오류:', err);
            res.json({ success: false });
        } else {
            res.json({ success: true, data: results });
        }
    });
});

// 서버 실행
app.listen(port, () => {
    console.log(`서버가 실행 중입니다. http://localhost:${port}`);
});