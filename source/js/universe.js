function universe() {
  window.requestAnimationFrame =
    window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame;

  var width;
  var height;
  var starCount;
  var context;
  var velocity = 0.05;
  var canvas = document.getElementById("universe");
  var cometDelay = true;
  var giantColor = "180,184,240";
  var starColor = "226,225,142";
  var cometColor = "226,225,224";
  var stars = [];

  if (!canvas) return;

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    starCount = 0.216 * width;
    canvas.setAttribute("width", width);
    canvas.setAttribute("height", height);
  }

  function drawFrame() {
    context.clearRect(0, 0, width, height);
    for (var index = 0; index < stars.length; index++) {
      var star = stars[index];
      star.move();
      star.fadeIn();
      star.fadeOut();
      star.draw();
    }
  }

  function Star() {
    this.reset = function () {
      this.giant = randomChance(3);
      this.comet = !this.giant && !cometDelay && randomChance(10);
      this.x = randomRange(0, width - 10);
      this.y = randomRange(0, height);
      this.radius = randomRange(1.1, 2.6);
      this.dx = randomRange(velocity, 6 * velocity) + (this.comet ? velocity * randomRange(50, 120) : 0) + 2 * velocity;
      this.dy = -randomRange(velocity, 6 * velocity) - (this.comet ? velocity * randomRange(50, 120) : 0);
      this.fadingOut = null;
      this.fadingIn = true;
      this.opacity = 0;
      this.opacityTresh = randomRange(0.2, 1 - (this.comet ? 0.4 : 0));
      this.do = randomRange(0.0005, 0.002) + (this.comet ? 0.001 : 0);
    };

    this.fadeIn = function () {
      if (this.fadingIn) {
        this.fadingIn = !(this.opacity > this.opacityTresh);
        this.opacity += this.do;
      }
    };

    this.fadeOut = function () {
      if (this.fadingOut) {
        this.fadingOut = !(this.opacity < 0);
        this.opacity -= this.do / 2;
        if (this.x > width || this.y < 0) {
          this.fadingOut = false;
          this.reset();
        }
      }
    };

    this.draw = function () {
      context.beginPath();
      if (this.giant) {
        context.fillStyle = "rgba(" + giantColor + "," + this.opacity + ")";
        context.arc(this.x, this.y, 2, 0, 2 * Math.PI, false);
      } else if (this.comet) {
        context.fillStyle = "rgba(" + cometColor + "," + this.opacity + ")";
        context.arc(this.x, this.y, 1.5, 0, 2 * Math.PI, false);
        for (var index = 0; index < 30; index++) {
          context.fillStyle = "rgba(" + cometColor + "," + (this.opacity - this.opacity / 20 * index) + ")";
          context.rect(this.x - this.dx / 4 * index, this.y - this.dy / 4 * index - 2, 2, 2);
          context.fill();
        }
      } else {
        context.fillStyle = "rgba(" + starColor + "," + this.opacity + ")";
        context.rect(this.x, this.y, this.radius, this.radius);
      }
      context.closePath();
      context.fill();
    };

    this.move = function () {
      this.x += this.dx;
      this.y += this.dy;
      if (this.fadingOut === false) this.reset();
      if (this.x > width - width / 4 || this.y < 0) this.fadingOut = true;
    };

    setTimeout(function () {
      cometDelay = false;
    }, 50);
  }

  function randomChance(percent) {
    return Math.floor(1000 * Math.random()) + 1 < 10 * percent;
  }

  function randomRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  resize();
  window.addEventListener("resize", resize, false);
  context = canvas.getContext("2d");

  for (var index = 0; index < starCount; index++) {
    stars[index] = new Star();
    stars[index].reset();
  }

  function tick() {
    drawFrame();
    window.requestAnimationFrame(tick);
  }

  tick();
}

universe();
