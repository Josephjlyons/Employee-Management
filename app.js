const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'employee_managementDB'
});

connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as ${connection.threadId}`);
    homeMenu();
});

const homeMenu = () => {
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
        .then((answer) => {
            switch (answer.choices) {
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

//====== Functions based on choices from initial prompt ======//

// ------ View All Employess ------//

function viewAllEmploy() {
    connection.query("SELECT employees.first_name, employees.last_name, roles.title, roles.salary, CONCAT(employees.first_name, ' ' , employees.last_name) AS Manager FROM employees INNER JOIN roles on role_id = employees.role_id INNER JOIN department on roles.department_id = department_id;"),
        function (err, res) {
            if (err) throw err
            console.table(res) //display results in table //need to get working
            homeMenu();
        }
}


// ------ View By Roles ------//

function viewByRoles() {
    connection.query("SELECT employees.first_name, employees.last_name, roles.title AS Title FROM employees JOIN role on employees.role_id = roles.id;"),
        function (err, res) {
            if (err) throw err
            console.table(res)
            homeMenu();
        }

}

// ------ View By Department ------//

function viewByDept() {
    connection.query("SELECT employees.first_name, employees.last_name, department.name AS Department FROM employees JOIN roles ON employees.role_id = roles.id JOIN department ON roles.department_id = department.id ORDER BY employees.id;"),
        function (err, res) {
            if (err) throw err
            console.table(res)
            homeMenu();
        }
}

// ------ Update a Current Employee ------//

function updateEmployee() {
    connection.query("SELECT")
    // inquirer


}

// ------ Add an Employee ------//

function addEmployee() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'What is the employees first name?'
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'What is the employees last name?'
        },
        {
            type: 'input',
            name: 'role_id',
            message: 'What is the employees role id?',
        },
        {
            type: 'input',
            name: 'manager_id',
            message: 'What is their managers id number?'
        }
    ])
        .then((answer) => {
            connection.query("INSERT INTO employees SET ?",
                {
                    first_name: answer.first_name,
                    last_name: answer.last_name,
                    role_id: answer.role_id,
                    manager_id: answer.manager_id
                },
                function (err, res) {
                    if (err) throw err;
                    console.table(res);
                    homeMenu();
                }
            )
        });

};

// ------ Add a Role ------//

function addRole() {
    connection.query("SELECT roles.title AS Title, roles.salary AS Salary FROM roles",
        (err, res) => {
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'Title',
                    message: 'What is the role Title?'
                },
                {
                    type: 'input',
                    name: 'Salary',
                    message: 'What is the salary of the new Role?'
                },
                {
                    type: 'list',
                    name: 'Dept',
                    message: 'What is the department id for the new role? Sales(1) Legal(2) Finance(3) Engineering(4)',
                    choices: [
                        '1',
                        '2',
                        '3',
                        '4'
                   
                    ]
                }
            ])
                .then((answer) => {
                    connection.query("INSERT INTO roles SET ?",
                        {
                            title: answer.Title,
                            salary: answer.Salary,
                            department_id: answer.Dept
                        },
                        function (err, res) {
                            if (err)
                                throw err;
                            console.table(res);
                            homeMenu();
                        }
                    );

                });
        });
};


// ------ Add Department ------//

function addDept() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'deptName',
            message: 'What Department would you like to add on?'
        }
    ])
        .then((answer) => {
            connection.query("INSERT INTO department SET ?",
                {
                    name: answer.deptName
                },
                function (err, res) {
                    if (err) throw err;
                    console.table(res);
                    homeMenu();
                }
            );
        });

};