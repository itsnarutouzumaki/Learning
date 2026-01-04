// Use Partial<T> on a User type.
type user = {
  name:string,
  id:string | number,
  DOB:Date,
  MobileNo:number
}

type Employee = Partial<user>

const EMP001:Employee = {
  name:"Somenath Singh",
  id:"asdsad",
  DOB:new Date("2000-05-21")
}

console.log(EMP001);