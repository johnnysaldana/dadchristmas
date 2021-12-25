class Game {
    constructor(canvas, ctx) {
      this.canvas = canvas;
      this.ctx = ctx;
      this.gameStart = false;
      this.displacement = 2/100;
      this.background = new Image();
      this.background.src = "/assets/steakhouse.jpeg";
      this.snoop = new Image();
      this.snoop.src = "/assets/bluebird.png";
      this.music = new Audio("./assets/gamemusic.mp3");
      this.opened = false;
      
      
      document.addEventListener("keydown", this.keyDownHandler.bind(this));
      document.addEventListener("keyup", this.keyUpHandler.bind(this));
    };

    handleGameStart() {
      this.music.play();
      this.music.loop = true;
      this.music.volume = 0.2;
    }

    keyDownHandler(e) {
      if (!this.gameStart) {
        this.gameStart = true;
        this.handleGameStart()

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
      ctx.drawImage(this.background, 0, 0, 1200, 600);
      ctx.restore();
    }

    drawSnoop(ctx) {
      ctx.save();
      ctx.drawImage(this.snoop, 400, 200, 350, 300);
      ctx.restore();
    }
    draw() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.drawBackground(this.ctx);
      this.drawSnoop(this.ctx);
    };
  };

  export default Game;