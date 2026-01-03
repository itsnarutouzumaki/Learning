// Define an array that can store only booleans.

let booleanArray:boolean[]=[];

booleanArray.push(false)
booleanArray.push(true)
booleanArray.push(true)
booleanArray.push(false)
booleanArray.push(true)

booleanArray.map((item:boolean)=>{
  console.log(item)
})