window.requestAnimationFrame =
  window.requestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.msRequestAnimationFrame;



this.draw = function() {
  universe.beginPath();

  if (this.giant) {
    universe.fillStyle = "rgba(" + giantColor + "," + this.opacity + ")";
    universe.arc(this.x, this.y, 2, 0, 2 * Math.PI, false);
  } else if (this.comet) {
    universe.fillStyle = "rgba(" + cometColor + "," + this.opacity + ")";
    universe.arc(this.x, this.y, 1.5, 0, 2 * Math.PI, false);

    //comet tail
    for (var i = 0; i < 30; i++) {
      universe.fillStyle =
        "rgba(" +
        cometColor +
        "," +
        (this.opacity - (this.opacity / 20) * i) +
        ")";
      universe.rect(
        this.x - (this.dx / 4) * i,
        this.y - (this.dy / 4) * i - 2,
        2,
        2
      );
      universe.fill();
    }
  } else {
    universe.fillStyle = "rgba(" + starColor + "," + this.opacity + ")";
    universe.rect(this.x, this.y, this.r, this.r);
  }

  universe.closePath();
  universe.fill();
};

this.move = function() {
  this.x += this.dx;
  this.y += this.dy;
  if (this.fadingOut === false) {
    this.reset();
  }
  if (this.x > width - width / 4 || this.y < 0) {
    this.fadingOut = true;
  }
};

(function() {
  setTimeout(function() {
    first = false;
  }, 50);
})();


function getProbability(percents) {
  return Math.floor(Math.random() * 1000) + 1 < percents * 10;
}

function getRandInterval(min, max) {
  return Math.random() * (max - min) + min;
}

function windowResizeHandler() {
  width = window.innerWidth;
  height = window.innerHeight;
  starCount = width * starDensity;
  circleRadius = width > height ? height / 2 : width / 2;
  circleCenter = {
    x: width / 2,
    y: height / 2,
  };

  canva.setAttribute("width", width);
  canva.setAttribute("height", height);
}
