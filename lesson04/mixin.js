const Speed = {
  goFast() {
    console.log(`I'm a ${this.constructor.name} and going super fast!`);
  }
};

class Car {
  goSlow() {
    console.log(`I'm safe and driving slow.`);
  }
}
Object.assign(Car.prototype, Speed)

class Truck {
  goVerySlow() {
    console.log(`I'm a heavy truck and like going very slow.`);
  }
}

let c = new Car;
let b = new Truck;
console.log('goFast' in car)

// console.log(a.constructor.toString())
// console.log()
// console.log(Car.toString())
// console.log()
// console.log(Object.getPrototypeOf(a.goSlow) === Car.constructor.prototype)
// console.log(Car.prototype)
// console.log(Car.constructor.prototype)

function Har() {
  Har.prototype.goSlow = function() {
    console.log(`I'm safe and driving slow.`);
  }
}
let h = new Har;

// console.log(c.constructor.prototype === Car.prototype)
// console.log(Object.getOwnPropertyNames(Car))
// console.log(Object.getOwnPropertyNames(Truck))
// console.log(Object.getOwnPropertyNames(Car.prototype))
// console.log(Object.getOwnPropertyNames(Truck.prototype))
// console.log(Car.prototype.constructor)

// Har.prototype = {};
// console.log()
// console.log(Object.getOwnPropertyNames(Car.prototype))


// console.log()

// console.log(h.constructor.prototype === Har.prototype)
// console.log(Object.getOwnPropertyNames(Har))
// console.log(Object.getOwnPropertyNames(Har.prototype))
// console.log(Har.prototype.constructor)
// // console.log(Object.keys(h))

// let a = {}
// console.log(Object.getOwnPropertyNames(a))