const inquirer = require('inquirer');
const mysql = require('mysql2');
const conTable = require('console.table');

const connection = mysql.createConnection({
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'employee_managementDB'
});

connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as ${connection.threadId}`);
    startQuestions();
})

const startQuestions = () => {
    inquirer.prompt([

        {
            type: 'list',
            name: 'choices',
            message: 'What would you like to do?',
            choices: [

                'View all Employees?',
                'View all Employees by Roles?',
                'View all Emplyees by Departments?',
                'Update Employee?',
                'Add Employee?',
                'Add Role?',
                'Add Department?'
            ]
        }

    ])
        .then((answers) => {
            switch (answers.choices) {
                case 'View all Employees?':
                    viewAllEmploy();
                    break;
                case 'View all Employees by Roles?':
                    viewByRoles();
                    break;
                case 'View all Emplyees by Departments?':
                    viewByDept();
                    break;
                case 'Update Employee?':
                    updateEmployee();
                    break;
                case 'Add Employee?':
                    addEmployee();
                    break;
                case 'Add Role?':
                    addRole();
                    break;
                case 'Add Department?':
                    addDept();
            };
        });
};

//===== Functions based on choices from initial prompt =======//

// ------ View All Employess ------//

function viewAllEmploy() {


}


// ------ View By Roles ------//

function viewByRoles() {


}

// ------ View By Department ------//

function viewByDept() {


}

// ------ Update a Current Employee ------//

function updateEmployee() {


}

// ------ Add an Employee ------//

function addEmployee() {


}

// ------ Add a Role ------//

function addRole() {


}

// ------ Add Department ------//

function addDept(){

    
}