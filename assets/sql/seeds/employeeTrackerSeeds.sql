INSERT INTO department (name)
VALUE ( "Sales"),( "Engineering"),( "Legal");

INSERT INTO role ( title, salary, department_id)
VALUE ( "Manager",10000, 1), ( "Sales",200, 2), ( "Other",50, 3);

INSERT INTO employee ( first_name, last_name, role_id)
VALUE ( "Jordon", "Runge",  2 ), ( "kendall", ".",  1  ), ("arron", "hgvvghv",  3), ( "Other", "..", 2);

SELECT * FROM employeeTrackerDB.department;
SELECT * FROM employeeTrackerDB.role;
SELECT * FROM employeeTrackerDB.employee;