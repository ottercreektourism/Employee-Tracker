const inquirer = require('inquirer');
const db = require('./db/connection');
require('console.table');


const PORT = process.env.PORT || 3001;


function start() {
    inquirer
        .prompt([
            {
                type: "list",
                message: "Select which action you would like to do:",
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

}



// Add 
function addEmployee() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "first_name",
                message: "What would you like to do?"
            },
            {
                type: "input",
                name: "last_name",
                message: "What would you like to do?"
            }
        ]).then(response => {
            let first = response.first_name;
            let last = response.last_name;
            db.promise().query("SELECT * FROM role").then(([data])=> {
                const allRoles = data.map(({id, title}) => ({
                    name: title,
                    value: id
                }))
                inquirer
                    .prompt([
                        {
                            type: "list",
                            name: "roleID",
                            message: "What is the role?",
                            choices: allRoles
                        }
                    ]).then(res => {
                        let roleID = res.roleID;
                        db.promise().query("INSERT INTO employee(first_name, last_name, role_id) values(?,?,?)", [first, last, roleID])
                    })
            })
        }) 
        
   

}

function addRole() {

}

function addDepartment() {

}

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

}

function viewEmpByManager() {

}


// Update an employee role
// const updateEmployee = async () => {

//     app.put("/api/update_employee/:id", (req, res)=> {
//         const update_Employee = req.body.
//     })

// }


