// 24️⃣ Create an interface with an index signature for dynamic object keys.

// String keys with any value
interface DynamicObject {
  [key: string]: any;
}

// Usage
const config: DynamicObject = {
  name: "John",
  age: 30,
  isActive: true,
  extraData: { nested: "value" }
};

console.log(config)