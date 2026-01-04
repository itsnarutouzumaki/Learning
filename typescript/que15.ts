// Write a generic function that accepts an array and returns the first element.

const genericFunction = <T>(data: [T, ...T[]]): T => {
  return data[0];
}

console.log(genericFunction([1, 2, 3, 4, 5, 6]));