// server.js

// 필요한 패키지를 불러옵니다.
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
const path = require('path');

// Express 애플리케이션을 생성합니다.
const app = express();


// CORS 설정 및 JSON 요청 본문을 파싱하기 위한 설정
app.use(cors());
app.use(bodyParser.json());

// Mysql 데이터베이스 연결
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'fingerprintDB',
    port: 3306
});

// 데이터베이스 연결
db.connect((err) => {
    if (err) {
        console.error('데이터베이스 연결 실패:', err);
        return;
    }
    console.log('데이터베이스에 연결되었습니다');
});

//정적 파일 제공 설정
app.use(express.static('public'));

// HTML 파일 제공하는 엔드포인트 설정
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

// POST 요청을 처리하는 엔드포인트를 정의합니다.
app.post('/api/fingerprint', (req, res) => {
    const { visitorId, deviceData } = req.body;
    console.log('Received data:', { visitorId, deviceData });
    
    // 여기서 데이터를 데이터베이스에 저장하는 등의 처리를 할 수 있습니다.
    const query = 'INSERT INTO fingerprints (visitor_id, device_data) VALUES (?, ?)';
    db.query(query, [visitorId, JSON.stringify(deviceData)], (err, results) => {
        if (err) {
            console.error('데이터베이스 연결 실패: ' + err.stack);
            return res.status(500).send({ status: 'error', message: '데이터베이스 연결 실패' });
        }
    // 클라이언트에 성공 응답을 보냅니다.
    res.send({ status: 'success', id: results.insertId });
    });
});

// 서버를 실행할 포트를 정의합니다.
const PORT = process.env.PORT || 3001;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});