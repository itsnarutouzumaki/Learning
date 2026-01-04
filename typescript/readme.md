# 📘 TypeScript Practice Questions (1–50)

This README contains **50 TypeScript practice questions** arranged from **basic → medium → advanced** level. These questions are designed for developers who already know **JavaScript** and want to master **TypeScript with strict mode**.

---

## 🟢 BASIC (1–5)

1. Declare a variable that can store a `string` or a `number`.
2. Create a function that accepts a number and returns its square.
3. Create an object type for `User` with `id`, `name`, and optional `email`.
4. Define an array that can store only booleans.
5. Write a function that returns `void`.

---

## 🟡 MEDIUM (6–14)

6. Create an interface `Person` and extend it with `Employee`.
7. Write a function using generics that returns the same value passed.
8. Create a tuple for `[username, age]`.
9. Define an enum for user roles: `ADMIN`, `USER`, `GUEST`.
10. Use `Partial<T>` on a `User` type.
11. Write a function with an optional parameter.
12. Create a union type for API status: `"loading" | "success" | "error"`.
13. Write a type guard using `typeof`.
14. Create a readonly array of numbers.

---

## 🔴 ADVANCED (15–20)

15. Write a generic function that accepts an array and returns the first element.
16. Use `keyof` to restrict function parameters to object keys.
17. Create an interface and implement it in a class.
18. Write a function overload for a function that accepts either `string` or `number`.
19. Create a `Record<string, number>` example.
20. Use `Pick<T, K>` to extract specific properties from a type.

---

## 🟡 MEDIUM–ADVANCED (21–35)

21. Create a function that accepts an object and logs all its keys using `keyof`.
22. Create a generic function that merges two objects and returns a combined type.
23. Define a type for an API response where `data` can be either an object or `null`.
24. Create an interface with an index signature for dynamic object keys.
25. Write a function that accepts an array of numbers **or** strings and returns its length.
26. Create a `readonly` property inside an interface and try modifying it (observe the error).
27. Define a tuple with optional elements.
28. Create a type that allows only specific HTTP methods (`GET`, `POST`, `PUT`, `DELETE`).
29. Write a function that uses rest parameters with proper typing.
30. Use `Record<K, V>` to model a configuration object.
31. Create a function that safely handles `unknown` input.
32. Create a discriminated union for shapes (`circle`, `rectangle`) and calculate area.
33. Write a function that returns `never` and explain when it is used.
34. Create a mapped type that converts all properties to optional.
35. Use `as const` to create a readonly object with literal types.

---

## 🔴 ADVANCED (36–50)

36. Write a generic function that accepts only objects having an `id` property.
37. Create a utility type using `Omit<T, K>` and demonstrate its usage.
38. Write function overloads for a function that behaves differently for `string` and `number`.
39. Use `keyof typeof` on an enum-like object.
40. Create a type-safe event handler system using generics.
41. Write a conditional type that checks if a type is `string`.
42. Create a deep readonly mapped type.
43. Write a function that uses `asserts` for custom type narrowing.
44. Create a tuple-to-object transformation using mapped types.
45. Create a type-safe API response handler using generics.
46. Use template literal types to generate event names.
47. Create a function that enforces exhaustive checks using `never`.
48. Write a class that implements multiple interfaces.
49. Create a utility type that extracts only function properties from a type.
50. Create a type-safe configuration system using `keyof`, `Record`, and generics.

---

## ✅ Practice Guidelines

* Enable `strict: true` in `tsconfig.json`
* Avoid using `any`
* Prefer type inference but be explicit when needed
* Write each solution in a separate `.ts` file

Happy learning 🚀
