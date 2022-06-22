//express 모듈 불러오기
const express = require("express")

//express 사용
const app = express()
const port = 3000


const mysql = require("mysql");

const con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "12341234"
});

con.connect(function(err) {
    if (err) throw err;
    console.log('Connected');
});

/**
 * @path http://localhost:3000/ 경로
 */
 app.get("/", (req, res) => {
    res.send("Hello World");
});

// http listen port 생성 서버 실행
app.listen(port, () => console.log("app listening on port 3000!)"))