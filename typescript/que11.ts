// Write a function with optional parameter.

const greetUser = (Name:string,place?:string) =>{
  console.log(`Hello ${Name} from ${place || "Undisclosed Place"}`);
}

greetUser("Abdul");
greetUser("Kabir","India")