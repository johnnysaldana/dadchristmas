class Display {
  constructor(score) {
    this.score = score;
  }
  draw(ctx) {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#01435cf";
    ctx.fillText("Score: " + this.score, 8, 20);
  }
}

export default Display;