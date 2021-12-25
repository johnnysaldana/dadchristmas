class Game {
    constructor(canvas, ctx) {
      this.canvas = canvas;
      this.ctx = ctx;
      this.gameStart = false;
      this.displacement = 2/100;
      this.background = new Image();
      this.background.src = "/assets/stock.png";
      this.snoop = new Image();
      this.snoop.src = "/assets/snoop.gif";
      this.opened = false;
      this.video = document.getElementById("myVideo");
      
      
      document.addEventListener("keydown", this.keyDownHandler.bind(this));
      document.addEventListener("keyup", this.keyUpHandler.bind(this));
    };



    keyDownHandler(e) {
      if (!this.gameStart) {
        this.gameStart = true;
        this.video.muted = !this.video.muted;
        this.video.play();
      }
      if (e.keyCode === "o" ) {
        this.opened = true;
        console.log("Opened.");
      }
    }
  
    keyUpHandler(e) {
      if (e.key === "o") {
        this.opened = true;
      }
    }
    drawBackground(ctx) {
      ctx.save();
      ctx.drawImage(this.background, 0, 0, 1000, 400);
      ctx.restore();
    }

    drawSnoop(ctx) {
      ctx.save();
      ctx.drawImage(this.snoop, 50, 150, 200, 300);
      ctx.restore();
    }
    draw() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.drawBackground(this.ctx);
      this.drawSnoop(this.ctx);
    };
  };

  export default Game;