//const numbers = [1,2,3];
//const newNumbers = [...numbers, 4];
//console.log(newNumbers);
//
//const person = {
//    name: 'Bob'
//};
//const newPerson = {
//    ...person,
//    age: 3000
//};
//console.log(newPerson);
//
//const filter = (...args) => {
//    return args.filter(el => el === 1);
//}
//console.log(filter(1,2,3));

const numbers = [1,2,3];
[num1,,num3] = numbers;
console.log(num1,num3)