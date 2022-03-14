const inquirer = require('inquirer');
const db = require('./db/connection');
require('console.table');


const PORT = process.env.PORT || 3001;


function start() {
    inquirer
        .prompt([
            {
                type: "list",
                message: "Select an action:",
                choices: ["View Employees", "Add Employee", "Delete Employee", "Update Employee",
                    "View Roles", "Add Role", "Delete Role", "Update Role",
                    "View Departments", "Add Department", "Delete Department", "Update Department",
                    "Update Employee Roles", "Update Employee Manager",
                    "View Employees by Department", "View Employees By Manager"],
                name: "start"
            }

        ]).then(function (response) {
            switch (response.start) {
                case "View Employees":
                    viewEmployees();
                    break;
                case "Add Employee":
                    addEmployee();
                    break;
                case "Delete Employee":
                    deleteEmployee();
                    break;
                case "Update Employee":
                    updateEmployee();
                    break;
                case "View Roles":
                    viewRoles();
                    break;
                case "Add Role":
                    addRole();
                    break;
                case "Delete Role":
                    deleteRole();
                    break;
                case "Update Role":
                    updateRole();
                    break;
                case "View Departments":
                    viewDepartments();
                    break;
                case "Add Department":
                    addDepartment();
                    break;
                case "Delete Department":
                    deleteDepartment();
                    break;
                case "Update Department":
                    updateDepartment();
                    break;
                case "Update Employee Roles":
                    updateEmployeeRoles();
                    break;
                case "Update Employee Manager":
                    updateEmployeeManager();
                    break;
                case "View Employees by Department":
                    viewEmpByDept();
                    break;
                case "View Employees By Manager":
                    viewEmpByManager();
                    break;
            }

        })
}

start();

// View
function viewEmployees() {
    db.promise().query("SELECT * FROM employee").then(([data]) => {
        console.table(data);
        start();
    })
}

function viewRoles() {
    db.promise().query("SELECT * FROM role").then(([data]) => {
        console.table(data);
        start();
    })

}

function viewDepartments() {
    db.promise().query("SELECT * FROM department").then(([data]) => {
        console.table(data);
        start();
    })
}



// Add 
function addEmployee() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "first_name",
                message: "Employee first name:"
            },
            {
                type: "input",
                name: "last_name",
                message: "Employee last name:"
            }
        ]).then(response => {
            let first = response.first_name;
            let last = response.last_name;
            db.promise().query("SELECT * FROM role").then(([data]) => {
                const allRoles = data.map(({ id, title }) => ({
                    name: title,
                    value: id
                }))
                inquirer
                    .prompt([
                        {
                            type: "list",
                            name: "roleID",
                            message: "What is the employee's role?",
                            choices: allRoles
                        }
                    ]).then(res => {
                        let roleID = res.roleID;
                        db.promise().query("INSERT INTO employee(first_name, last_name, role_id) values(?,?,?)", [first, last, roleID])
                    }).then(res => {
                        inquirer
                            .prompt([
                                {
                                    type: "input",
                                    name: "managerID",
                                    message: "Enter Manager ID (leave blank for none):"
                                }
                            ]).then(res => {
                                let managerID = res.managerID;
                                db.promise().query("INSERT INTO employee(first_name, last_name, role_id, manager_id) values(?,?,?,?)", [first, last, roleID, managerID])
                            })
                    })
            })
        })
}

function addRole() {
    inquirer
        .prompt([
            {
                type: "input",
                name:"new_role_name",
                message: "Name of new role:",
            },
            {
                type: "input",
                name: "new_role_salary",
                message: "Salary of the new role:"
            },
            {
                type: "input",
                name: "new_role_dept_id",
                message: "Department ID Number:"
            }

        ]).then(res => {
            let newRole = res.new_role;
            let newRoleSalary = res.new_role_salary;
            let newRoleDeptID = res.new_role_dept_id;
            db.promise().query("INSERT INTO role(new_role_name, new_role_salary, new_role_dept_id) values(?,?,?)", [newRole, newRoleSalary, newRoleDeptID])
        })
}

function addDepartment() {
    inquirer
    .prompt([
        {
            type: "input",
            name:"new_dept_name",
            message: "Name of new role:",
        }
    ]).then(res => {
        let newDept = res.new_dept_name;
        db.promise().query("INSERT INTO department(new_dept_name values (?) ", [newDept]).then(([data]) => {
            console.table(data);
    })
})

// delete
function deleteEmployee() {

}
function deleteRole() {

}
function deleteDepartment() {

}

// update
function updateEmployee() {

}

function updateEmployeeRoles() {

}

function updateEmployeeManager() {

}

// view by

function viewEmpByDept() {
    db.promise().query("SELECT * FROM department").then(([data]) => {
        const allDepts = data.map(({ id, name }) => ({
            name: name,
            value: id
        }))
        inquirer
            .prompt([
                {
                    type: "list",
                    name: "viewDepts",
                    message: "Which department's employees would you like to view?",
                    choices: allDepts
                }
            ]).then(([data]) => {
                console.table(data);
            })
    })
}

function viewEmpByManager() {

}


