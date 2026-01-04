// Create a readonly array of numbers.

const array1: readonly number[] = [1, 2, 3, 4, 3, 4]

const array2: ReadonlyArray<number> = [4, 3, 3.43, 3, 23, 32443]

array1.forEach(item => console.log(item))

array2.forEach(item => console.log(item))