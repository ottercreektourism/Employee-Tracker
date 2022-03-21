# Employee Tracker 
    
![License](https://img.shields.io/badge/License-MIT-yellow.svg)

## Description
This application is meant to be used to keep track of the employees working at a company, and can yield tables showing which role the employee has currently and which department that role is in. The user has the option to view department, roles, or employees, add a department role or employee, or update an employee's role in the company. Role salary and manager can also be indicated, which will also show up in the table results.

  ## Table of Contents 
  * [Installation](#installation)
  * [Usage](#usage)
  * [License](#license)
  * [Contributing](#contributing)
  * [Tests](#tests)
  * [Questions](#questions)
  
  ## Installation
  
  To install necessary dependencies, type the following command into the terminal:
  
  > npm init -y

  >npm i


  ## Usage
  

  After installing necessary dependencies, type node index.js into the terminal and hit the Enter key to pull up the user inqueries. You will be promted to choose whether you would like to view or add an employee, role or department, or to update an employee's role in the company. After you type in each response, hit the Enter key. This will take you back to the start where you can choose another add, view or update option. If you choose to view, a table will appear with the information about the indicated parameter.
  
  Video walkthrough at: https://youtu.be/CCaBD4t3vEQ
  
  ## License

  This project is licensed under the MIT license.  

## Contributing

Pull requests are welcome. For any major changes, please open an issue first to discuss what you’d like to change. Please make sure to update tests as appropriate.

## Tests

To source sql, type in terminal:
> mysql -u root

> SOURCE db/schema.sql;

> SOURCE db/seeds.sql;

To exit mysql terminal and go back to bash, type:
> quit

To run, type into bash terminal:
> node server.js

## Questions

If you have any questions, please visit https://github.com/ottercreektourism or email me at mkflynn13@gmail.com.