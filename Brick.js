import Block from "./Block.js";

class Brick extends Block {
  constructor(x, y, width, height, color) {
    super(x, y, width, height, color);
    this.visible = true;
  }

  drawBrick(ctx) {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = "pink";
    ctx.fill();
    ctx.shadowBlur = 5;
    ctx.shadowColor = "white";
    ctx.closePath();
  }

  draw(ctx) {
    if (this.visible) {
      this.drawBrick(ctx);
    }
  }

  colides(ball) {
    if (this.visible && this.intersects(ball)) {
      this.visible = false;
      ball.colides(this); // causes the ball to bounce off
      return true;
    }
    return false;
  }  
}

export default Brick;
