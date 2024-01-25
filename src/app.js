const express = require('express');
const routes = require('./routes'); // routes/index.js를 불러옵니다.
const errorHandler = require('./middlewares/errorHandler');

const app = express();

const corsOptions = {
    origin: 'http://localhost:8080', // Vue 앱이 호스팅되는 도메인
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions)); // 지정된 도메인의 요청만 허용

app.use(express.json()); // 미들웨어 사용 : 들어오는 요청의 본문(body)가 JSON 형식일 경우 파싱하여 req.body로 만들어줌
app.use('/api', routes); // 모든 라우트를 '/api' 경로 아래에 연결합니다.
app.use(errorHandler);

module.exports = app;