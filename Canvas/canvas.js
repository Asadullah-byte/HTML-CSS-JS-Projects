
// //rectangles
// c.fillRect(100, 100, 100, 100);
// c.fillRect(400, 100, 100,100);
// c.fillRect(300, 300, 100, 100);

// //line
// c.beginPath();
// c.moveTo(350, 100);
// c.lineTo(400, 500);
// c.strokeStyle = '#FCFF00';
// c.stroke();

// //Arc / Circle

// for (let i = 0; i < 150; i++) {
//     var x = Math.random() * window.innerWidth;
//     var y = Math.random() * window.innerHeight;

//     c.beginPath();
//     c.arc(x, y, 20, 0, Math.PI * 2, false);
//     let colorNo = Math.floor(Math.random() * 10 + 1);
//     let color = colorNo === 1 ? "Red" : colorNo === 2 ? "Purple" : colorNo === 3 ? "Yellow" : colorNo === 4 ? "maroon" : colorNo ===5 ? "Palegreen": colorNo ===6 ? "Orange" : colorNo === 7 ? "Green" :colorNo=== 8? "crimson" : colorNo === 9 ? "lime" : "tan";
//     c.strokeStyle = color ;
//     c.stroke();

// }
var canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;

canvas.height = window.innerHeight;

var c = canvas.getContext("2d");

var mouse = {
  x: undefined,
  y: undefined
}
window.addEventListener('mousemove', function (event) {
  mouse.x = event.x;
  mouse.y = event.y; 
  
}) 

window.addEventListener('resize', function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
})


var colorArray = [
  '#413e4a',
  '#73626e',
  '#b38184',
  '#f0b49e',
  '#f7e4be',
  '#005f6b',
  '#343838',
  '#00b4cc'
];

class Circle {
  constructor(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.maxRadius =(Math.random() * 25) + 7;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

    this.draw = function () {
      c.beginPath();
      c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      c.fillStyle = this.color;
      c.fill();
      c.closePath();
    };

    this.update = function () {
      
      if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
        this.dx = -this.dx;
      }
      if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
        this.dy = -this.dy;
      }

      this.x += this.dx;
      this.y += this.dy;

      if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
        if (this.radius < this.maxRadius) {
        this.radius += 1;
      }
      }
      
      else if (this.radius > this.minRadius) {
        this.radius -= 1;
      }
      this.draw();
    };
  }
}
var circleArray = [];


function init() {
  circleArray = [];
    for (let i = 0; i < 20; i++) {
      var x = Math.random() * (innerWidth - radius * 2) + radius;
  var y = Math.random() *(innerHeight - radius * 2) + radius;
  var dx = (Math.random() - 0.5) * 4;
  var dy = (Math.random() - 0.5) * 4;
  var radius = Math.random() * 2 + 3;
   circleArray.push(new Circle(x ,y , dx ,dy,radius ));
  }
    
}

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);
    for (let i = 0; i < circleArray.length; i++) {
        circleArray[i].update(); 
        
    }
  
}
init();
animate();
