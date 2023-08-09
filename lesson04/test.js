function Rectangle(length, width) {
  this.length = length;
  this.width = width;
}

Rectangle.prototype.area = function() {
  return this.length * this.width;
}

console.log(new Rectangle(2,3).area())

function Square(size) {                                 //constructor(size) {}
  Rectangle.call(this, size, size)                      //super(size, size)
}

Square.prototype = Object.create(Rectangle.prototype);  //extends Rectangle...
Square.prototype.constructor = Square;                  //...

console.log(Square.prototype.constructor);

let a = new Square(2);
console.log(a.area())

//vs

// class Rectangle {
//   constructor(length, width) {
//     this.length = length;
//     this.width = width;
//   }

//   area() {
//     return this.length * this.width;
//   }
// }

// class Square extends Rectangle {
//   constructor(size) {
//     super(size, size);
//   }
// }

// let a = new Square(2);
// console.log(a.area());