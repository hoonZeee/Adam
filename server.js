const express = require('express');
const path = require('path');
const mysql = require('mysql');

const fs = require('fs');
const bodyParser = require('body-parser');
const session = require('express-session'); // 세션 패키지 추가
const multer = require('multer'); // 이미지 업로드를 위한 multer
const app = express();
const port = 3001;

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

    // 기존 users 테이블
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
            console.error('users 테이블 생성 실패:', err);
        } else {
            console.log('users 테이블 생성 성공');
        }
    });

    // 추가 테이블: Customer
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

    db.query(createCustomerTable, (err, result) => {
        if (err) {
            console.error('Customer 테이블 생성 실패:', err);
        } else {
            console.log('Customer 테이블 생성 성공');
        }
    });

    // 추가 테이블: Artist
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

    db.query(createArtistTable, (err, result) => {
        if (err) {
            console.error('Artist 테이블 생성 실패:', err);
        } else {
            console.log('Artist 테이블 생성 성공');
        }
    });

    const createProductTable = `
        CREATE TABLE IF NOT EXISTS Product (
            product_id VARCHAR(25) NOT NULL,
            product_name VARCHAR(25),
            product_price INT,
            description VARCHAR(300),
            product_artist VARCHAR(20),
            \`condition\` VARCHAR(50),
            tema VARCHAR(20),
            color VARCHAR(20),
            size VARCHAR(20),
            image_url VARCHAR(255), 
            PRIMARY KEY (product_id)
        );
    `;
    db.query(createProductTable, (err, result) => {
        if (err) {
            console.error('Product 테이블 생성 실패:', err);
        } else {
            console.log('Product 테이블 생성 성공');
        }
    });
    const insertInitialDataQuery = `
        INSERT INTO Product (
            product_id,
            product_name,
            product_price,
            description,
            product_artist,
            \`condition\`,
            tema,
            color,
            size,
            image_url
        ) VALUES
        ('product2', '오키나와', 50000, NULL, NULL, '상', NULL, NULL, NULL, '../../images/name1_2.jpg'),
        ('product1', '동그라미', 50000, NULL, NULL, '상', NULL, NULL, NULL, '../../images/name1_1.jpg')
        ON DUPLICATE KEY UPDATE
            product_name = VALUES(product_name),
            product_price = VALUES(product_price),
            image_url = VALUES(image_url);
    `;

    db.query(insertInitialDataQuery, (err) => {
        if (err) {
            console.error('Error inserting initial data into Product table:', err);
            return;
        }
        console.log('Initial data inserted into Product table.');
    });

    // 렌탈 카트 테이블
    const createRentalTable = `
        CREATE TABLE IF NOT EXISTS rentalcart (
            id INT AUTO_INCREMENT PRIMARY KEY,
            product_id VARCHAR(30) NOT NULL,
            product_name VARCHAR(50),
            price INT,
            amount INT,
            image_url VARCHAR(255), -- New column for storing image URLs
            user_id VARCHAR(50),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(user_id)
        );
    `;
    db.query(createRentalTable, (err, result) => {
        if (err) {
            console.error('rental 테이블 생성 실패:', err);
        } else {
            console.log('rental 테이블 생성 성공');
        }
    });
    // 구매 카트 테이블
    const createPurchaseTable =`
        CREATE TABLE IF NOT EXISTS purchasecart (
            id INT AUTO_INCREMENT PRIMARY KEY,
            product_id VARCHAR(30) NOT NULL,
            product_name VARCHAR(50),
            price INT,
            amount INT,
            image_url VARCHAR(255),
            user_id VARCHAR(50), -- 사용자 구분을 위한 ID
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(user_id)
        );
    `;
    db.query(createPurchaseTable, (err, result) => {
        if (err) {
            console.error('Purchase 테이블 생성 실패:', err);
        } else {
            console.log('Purchase 테이블 생성 성공');
        }
    });

    // 추가 테이블: posts
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
            console.error('posts 테이블 생성 실패:', err);
        } else {
            console.log('posts 테이블 생성 성공');
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


// 4. AI 작품 추천 라우트 추가
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
//const API_KEY = '여기입력';

app.post('/api/recommend', async (req, res) => {
    const { query } = req.body;

    try {
        // 파일 읽기
        const fileContent = await fs.promises.readFile('./product/discover.html', 'utf8');


        // 파일 내용을 prompt에 포함
        const prompt = `
        다음 해시태그를 기반으로 유사한 작품을 추천해주세요: ${query}.
        작품 목록:
        ${fileContent}
        `;

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [
                    { role: 'system', content: 'You are a helpful assistant.' },
                    { role: 'user', content: prompt },
                ],
            }),
        });
    
        const data = await response.json();
        console.log('API 응답 데이터:', data); // 디버깅용
    
        // 응답 데이터 검증
        if (!data.choices || data.choices.length === 0) {
            console.error('API 응답에 choices 데이터가 없습니다:', data);
            return res.json({ success: false, message: '추천 결과가 없습니다.' });
        }
    
        const recommendations = data.choices[0].message.content;
        res.json({ success: true, recommendations });
    } catch (error) {
        console.error('OpenAI API 요청 실패:', error);
        res.json({ success: false, message: 'API 요청 실패: ' + error.message });
    }
    
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

//상품불러오기
app.get('/product/:id', (req, res) => {
    const productId = req.params.id;

    const query = `
        SELECT product_id, product_name, product_price, description, image_url
        FROM Product
        WHERE product_id = ?
    `;

    db.query(query, [productId], (err, results) => {
        if (err) {
            console.error('Error fetching product:', err);
            return res.status(500).send('Internal Server Error');
        }

        if (results.length === 0) {
            return res.status(404).send('Product not found');
        }

        // Serve the product details as JSON or render a product details page
        const product = results[0];
        res.send(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>${product.product_name}</title>
            </head>
            <body>
                <h1>${product.product_name}</h1>
                <img src="${product.image_url}" alt="${product.product_name}" />
                <p>${product.description}</p>
                <p>Price: ￦${product.product_price}</p>
            </body>
            </html>
        `);
    });
});

app.post('/add-to-rentalcart', (req, res) => {
    const { product_id, product_name, price, amount, image_url } = req.body;

    const user_id = req.session.user_id;

    if (!user_id) {
        return res.status(400).json({ success: false, message: 'User not logged in.' });
    }

    const query = `
        INSERT INTO rentalcart (product_id, product_name, price, amount, image_url, user_id)
        VALUES (?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE amount = amount + VALUES(amount);
    `;

    db.query(query, [product_id, product_name, price, amount, image_url, user_id], (err) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ success: false, message: 'Database error.' });
        }
        res.json({ success: true });
    });
});
app.get('/rental-cart', (req, res) => {
    const user_id = req.session.user_id;

    if (!user_id) {
        return res.status(401).json({ success: false, message: 'User not logged in.' });
    }

    const query = `
        SELECT product_id, product_name, price, image_url
        FROM rentalcart
        WHERE user_id = ?
    `;

    db.query(query, [user_id], (err, results) => {
        if (err) {
            console.error('Error fetching rental cart data:', err);
            return res.status(500).json({ success: false, message: 'Database error' });
        }

        // Calculate total count and rental cost
        const totalArtworkCount = results.length;
        const totalRentalCost = results.reduce((sum, item) => sum + item.price, 0);

        res.json({ success: true, data: results, totalArtworkCount, totalRentalCost });
    });
});

app.post('/add-to-purchasecart', (req, res) => {
    const { product_id, product_name, price, amount, image_url } = req.body;

    if (!req.session.user_id) {
        return res.status(400).json({ success: false, message: 'User not logged in.' });
    }

    const query = `
        INSERT INTO purchasecart (product_id, product_name, price, amount, image_url, user_id)
        VALUES (?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE amount = amount + VALUES(amount);
    `;

    db.query(
        query,
        [product_id, product_name, price, amount, image_url, req.session.user_id],
        (err) => {
            if (err) {
                console.error('Database error:', err); // Debug log
                return res.status(500).json({ success: false, message: 'Database error.' });
            }
            res.json({ success: true });
        }
    );
});
app.get('/purchase-cart', (req, res) => {
    const user_id = req.session.user_id;

    if (!user_id) {
        return res.status(401).json({ success: false, message: '사용자가 로그인하지 않았습니다.' });
    }

    const query = `
        SELECT product_id, product_name, price, amount, image_url
        FROM purchasecart
        WHERE user_id = ?
    `;

    db.query(query, [user_id], (err, results) => {
        if (err) {
            console.error('Purchase cart 데이터 가져오기 실패:', err);
            return res.status(500).json({ success: false, message: '데이터베이스 오류' });
        }

        console.log('Purchase cart data:', results); // Debug log
        res.json({ success: true, data: results });
    });
});
app.post('/remove-from-cart', (req, res) => {
    const { product_id } = req.body;
    const user_id = req.session.user_id;

    if (!user_id) {
        return res.status(401).json({ success: false, message: '사용자가 로그인하지 않았습니다.' });
    }

    const query = `
        DELETE FROM rentalcart
        WHERE product_id = ? AND user_id = ?
    `;

    db.query(query, [product_id, user_id], (err, result) => {
        if (err) {
            console.error('카트에서 삭제 중 오류:', err);
            return res.status(500).json({ success: false, message: 'Database error' });
        }
        res.json({ success: true, message: '삭제 완료' });
    });
});
app.post('/remove-from-purchasecart', (req, res) => {
    const { product_id } = req.body;

    if (!req.session.user_id) {
        return res.status(400).json({ success: false, message: '사용자가 로그인하지 않았습니다.' });
    }

    const query = `
        DELETE FROM purchasecart
        WHERE product_id = ? AND user_id = ?
    `;

    db.query(query, [product_id, req.session.user_id], (err, result) => {
        if (err) {
            console.error('상품 삭제 중 오류 발생:', err);
            return res.status(500).json({ success: false, message: '데이터베이스 오류' });
        }

        if (result.affectedRows > 0) {
            res.json({ success: true });
        } else {
            res.json({ success: false, message: '삭제할 상품을 찾을 수 없습니다.' });
        }
    });
});
app.get('/cart-counts', (req, res) => {
    const user_id = req.session.user_id;

    if (!user_id) {
        return res.status(401).json({ success: false, message: 'User not logged in.' });
    }

    const rentalQuery = `
        SELECT COUNT(*) AS rentalCount
        FROM rentalcart
        WHERE user_id = ?;
    `;

    const purchaseQuery = `
        SELECT COUNT(*) AS purchaseCount
        FROM purchasecart
        WHERE user_id = ?;
    `;

    db.query(rentalQuery, [user_id], (err, rentalResults) => {
        if (err) {
            console.error('Error fetching rental cart count:', err);
            return res.status(500).json({ success: false, message: 'Database error.' });
        }

        db.query(purchaseQuery, [user_id], (err, purchaseResults) => {
            if (err) {
                console.error('Error fetching purchase cart count:', err);
                return res.status(500).json({ success: false, message: 'Database error.' });
            }

            const rentalCount = rentalResults[0].rentalCount;
            const purchaseCount = purchaseResults[0].purchaseCount;

            res.json({ success: true, rentalCount, purchaseCount });
        });
    });
});

//구매카트 총금액및 개수 연산
app.get('/purchase-cart-summary', (req, res) => {
    const user_id = req.session.user_id;

    if (!user_id) {
        return res.status(401).json({ success: false, message: 'User not logged in.' });
    }

    const query = `
        SELECT COUNT(*) AS totalItems, SUM(price) AS totalPrice
        FROM purchasecart
        WHERE user_id = ?;
    `;

    db.query(query, [user_id], (err, results) => {
        if (err) {
            console.error('Error fetching purchase cart summary:', err);
            return res.status(500).json({ success: false, message: 'Database error.' });
        }

        const { totalItems, totalPrice } = results[0];
        res.json({ success: true, totalItems, totalPrice: totalPrice || 0 });
    });
});
//이미지 카트로 불러오기
app.use('/images', express.static(path.join(__dirname, 'images')));

//마이페이지 구매렌탈목록 가져오기
app.get('/rental-history', (req, res) => {
    const user_id = req.session.user_id;

    if (!user_id) {
        return res.status(401).json({ success: false, message: 'User not logged in.' });
    }

    const query = `
        SELECT 
            DATE_FORMAT(created_at, '%Y-%m-%d') AS date, 
            product_name AS title, 
            DATE_FORMAT(DATE_ADD(created_at, INTERVAL 3 MONTH), '%Y-%m-%d') AS details, 
            price, 
            COALESCE(image_url, 'https://example.com/default-image.jpg') AS image_url
        FROM rentalcart
        WHERE user_id = ?;
    `;

    db.query(query, [user_id], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ success: false, message: 'Database error.' });
        }

        res.json({ success: true, rentals: results });
    });
});
app.get('/purchase-history', (req, res) => {
    const user_id = req.session.user_id;

    if (!user_id) {
        return res.status(401).json({ success: false, message: 'User not logged in.' });
    }

    const query = `
        SELECT 
            DATE_FORMAT(created_at, '%Y-%m-%d') AS date, 
            product_name AS title, 
            price, 
            COALESCE(image_url, 'https://example.com/default-image.jpg') AS image_url
        FROM purchasecart
        WHERE user_id = ?;
    `;

    db.query(query, [user_id], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ success: false, message: 'Database error.' });
        }

        res.json({ success: true, purchases: results });
    });
});

app.get('/sales-history', (req, res) => {
    const user_id = req.session.user_id;

    if (!user_id) {
        return res.status(401).json({ success: false, message: 'User not logged in.' });
    }

    const query = `
        SELECT 
            DATE_FORMAT(created_at, '%Y-%m-%d') AS date, 
            product_name AS title, 
            price, 
            COALESCE(image_url, 'https://example.com/default-image.jpg') AS image_url
        FROM purchasecart
        WHERE user_id = ?;
    `;

    db.query(query, [user_id], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ success: false, message: 'Database error.' });
        }

        res.json({ success: true, sales: results });
    });
});

// 서버 실행
app.listen(port, () => {
    console.log(`서버가 실행 중입니다. http://localhost:${port}`);
});
