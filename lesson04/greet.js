class Greet {
  greeting(msg) {
    console.log(msg);
  }
}

class Hello extends Greet {
  hi() {
    this.greeting('hi');
  }
}
class Goodbye extends Greet {
  bye() {
    this.greeting('bye');
  }
}

let a = new Hello();
a.hi()