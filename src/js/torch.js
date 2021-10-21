const c = document.getElementById('js-torch');
const ctx = c.getContext('2d');
// eslint-disable-next-line no-multi-assign
const cw = c.width = 800;
// eslint-disable-next-line no-multi-assign
const ch = c.height = 800;
const parts = [];
const partCount = 200;
let partsFull = false;
const hueRange = 50;
let globalTick = 0;
const rand = function (min, max) {
  return Math.floor((Math.random() * (max - min + 1)) + min);
};

const Part = function () {
  this.reset();
};

Part.prototype.reset = function () {
  this.startRadius = rand(1, 120);
  this.radius = this.startRadius;
  this.x = cw / 2 + (rand(0, 6) - 3);
  this.y = 600;
  this.vx = 0;
  this.vy = 0;
  this.hue = rand(globalTick - hueRange, globalTick + hueRange);
  this.saturation = rand(90, 100);
  this.lightness = rand(70, 100);
  this.startAlpha = rand(1, 10) / 100;
  this.alpha = this.startAlpha;
  this.decayRate = 0.1;
  this.startLife = 9.5;
  this.life = this.startLife;
  this.lineWidth = rand(1, 3);
};

Part.prototype.update = function () {
  this.vx += (rand(0, 200) - 100) / 1500;
  this.vy -= this.life / 50;
  this.x += this.vx;
  this.y += this.vy;
  this.alpha = this.startAlpha * (this.life / this.startLife);
  this.radius = this.startRadius * (this.life / this.startLife);
  this.life -= this.decayRate;
  if (
    this.x > cw + this.radius
    || this.x < -this.radius
    || this.y > ch + this.radius
    || this.y < -this.radius
    || this.life <= this.decayRate
  ) {
    this.reset();
  }
};

Part.prototype.render = function () {
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
  // eslint-disable-next-line no-multi-assign
  ctx.fillStyle = ctx.strokeStyle = '#FD7B33';
  ctx.lineWidth = this.lineWidth;
  ctx.fill();
  ctx.stroke();
};

const createParts = function () {
  if (!partsFull) {
    if (parts.length > partCount) {
      partsFull = true;
    } else {
      parts.push(new Part());
    }
  }
};

const updateParts = function () {
  let i = parts.length;
  // eslint-disable-next-line no-plusplus
  while (i--) {
    parts[i].update();
  }
};

const renderParts = function () {
  let i = parts.length;
  // eslint-disable-next-line no-plusplus
  while (i--) {
    parts[i].render();
  }
};

const clear = function () {
  ctx.globalCompositeOperation = 'destination-out';
  ctx.fillStyle = '#FD7B33';
  ctx.fillRect(0, 0, cw, ch);
  ctx.globalCompositeOperation = 'lighter';
};

const loop = function () {
  window.requestAnimFrame(loop, c);
  clear();
  createParts();
  updateParts();
  renderParts();
  // eslint-disable-next-line no-plusplus
  globalTick++;
};

window.requestAnimFrame = (function () {
  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (a) {
    window.setTimeout(a, 1E3 / 60);
  };
}());

loop();
