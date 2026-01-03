// Write a function using generics that returns the same value passed.

function genericsPrintFunction<T>(data: T): T {
  console.log(data);
  return data
}

genericsPrintFunction("Hello World")

genericsPrintFunction(65)
