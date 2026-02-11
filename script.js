const canvas = document.getElementById('heartCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Function to draw heart shape
function drawHeart(x, y, size, color) {
  ctx.save();
  ctx.beginPath();
  ctx.translate(x, y);
  ctx.moveTo(0, 0);
  ctx.bezierCurveTo(-size/2, -size/2, -size, size/3, 0, size);
  ctx.bezierCurveTo(size, size/3, size/2, -size/2, 0, 0);
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.globalAlpha = 0.7;
  ctx.fill();
  ctx.restore();
}

const heartColors = ['#ff517e', '#f72660', '#d72660', '#ffbeef', '#fc99b2', '#ff69b4'];
let hearts = [];

function randomVal(min, max) {
  return Math.random() * (max - min) + min;
}

// Create floating hearts
for (let i = 0; i < 70; i++) {
  hearts.push({
    x: randomVal(0, canvas.width),
    y: randomVal(0, canvas.height),
    size: randomVal(14, 30),
    color: heartColors[Math.floor(Math.random() * heartColors.length)],
    speed: randomVal(0.4, 1.2),
    drift: randomVal(-0.6, 0.6),
    opacity: randomVal(0.3, 0.9)
  });
}

// Animation loop
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  hearts.forEach(heart => {
    heart.y -= heart.speed;
    heart.x += heart.drift;
    
    // Reset heart when it goes off screen
    if (heart.y < -30 || heart.x < -30 || heart.x > canvas.width + 30) {
      heart.y = canvas.height + 20;
      heart.x = randomVal(0, canvas.width);
      heart.speed = randomVal(0.4, 1.2);
    }
    
    drawHeart(heart.x, heart.y, heart.size, heart.color);
  });
  
  requestAnimationFrame(animate);
}

// Handle window resize
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// Start animation
animate();