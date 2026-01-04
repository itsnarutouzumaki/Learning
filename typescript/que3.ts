// Create an object type for User with id, name, and optional email.

type user = {
  id: number | string,
  name: string,
  email?: string
};

const user1: user = {
  id: "2023CA99",
  name: "Somenath Singh"
}

console.log(user1);
