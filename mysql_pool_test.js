const mysql = require('mysql2');

// 커넥션 풀 생성
const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    database: 'mydatabase',
    password: '1234',
    connectionLimit: 10, // 커넥션을 10개까지 만들 수 있음
    enableKeepAlive: true
});

// 풀을 프라미스 기반으로 사용
const promisePool = pool.promise();

async function findPerson(id) {
    const result = await promisePool.query("SELECT * FROM person WHERE id=?", [id]);
    console.log(result[0]);
}

let person = {
    id: 5,
    name: "Sally",
    age: 20
}

// Q1) findAllPerson 메서드 만들기
async function findAllPerson() {
    const result = await promisePool.query("SELECT * FROM person");
    console.log(result[0]);
}
// Q2) addPerson(person) 메서드 만들기 (여기서 person은 추가할 사람 정보를 담은 객체)
async function addPerson(person) {
    const result = await promisePool.query("INSERT INTO person (name, age) VALUES (?, ?)", [person.name, person.age]);
    console.log(result[0].insertId);
}

// Q3) deletePerson 메서드 만들기
async function deletePerson(id) {
    const result = await promisePool.query("DELETE FROM person WHERE id=?", [id]);
    console.log(result[0]);
}
// Q4) updatePerson 메서드 만들기
async function updatePerson(person) {
    const result = await promisePool.query("UPDATE person SET name=?, age=? WHERE id=?", [person.name, person.age, person.id]);
    console.log(result[0]);
}

findAllPerson();

// // 모든 커넥션 강제 종료
// promisePool.end();