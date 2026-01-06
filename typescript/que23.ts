// 23️⃣ Define a type for API response where data can be either an object or null.

// Simple union type
type ApiResponse<T> = {
  data: T | null;
  success: boolean;
  message?: string;
};

// Usage
type User = {
  id: number;
  name: string;
  email: string;
};

const response1: ApiResponse<User> = {
  data: { id: 1, name: "John", email: "john@example.com" },
  success: true
};

const response2: ApiResponse<User> = {
  data: null,
  success: false,
  message: "User not found"
};

console.log(response1);

console.log(response2);