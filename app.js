const express = require('express')
const app = express()
const PORT = 3000

// let ejs = require('ejs');
// let people = ['geddy', 'neil', 'alex'];
// let html = ejs.render(
//     // 첫 번째 인자 : html
//     // %= % 안에 있는 건 코드로 인식함
//     '<%= people.join(", "); %>',
//     // 두 번째 인자 : html에 전달할 값
//     {people: people});
// console.log(html)

console.log(__dirname) // 현재 경로 
app.set('views', __dirname + '/views') // 첫 번째 인자 views는 이름 바꾸면 안됨 (두 번째는 상관 없음)
app.set('view engine', 'ejs') // view engine을 ejs로 하겠다
app.engine('html', require('ejs').renderFile) // 확장자가 html이면 ejs로 해석을 해라

// TODO : "/persons"로 접근 시 person에 저장된 내용 전부 json으로 반환해주기
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    database: 'mydatabase',
    password: '1234'
})

app.post('/post', (req, res) => {
    res.json({
        title: "subject 3",
        main: "content 3",
        writer: "world",
        pw: "0000"
    })
    res.send(req.body);
})

async function createPost(post) {
    const result = await promisePool.query("INSERT INTO post (title, main, writer, pw, date) VALUES (?, ?, ?, ?, sysdate())", [post.title, post.main, post.writer, post.pw]);
    console.log(result[0]);     
}

createPost(post);



app.get('/persons', (req, res) => {
    connection.execute(
        "SELECT * FROM person",
        function(err, results, fields) {
            res.json(results) // 객체가 담겨 있는 배열
        }
    )
})

// TODO : 주소 적당히 하나 만들어서 주소에 적합한 데이터를 json 형식으로 반환하게 하기
app.get('/my_cat', (req, res) => {
    res.json({ name : '먼지', age : 1, gender : '수컷',
        // undefined는 직렬화 안 함 (null은 됨)
        value: undefined,
        func: () => {}
    })
})

app.get('/json_test', (req, res) => {
    res.json({ name: '홍길동', age: 20}) // application json
    res.send(`{ name: '홍길동', age: 20}`) // 그냥 text
})

app.get('/ejs_test', (req, res) => {
    // 두 번째 인자에 객체를 보통 주는 데, 저따가 넣고 싶은 거 다 넣으면 됨
    res.render('hello.html', { name: '홍길동', age: 20 })
})

app.get('/', (req, res) => {
    const name = "John"
    // 뭐.. 이렇게 일일이 다 써도 됨
    // 원래는 Template Engine 사용
    let html = "";
    html += `<h1>Hello ${name}</h1>`
    html += `<p>Paragraph</p>`
    res.send(html)
})

app.listen(PORT, () => {
    console.log(`서버 작동 중! (포트번호 : ${PORT})`)
})