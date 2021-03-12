const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');

// Build a command-line application that at a minimum allows the user to:

// View departments, roles, employees  ---  √

// Add departments, roles, employees  --- √

// Update employee roles --- √-ish

// Bonus points if you're able to:

// Update employee managers --- update

// View employees by manager --- refined search call and function added to switch statement 

// Delete departments, roles, and employees  --- probably a drop statement somewhere 

// View the total utilized budget of a department -- ie the combined salaries of all employees in that department

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
                'View all Employees by Departments?',
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
                case 'View all Employees by Departments?':
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
                    break;

            };
        });
};

//====== Functions based on choices from initial prompt ======//

// ------ View All Employess ------//

const viewAllEmploy = () => {
    connection.query("SELECT employees.first_name,employees.last_name,roles.title,roles.salary,department.name,CONCAT(manager.first_name,' ',manager.last_name)AS Manager FROM employees LEFT JOIN employees manager ON employees.manager_id=manager.id INNER JOIN roles ON roles.id=employees.role_id INNER JOIN department ON roles.department_id=department.id;",
        function (err, res) {
            if (err) throw err
            console.table(res)
            homeMenu();
        }
    )
};


// ------ View By Roles ------//

const viewByRoles = () => {
    connection.query("SELECT employees.first_name, employees.last_name, roles.title AS Title FROM employees JOIN roles on employees.role_id = roles.id;",
        function (err, res) {
            if (err) throw err
            console.table(res)
            homeMenu();
        }
    )
};

// ------ View By Department ------//

const viewByDept = () => {
    connection.query("SELECT employees.first_name, employees.last_name, department.name AS Department FROM employees JOIN roles ON employees.role_id = roles.id JOIN department ON roles.department_id = department.id ORDER BY employees.id;",
        function (err, res) {
            if (err) throw err
            console.table(res)
            homeMenu();
        }
    )
};

// ------ Update a Current Employee ------//

const updateEmployee = () => {
    connection.query('SELECT employees.last_name AS value FROM employees', (err, results) => {
        inquirer.prompt([
            {
                type: "list",
                name: "last_name",
                message: "Choose employee to update?",
                choices: results
            },
            {
                type: "input",
                name: "role_id",
                message: "What is this employees new role_id?"
            }
        ]).then((answers) => {
            connection.query(`UPDATE employees SET role_id = ${answers.role_id} WHERE employees.last_name = '${answers.last_name}'`, function (error, data) {
                if (error) throw err;
                console.table(data)
                homeMenu();
            });
        });
    })
}

// ------ Add an Employee ------//

const addEmployee = () => {
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

const addRole = () => {
    connection.query("SELECT roles.title AS Title, roles.salary AS Salary FROM roles;",
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

const addDept = () => {
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

