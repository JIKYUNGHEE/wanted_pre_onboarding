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

//Express 4.16.0버전 부터 body-parser의 일부 기능이 익스프레스에 내장 body-parser 연결 
app.use(express.json())
app.use(express.urlencoded({ extended: true}))


/**
 * @path http://localhost:3000/ 경로
 */
app.get("/", (req, res) => {
    res.send("Hello World");
});

/**
 * @path {POST} http://localhost:3000/api/recruit
 * @description 1. 채용공고를 등록합니다.
 */
 app.post("/api/recruit", (req, res) => {
    const sql = "insert into JobSearching.RecruiteNotice set ?"
    con.query(sql, recruit_notice_en , function (err, result, fields) {  
    if (err) throw err;  
    console.log(result)
    res.json({ok:true, result: result})   
    });
})

/**
 * @path {PUT}  http://localhost:3000/api/recruit
 * @description 2. 채용공고를 수정합니다.
 */
 app.put("/api/recruit", (req, res) => {
    const sql = "UPDATE JobSearching.RecruiteNotice SET ? WHERE id = " + req.params.id;
    con.query(sql,req.body,function (err, result, fields) {  
        if (err) throw err;
        console.log(result);

        res.redirect('/');
    });
})

/**
 * @path {DELETE} http://localhost:3000/api/recruit?id={id}
 * @description 3. DB에서 삭제됩니다.
 * 
 */
 app.delete("/api/recruit", (req, res) => {
    const sql = "DELETE FROM JobSearching.RecruiteNotice WHERE id = ?"

    con.query(sql,[req.params.id],function(err,result,fields){
        if (err) throw err;
        console.log(result)

        res.redirect('/');
    })
})

/**
 * @path http://localhost:3000/api/recruit
 * @description 4-1. 채용공고 목록을 가져옵니다.
 */
 app.get("/api/recruit", (req, res) => {
    const sql = "select * from JobSearching.RecruiteNotice"
    con.query(sql, function (err, result, fields) {  
        if (err) throw err;  
        console.log(result)

        res.json({ok:true, noticeList: result})   
    });
});




// http listen port 생성 서버 실행
app.listen(port, () => console.log("app listening on port 3000!)"))