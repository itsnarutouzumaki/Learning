// Write a function overload for a function that accepts either string or number.



// Overload signatures (declarations only)
function overloadedFunction(data: string): string;
function overloadedFunction(data: number): number;

// Implementation signature (actual function)
function overloadedFunction(data: any): any {
  return data;
}

// Usage - TypeScript knows the return types
const strResult: string = overloadedFunction("hello");
const numResult: number = overloadedFunction(123);
// const boolResult: boolean = overloadedFunction(true); ❌
