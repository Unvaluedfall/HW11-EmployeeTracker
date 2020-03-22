const inquirer = require("inquirer");
const mysql = require("mysql");
const cTable = require("console.table");

var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "Supertomy11",
    database: "employeeTrackerDB"
});
  
  connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    start();
});

function start() {
  var choiceArr = [ "Add Something!",  "View Something!", "Update Something!","EXIT"];
    inquirer
      .prompt({
        name: "Main_Menu",
        type: "list",
        choices: choiceArr
      })
      .then(function(answer) {
        switch(answer.Main_Menu){
          case choiceArr[0]:
            add();
          break;
          case choiceArr[1]:
            view();
          break;
          case choiceArr[2]:
            update();
          break;
          case choiceArr[3]:
            connection.end();
          break;  
        } 
      });
}

function add(){ 
  var choiceArr = ["Add Department!", "Add Roles!", "Add Employee!","EXIT"];
    inquirer
      .prompt({
        name: "Add_Menu",
        type: "list",
        choices: choiceArr
      })
      .then(function(answer) {
        switch(answer.Add_Menu){
          case choiceArr[0]:
            addDepartments();
          break;
          case choiceArr[1]:
            addRoles();
          break;
          case choiceArr[2]:
            addEmployees();
          break;
          case choiceArr[3]:
            start();
          break;  
        }
    })

  function addDepartments(){
    inquirer
    .prompt([
      {
        name: "departmentId",
        type: "input",
        message: "Whats the ID of the Department?",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      },
      {
        name: "departmentName",
        type: "input",
        message: "Whats the Name of the Department?"
      }
    ])
    .then(function(answer) {
          var query = "INSERT INTO department (id, name) VALUES (?,?)"
        connection.query(query,[answer.departmentId, answer.departmentName], function(err, result){
            if (err) throw err;
            start()
        });
    });    
  }

   function addRoles(){ 
    
    inquirer
    .prompt([
      {
        name: "roleTitle",
        type: "input",
        message: "Whats the Title of the Role?"
      },
      {
        name: "roleSalary",
        type: "input",
        message: "Whats the Salary of the Role?",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      },
    ]).then(function(answer) {
      inquirer.prompt([
        {
          name: "roleDepartmentID",
          message: "Whas the department it's associated to?",
          type: "list",
          choices: ""
        }
      ]).then(function(departmentAnswer){
          var query = "INSERT INTO role ( title, salary, department_id) VALUES (?,?,?,?)"
        connection.query(query,[answer.roleTitle, answer.roleSalary, departmentAnswer.roleDepartmentID], function(err, result){
          if (err) throw err;
          start()
      });
    });
  });    
}

  function addEmployees(){
  inquirer
  .prompt([
    {
      name: "departmentName",
      type: "input",
      message: "Whats the Name of the Department?"
    },
    {
      name: "departmentId",
      type: "input",
      message: "Whats the ID of the Department?"
    }
  ])
  .then(function(answer) {
        var query = "INSERT INTO department (name, id) VALUES (?,?)"
      connection.query(query,[answer.departmentName,answer.departmentId], function(err, result){
          if (err) throw err;
          start()
      });
  });    
  }
}

function view(){
  var choiceArr = [ "View All!",  "View Departments!", "View Roles!", "View Employees!","EXIT"];
    inquirer
      .prompt([
        {
          name: "View_Menu",
          type: "list",
          choices: choiceArr
        }
      ])
      .then(function(answer) {
        switch(answer.View_Menu){
          case choiceArr[0]:
            viewAll();
          break;
          case choiceArr[1]:
            viewDepartments();
          break;
          case choiceArr[2]:
            viewRoles();
          break;
          case choiceArr[3]:
            viewEmployees();
          break;
          case choiceArr[4]:
            start();
          break;  
        }
      });  
      
  function viewAll(){ 
      connection.query('SELECT department.name, employee.first_name, employee.last_name, role.title, role.salary FROM department RIGHT JOIN role ON department.id = role.department_id LEFT JOIN employee ON role.id = employee.role_id', function(err, result){
          if (err) throw err;
          console.table(result)
          start()
      });
  }

  function viewDepartments(){
      connection.query("SELECT * FROM employeeTrackerDB.department", function(err, result){
        if (err) throw err;
        console.table(result)
        start()
    });    
  }
    
  function viewRoles(){
    connection.query("SELECT * FROM employeeTrackerDB.role", function(err, result){
      if (err) throw err;
      console.table(result)
      start()
  });    
  }

  function viewEmployees(){
    connection.query("SELECT * FROM employeeTrackerDB.employee", function(err, result){
      if (err) throw err;
      console.table(result)
      start()
  });    
  }
}

function update(){
  var choiceArr = ["Update Department!", "Update Roles!", "Update Employee!","EXIT"];
    inquirer
      .prompt({
        name: "updateMenu",
        type: "list",
        choices: choiceArr
      })
      .then(function() {
        if (answer.updateMenu === choiceArr[0]) {
            updateDepartments(answer);
        }else if(answer.updateMenu === choiceArr[1]) {
            updateRoles();
        }else if(answer.updateMenu === choiceArr[2]) {
            updateEmployees();
        }else {
            start();
        }
    })

  function updateDepartments(){
  connection.query("UPDATE department(id) SET id = ?", function(err, result){
  if (err) throw err;
  console.table(result)

  inquirer
      .prompt({
        name: "updateMenu",
        type: "list",
        choices: choiceArr
      })
      .then(function() {
        if (answer.updateMenu === choiceArr[0]) {
            updateDepartments(answer);
        }else if(answer.updateMenu === choiceArr[1]) {
            updateRoles();
        }else if(answer.updateMenu === choiceArr[2]) {
            updateEmployees();
        }else {
            start();
        }
    })

  start()
  });    
  }

  function updateRoles(){
  connection.query("SELECT * FROM employeeTrackerDB.role", function(err, result){
  if (err) throw err;
  console.table(result)
  start()
  });    
  }

  function updateEmployees(){
    connection.query("SELECT * FROM employeeTrackerDB.employee", function(err, result){
      if (err) throw err;
      console.table(result)
      start()
  });    
  }
}


function getDepartment(){
  connection.query("SELECT * FROM employeeTrackerDB.department", function(err, result){
    if (err) throw err;
    console.log(result)
    return result
  });
}

function getRoles(){
  connection.query("SELECT department.id, depart FROM employeeTrackerDB.department", function(err, result){
    if (err) throw err;
    console.log(result)
    return JSON.stringify(result)
  });
}

function getEmployees(){
  connection.query("SELECT * FROM employeeTrackerDB.employee", function(err, result){
    if (err) throw err;
    console.log(result)
  });
}



// app.get("/:operation/:num1/:num2", function(req, res) {

//   const operation = req.params.operation
//   let num1 = req.params.num1
//         num1 = parseInt(num1);
//   let num2 = req.params.num2
//         num2 = parseInt(num2)

//   // TODO parse out the variables from the request
//   // Parameters are received from the URL
//   // TODO make sure they're converted to integers (and not strings)
//   // Parameters are converted to integers

//   // Initialize the result variable to send later
//   var result;
//   // Switch statement chooses operation based on the operation parameter.
//   switch (operation) {
//   // BONUS - How could you use * + etc. inside the app.get()?
//   case "add":
//     // Add your logic here. Pun intended.
//     result = num1 + num2;
//     break;
//   case "subtract":
//     // Subtract logic
//     result = num1 - num2;
//     break;
//   case "multiply":
//     // Multiply
//     result = num1 * num2;
//     break;
//   case "divide":
//     // Divide
//     result = num1 / num2;
//     break;
//   default:
//     // Handle anything that isn't specified
//     result = "Sorry! The only valid operations are add, subtract, multiply, and divide.";
//   }

//   // We return the result back to the user in the form of a string
//   res.send(result.toString());

// });

// // Start our server so that it can begin listening to client requests.
// app.listen(PORT, function() {
//   // Log (server-side) when our server has started
//   console.log("Server listening on: http://localhost:" + PORT);
// });