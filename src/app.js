const express = require('express');
const routes = require('./routes'); // routes/index.js를 불러옵니다.
const errorHandler = require('./middlewares/errorHandler');
const cors = require('cors');

const app = express();

// 개발 중에는 로컬 환경에서의 요청을 허용
const corsOptions = {
    origin: 'http://localhost:8080', // Vue 앱이 실행 중인 주소
};

app.use(cors(corsOptions));

app.use(express.json()); // 미들웨어 사용 : 들어오는 요청의 본문(body)가 JSON 형식일 경우 파싱하여 req.body로 만들어줌
app.use('/api', routes); // 모든 라우트를 '/api' 경로 아래에 연결합니다.
app.use(errorHandler);

module.exports = app;