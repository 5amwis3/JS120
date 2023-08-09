let foo = {a: 1};
let baz = Object.create(null);
console.log(Object.getPrototypeOf(baz))



function makeGreeter(name) {
  return function greeter(name2) {
    console.log(`Hello ${name} ${name2}`);
  };
}

console.log(makeGreeter('sam')('bob'));