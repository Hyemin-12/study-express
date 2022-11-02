const mysql = require('mysql2');

const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    database: 'mydatabase',
    password: '1234',
    connectionLimit: 10,
    enableKeepAlive: true
});

const promisePool = pool.promise();

async function createPost(post) {
    const result = await promisePool.query("INSERT INTO post (title, main, writer, pw, date) VALUES (?, ?, ?, ?, sysdate())", [post.title, post.main, post.writer, post.pw]);
    console.log(result[0]);     
}

createPost({
    title: "subject 2",
    main: "content 2",
    writer: "world",
    pw: "5678"
});