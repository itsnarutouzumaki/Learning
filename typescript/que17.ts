// Create an interface and implement it in a class.

interface Person {
  name: string;
  id: string | number;
}

class Employee implements Person {
  name: string;
  id: string | number;

  // Additional properties
  joiningDate: Date;
  designation: string;

  constructor(
    name: string,
    id: string | number,
    joiningDate: Date,
    designation: string
  ) {
    this.name = name;
    this.id = id;
    this.joiningDate = joiningDate;
    this.designation = designation;
  }

  print(): void {
    console.log("Hello, My name is", this.name, "id", this.id, "I am working as ", this.designation, "since", this.joiningDate);
  }
}

const employee1 = new Employee(
  "XYZ",
  "3734",
  new Date("2024-01-05"),
  "SDE-1"
);

console.log(employee1);

employee1.print();