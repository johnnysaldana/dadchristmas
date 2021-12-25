class Game {
    constructor(canvas, ctx) {
      this.canvas = canvas;
      this.ctx = ctx;
      this.gameStart = false;
      this.music = new Audio("./assets/gamemusic.mp3");
      this.displacement = 2/100;
      this.background = new Image();
      this.background.src = "/assets/bwbackground.jpeg";
      this.shellclosed = new Image();
      this.shellclosed.src = "/assets/shellclosed.png";
      this.shellopen = new Image();
      this.shellopen.src = "/assets/shellopen.png";
      this.reservation = new Image();
      this.reservation.src = "/assets/reservation.png";

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
        this.handleGameStart();
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
      ctx.drawImage(this.background, 0, 0, 1200, 500);
      ctx.restore();
    }
    drawShell(ctx) {
      ctx.save();
      if (this.opened) {
        ctx.drawImage(this.shellopen, 200, 150, 400, 400);
        ctx.drawImage(this.reservation, 250, 250, 300, 180);
      } else {
        ctx.drawImage(this.shellclosed, 200, 150, 400, 400);
      }
      ctx.restore();
    }

    draw() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.drawBackground(this.ctx);
      this.drawShell(this.ctx);
    };
  };

  export default Game;