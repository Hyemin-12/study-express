const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    database: 'mydatabase',
    password: '1234'
})

let person = {
    name: "Sally",
    age: 30
}

// 가져오기
connection.execute(
    "SELECT * FROM person",
    function(err, results, fields) {
        console.log(results)
    }
)

// 삽입
// connection.execute(
//     // 변수 자리에 물음표를 넣고 두 번째 인자에 배열로 변수를 담아서 준다
//     "INSERT INTO person (name, age) VALUES (?, ?)",
//     [person.name, person.age],
//     function(err, results, fields) {
//         console.log(results)
//     }
// )

// connection.execute(
//     "INSERT INTO person (name, age) VALUES ('John', 20)",
//     function(err, results, fields) {
//         console.log(results)
//     }
// )


// connection.execute(
//     "SELECT 1+1 FROM dual",
//     function(err, results, fields) {
//         console.log(results) // 테이블은 행이 여러 개일 수 있으니까 배열로 받음
//     })