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
    password: '1234', // 필요에 따라 변경
    database: 'art'
});

// MySQL 연결
db.connect((err) => {
    if (err) {
        console.error('MySQL 연결 실패:', err);
        return;
    }

    console.log('MySQL 연결 성공!');

    // 사용자 테이블 생성
    const createUsersTableQuery = `
        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            user_name VARCHAR(50) NOT NULL,
            user_id VARCHAR(50) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL
        );
    `;

    db.query(createUsersTableQuery, (err, result) => {
        if (err) {
            console.error('사용자 테이블 생성 실패:', err);
        } else {
            console.log('사용자 테이블 생성 성공');
        }
    });

    // 게시물 테이블 생성 (외래 키 추가)
    const createPostsTableQuery = `
        CREATE TABLE IF NOT EXISTS posts (
            id INT AUTO_INCREMENT PRIMARY KEY,
            user_id VARCHAR(50),
            post_date DATETIME DEFAULT CURRENT_TIMESTAMP,
            artwork_image VARCHAR(255) NOT NULL,
            description TEXT NOT NULL,
            FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
        );
    `;

    db.query(createPostsTableQuery, (err, result) => {
        if (err) {
            console.error('게시물 테이블 생성 실패:', err);
        } else {
            console.log('게시물 테이블 생성 성공');
        }
    });
});


// 정적 파일 제공
app.use(express.static(path.join(__dirname)));
app.use(express.static(path.join(__dirname, 'Main'))); // Main 폴더의 정적 파일 
app.use('/images', express.static(path.join(__dirname, 'images'))); // images 폴더의 정적 파일

// 사용자 데이터 추가 라우트
app.post('/process/adduser', (req, res) => {
    const { NAME, ID, password } = req.body;

    const query = `INSERT INTO users (user_name, user_id, password) VALUES (?, ?, ?)`;
    db.query(query, [NAME, ID, password], (err, result) => {
        if (err) {
            console.error('회원가입 실패:', err);
            res.json({ success: false, message: '회원가입 실패' });
        } else {
            console.log('회원가입 성공:', result);
            res.json({ success: true, message: '회원가입 성공' });
        }
    });
});

// 로그인 처리
app.post('/process/login', (req, res) => {
    const { user_id, password } = req.body;
    console.log("로그인 요청:", user_id, password); // 요청 데이터 확인

    const query = 'SELECT * FROM users WHERE user_id = ?';
    db.query(query, [user_id], (err, results) => {
        if (err) {
            console.error('로그인 쿼리 실패:', err);
            return res.json({ success: false, message: '로그인 실패' });
        }

        if (results.length > 0) {
            const user = results[0];
            if (user.password === password) { // 비밀번호 일치 확인
                // 여기에 세션 저장 코드 추가
                req.session.user_id = user.user_id; // 세션에 user_id 저장
                req.session.userName = user.user_name; // 세션에 userName 저장
                res.json({ success: true, redirectUrl: '/' }); // 메인 페이지로 리다이렉트
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
        res.redirect('/'); // 로그아웃 후 메인 페이지로 리다이렉트
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
        cb(null, uniqueSuffix + '-' + file.originalname); // 파일명에 타임스탬프 추가
    }
});
const upload = multer({ storage });

// 글쓰기 데이터 처리
app.post('/submit-post', upload.single('artworkImage'), (req, res) => {
    const { description } = req.body;
    const artworkImage = req.file ? req.file.filename : '';
    const userId = req.session.user_id; // 세션에서 user_id 가져오기

    if (!userId) {
        return res.json({ success: false, message: '로그인 정보가 필요합니다.' });
    }

    const query = `
        INSERT INTO posts (user_id, artwork_image, description)
        VALUES (?, ?, ?)
    `;

    db.query(query, [userId, artworkImage, description], (err, result) => {
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


