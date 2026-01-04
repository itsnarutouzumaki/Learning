// Write a type guard using typeof.

const typeResponse = (data: string | number): void => {
  if (typeof data == "number") {
    console.log("Given Number is", data);
  } else {
    console.log("Hello", data);
  }
};

typeResponse(9);
typeResponse("World");