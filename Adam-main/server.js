const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

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


