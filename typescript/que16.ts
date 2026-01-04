// Use keyof to restrict function parameters to object keys.

interface Person {
  name: string;
  id: string | number;
  age?: number;
}

// Version 1: Basic keyof usage
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const person: Person = { name: "John", id: 123 };

// ✅ Works - TypeScript knows the return type
console.log(getProperty(person, "name"))
console.log(getProperty(person, "id"))


// ❌ Type error - "address" is not a key of Person
// getProperty(person, "address");

// Version 2: Safer with optional check
function safeGetProperty<T, K extends keyof T>(
  obj: T,
  key: K
): T[K] | undefined {
  return obj[key];
}

console.log(safeGetProperty(person, "name"))
console.log(safeGetProperty(person, "id"))
// console.log(safeGetProperty(person, "address")) ❌