function Rectangle(length, width) {
  this.length = length;
  this.width = width;
}

let a = new Rectangle;

// // Rectangle.prototype.getArea = function() {
//   // return this.length * this.width;
// // };

// // Rectangle.prototype.toString = function() {
// //   return `[Rectangle ${this.length} x ${this.width}]`;
// // };

// class Square extends Rectangle{
//   constructor(size) {
//     super(size, size)
//   this.length = size;
//   this.width = size;
// }}

// Square.prototype = Object.create(Rectangle.prototype);

// Square.prototype.toString = function() {
//   return `[Square ${this.length} x ${this.width}]`;
// };

// let sqr = new Square(5);
// sqr.toString();    // => "[Square 5 x 5]"
// Square.prototype.constructor = Square;
console.log(a.constructor)