// 30️⃣ Use Record<K, V> to model a configuration object.

type AppConfig = Record<string, string | number | boolean>;

// Usage
const config: AppConfig = {
  appName: "MyApp",
  version: "1.0.0",
  port: 3000,
  debug: true,
  apiUrl: "https://api.example.com"
};


// other way where we restrict the key
type Fruit = 'apple' | 'banana' | 'cherry';
type FruitColors = Record<Fruit, string>;

const colors: FruitColors = {
  apple: 'red',
  banana: 'yellow',
  cherry: 'red'
  // Error if 'cherry' is missing or an extra key is added
};
