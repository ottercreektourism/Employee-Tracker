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
                choices: ["View Employees", "View Roles", "View Departments", "Add Employee", "Add Role", "Add Department",
                    "Update Employee Roles"],
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
                case "View Roles":
                    viewRoles();
                    break;
                case "Add Role":
                    addRole();
                    break;
                case "View Departments":
                    viewDepartments();
                    break;
                case "Add Department":
                    addDepartment();
                    break;
                case "Update Employee Roles":
                    updateEmployeeRoles();
                    break;
                // case "View Employees By Manager":
                //     viewEmpByManager();
                //     break;
            }

        })
}

start();

// View
function viewEmployees() {
    db.promise().query("SELECT employee.id, employee.first_name, employee.last_name, title, salary, name AS department, manager.first_name AS manager_first_name, manager.last_name AS manager_last_name FROM employee LEFT JOIN employee manager ON employee.manager_id = manager.id LEFT JOIN ROLE ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id").then(([data]) => {
        console.log("\n");
        console.table(data);
        start();
    })
}

function viewRoles() {
    db.promise().query("SELECT role.id, role.title, role.salary, role.department_id, department.name AS department FROM role LEFT JOIN department ON department.id = role.department_id").then(([data]) => {
        console.log("\n");
        console.table(data);
        start();
    })

}

function viewDepartments() {
    db.promise().query("SELECT * FROM department").then(([data]) => {
        console.log("\n");
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
            let roleID;
            let managerID;
            // Selects all roles so they can be displayed as choices in the employee role category
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
                        },
                        {
                            type: "input",
                            name: "managerID",
                            message: "Enter Manager ID (leave blank for none):"
                        }
                    ]).then(res => {
                        roleID = res.roleID;
                        managerID = res.managerID;
                        db.promise().query("INSERT INTO employee(first_name, last_name, role_id, manager_id) values(?,?,?,?)", [first, last, roleID, managerID]).then(([data]) => {
                            viewEmployees();
                            start();
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
                name: "title",
                message: "Name of new role:"
            },
            {
                type: "input",
                name: "salary",
                message: "Salary of the new role:"
            }
        ]).then(res => {
            let title = res.title;
            let salary = res.salary;
            let departmentID;
            db.promise().query("SELECT * FROM department").then(([data]) => {
                const allDepartments = data.map(({ id, name }) => ({
                    name: name,
                    value: id
                }))
                inquirer
                    .prompt([
                        {
                            type: "list",
                            name: "departmentID",
                            message: "Department of new role:",
                            choices: allDepartments
                        }
                    ]).then(res => {
                        departmentID = res.departmentID;
                        db.promise().query("INSERT INTO role(title, salary, department_id) values(?,?,?)", [title, salary, departmentID]).then(([data]) => {
                            viewRoles();
                            start();
                        })
                    })
            })
        })
}

function addDepartment() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "name",
                message: "Name of new department:",
            }
        ]).then(res => {
            let newDept = res.name;
            db.promise().query("INSERT INTO department(name) values(?)", [newDept]).then(([data]) => {
                viewDepartments();
                start();
            })
        })
}

function updateEmployeeRoles() {
    db.promise().query("SELECT * FROM employee").then(([data]) => {
        const allEmployees = data.map(({ id, first_name }) => ({
            name: first_name,
            value: id
        }))
        inquirer
            .prompt([
                {
                    type: "list",
                    name: "id",
                    message: "Select an employee to update their role:",
                    choices: allEmployees
                }
            ]).then(res => {
                employeeID = res.id;
                db.promise().query("SELECT * FROM role").then(([data]) => {
                    const allRoles = data.map(({ id, title }) => ({
                        name: title,
                        value: id
                    }))
                    inquirer
                        .prompt([
                            {
                                type: "list",
                                name: "role_id",
                                message: "Select a new role:",
                                choices: allRoles
                            }
                        ]).then(res => {
                            title = res.role_id;
                            console.log(allEmployees);
                            console.log(allRoles);
                            console.log(title);
                            console.log(employeeID);
                            db.promise().query(`UPDATE employee SET role_id = ${title} WHERE id = ${employeeID}`)
                            viewEmployees();
                            start();
                        })

                })
            })
    })
}


// function viewEmpByDept() {
//     db.promise().query("SELECT * FROM department").then(([data]) => {
//         const allDepts = data.map(({ id, name }) => ({
//             name: name,
//             value: id
//         }))
//         inquirer
//             .prompt([
//                 {
//                     type: "list",
//                     name: "viewDepts",
//                     message: "Which department's employees would you like to view?",
//                     choices: allDepts
//                 }
//             ]).then(([data]) => {
//                 console.table(data);
//             })
//     })
// }



