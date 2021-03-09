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

