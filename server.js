// server.js

// 필요한 패키지를 불러옵니다.
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Express 애플리케이션을 생성합니다.
const app = express();

// CORS 설정 및 JSON 요청 본문을 파싱하기 위한 설정
app.use(cors());
app.use(bodyParser.json());

// POST 요청을 처리하는 엔드포인트를 정의합니다.
app.post('/api/fingerprint', (req, res) => {
    const { visitorId, deviceData } = req.body;
    console.log('Received data:', { visitorId, deviceData });
    
    // 여기서 데이터를 데이터베이스에 저장하는 등의 처리를 할 수 있습니다.

    // 클라이언트에 성공 응답을 보냅니다.
    res.send({ status: 'success' });
});

// 서버를 실행할 포트를 정의합니다.
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
