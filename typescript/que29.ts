// 29️⃣ Write a function that uses rest parameters with proper typing.

function sum(...numbers: number[]): number {
    return numbers.reduce((total, num) => total + num, 0);
}

console.log(sum(1, 2, 3));     
console.log(sum(10, 20, 30, 40)); 
console.log(sum());   
