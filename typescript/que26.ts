// 26️⃣ Create a readonly property inside an interface and try modifying it (observe error).

interface Person {
  readonly id: string | number,
  name: string
}

const person1: Person = {
  id: 202399,
  name: "XYZZ"
}

// person1.id="fdfdff"  ❌because it is readonly so you can not modify it