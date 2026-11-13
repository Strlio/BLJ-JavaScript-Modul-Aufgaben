const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let xv = Math.floor(Math.random() * 5) + 1; // x-velocity
let yv = Math.floor(Math.random() * 5) + 1; // y-velocity
let x = 100; // x-position
let y = 100; // y-position

function drawBall(x, y, radius, color) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI);
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.stroke();
}

function animate() {
  // Clear the canvas every frame
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the ball
  drawBall(x, y, 50, "blue");

  // Update position
  x += xv;
  y += yv;

  // Simple wall bounce logic
  if (x + 50 > canvas.width || x - 50 < 0) {
    xv *= -1;
  }
  if (y + 50 > canvas.height || y - 50 < 0) {
    yv *= -1;
  }

  // Request the next frame
  requestAnimationFrame(animate);
}

// Start the animation loop
animate();