// Create a function that accepts a number and returns its square.

const getSquare = (givenNumber: number): number =>{
  return givenNumber * givenNumber
}

for (let i=1;i<10;i++){
  console.log(`Square of ${i} is `+getSquare(i));
}