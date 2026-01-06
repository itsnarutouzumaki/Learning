// 22️⃣ Create a generic function that merges two objects and returns a combined type.
function mergeObject<T, U>(obj1: T, obj2: U): T & U {
  return { ...obj1, ...obj2 };
}

console.log(mergeObject(
  { name: "ABC", id: "2023ff" },
  { name: "ABC", empId: 3233, joiningDate: new Date() }
)
)