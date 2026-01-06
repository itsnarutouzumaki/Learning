// 25️⃣ Write a function that accepts an array of numbers OR strings and returns its length.

function lengthFunction(data: number[] | string[]): number {
  return data.length
}

console.log(lengthFunction([1, 2, 3, 4, 5]));

console.log(lengthFunction(["as", "bs", "fg"]));