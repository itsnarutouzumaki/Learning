// 28️⃣ Create a type that allows only specific HTTP methods (GET, POST, PUT, DELETE).


type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

// Usage
const method: HttpMethod = "GET";
// const method2: HttpMethod = "PATCH"; // ❌ Error

// Function parameter
function makeRequest(method: HttpMethod, url: string) {
  console.log(`Making ${method} request to ${url}`);
}

makeRequest("POST", "/api/users");