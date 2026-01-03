// Create an interface Person and extend it with Employee.

interface Person {
  name: string;
  dob: Date;
  mobileNo: string;
  email?: string;  // Optional
}

interface Employee extends Person {
  employeeId: string;
  salary: number;
  joiningDate: Date;
  designation: string;
  department?: string; // Optional
}

const employee1: Employee = {
  name: "Alpha",
  dob: new Date("2000-07-31"),
  mobileNo: "4454545454",
  email: "alpha@company.com",
  employeeId: "EMP001",
  salary: 755894,
  joiningDate: new Date("2012-05-21"),
  designation: "Manager",
  department: "Engineering"
};

console.log(employee1);