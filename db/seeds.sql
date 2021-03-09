USE employee_managementDB;

-- Department Seeds -- 
INSERT INTO department (name)
VALUE ('Sales');
INSERT INTO department (name)
VALUE ('Legal');
INSERT INTO department (name)
VALUE ('Finance');
INSERT INTO department (name)
VALUE ('Enginerring');


-- Employee Role Seeds --
INSERT INTO role (title, salary, department_id)
VALUE ('Lead Engineer' 165000, 4);
INSERT INTO role (title, salary, department_id)
VALUE('Software Engineer', 135000, 4);
INSERT INTO role (title, salary, department_id)
VALUE('Legal Team Lead', 225000, 2);
INSERT INTO role (title, salary, department_id)
VALUE ('Lawyer', 175000, 2);
INSERT INTO role (title, salary, department_id)
VALUE('Sales Lead', 120000, 1);
INSERT INTO role (title, salary, department_id)
VALUE ('Salesperson', 85000, 1);
INSERT INTO role (title, salary, department_id)
VALUE ('Accountant', 135000, 3);
INSERT INTO role (title, salary, department_id)
VALUE ('Payroll Admin', 110000, 3);


-- Employee Seeds --
-- Managers first --
INSERT into employees (first_name, last_name, manger_id, role_id)
VALUE ('Elvis', 'Stanley', null, 1);
INSERT into employees (first_name, last_name, manger_id, role_id)
VALUE ('Wanda', 'Dregler',null , 2 );
INSERT into employees (first_name, last_name, manger_id, role_id)
VALUE ('Shania', 'Burns', null , 3 );
INSERT into employees (first_name, last_name, manger_id, role_id)
VALUE ('Marvin', 'Steed', null , 4 );

-- Employees that report to a manager --
INSERT into employees (first_name, last_name, manger_id, role_id)
VALUE ('Sting', 'McGee', 1 , 5 );
INSERT into employees (first_name, last_name, manger_id, role_id)
VALUE ('Randy', 'Mann', 2 , 6 );
INSERT into employees (first_name, last_name, manger_id, role_id)
VALUE ('Jose', 'Carloco', 3 , 7 );
INSERT into employees (first_name, last_name, manger_id, role_id)
VALUE ('Harry', 'Backman', 4 , 8 );


