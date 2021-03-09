const inquirer = require('inquirer');
const mysql = require('mysql2');
const conTable = require('console.table');

const connection = mysql.createConnection ({
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'employee_managementDB'
});

connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as ${connection.threadId}`);
    connection.end();
})