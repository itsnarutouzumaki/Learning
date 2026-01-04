// 21️⃣ Create a function that accepts an object and logs all its keys using keyof.
interface Person { 
  name: string;
  id: string | number;
}

class User implements Person {
  name: string;
  id: string | number;
  
  constructor(name: string, id: string | number) {
    this.name = name;
    this.id = id;
  }
}

const citizen1 = new User("XYZ", 123);

const logKeys1 = (data: Person): void => {
  // Type assertion to tell TypeScript these are valid keys
  const keys = Object.keys(data) as Array<keyof Person>;
  console.log("Keys:", keys);
  
  // Or loop through them
  keys.forEach(key => {
    console.log(`Key: ${key}, Value: ${data[key]}`);
  });
};

logKeys1(citizen1);
