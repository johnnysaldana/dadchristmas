class Game {
    constructor(canvas, ctx) {
      this.canvas = canvas;
      this.ctx = ctx;
      this.score = 0;
      this.gameStart = false;
      this.gameOver = false;
      this.music = new Audio("./assets/gamemusic.mp3");
      this.dx = 0;
      this.dy = 0;
      this.x = 70;
      this.y = 270;
      this.w =0;
      this.dw = 0;
      this.displacement = 2/100;
      this.background = new Image();
      this.background.src = "/assets/background.jpeg";
      this.golfclub = new Image();
      this.golfclub.src = "/assets/golfclub.png";
      this.golfer = new Image();
      this.golfer.src = "/assets/golfer.png";
      this.ball = new Image();
      this.ball.src = "/assets/ball.png";
      this.prize1 = new Image();
      this.prize1.src = "/assets/prize1.png";
      this.prize2 = new Image();
      this.prize2.src = "/assets/prize2.png";
      this.trophy = new Image();
      this.trophy.src = "/assets/trophy.png";
      this.maxClubSwing = 1;
      this.ballMoving = false;
      this.clubMoving = true;
      
      document.addEventListener("keyup", this.keyUpHandler.bind(this));
      document.addEventListener("keydown", this.keyDownHandler.bind(this));
      document.addEventListener("keyup", this.keyUpHandler.bind(this));
      this.music.play();
      this.music.loop = true;
      this.music.volume = 0.2;
    };

    updateBall() {
      this.ball.draw(this.ctx);
      this.ball.move(this.canvas.width);
      if (!this.ball.bounce(this.canvas.width, this.canvas.height) && !this.gameOver) {
        this.handleGameLose()
      }
    }

    updateDisplay() {
      this.display.draw(this.ctx);
    }

    updateClub() {
      this.club.draw(this.ctx);
    }


    keyDownHandler(e) {
      if ((e.key === "Right" || e.key === "ArrowRight") && this.clubMoving) {
        if (this.w < -0.5) {
          this.dw = 0;
        } else {
          this.dw = -1*this.displacement*10;
        }
      } else if ((e.key === "Left" || e.key === "ArrowLeft") && this.clubMoving) {
        if (this.w > 2.3) {
          this.dw = 0;
        } else {
          this.dw = this.displacement;
        }
      } else if ((e.key === "r" || e.key === "r")) {
        this.reset(this.ctx);
      }
    }
  
    keyUpHandler(e) {
      if (e.key === "Right" || e.key === "ArrowRight") {
        this.dw = 0;
      } else if (e.key === "Left" || e.key === "ArrowLeft") {
        this.dw = 0;
      }
    }
    drawBackground(ctx) {
      ctx.save();
      ctx.drawImage(this.background, -50, 0, 1200, 350);
      ctx.restore();
    }
    drawGolfer(ctx) {
      ctx.save();
      ctx.drawImage(this.golfer, 25, 150, 70, 140);
      ctx.restore();
    }

    drawClub(ctx) {
      ctx.save();
      this.w += this.dw;
      ctx.translate(67, 225);
      if (this.w < -0.5) {
        this.dw = 0;
      }
      if (this.w > this.maxClubSwing) {
        this.maxClubSwing = this.w;
      }
      ctx.rotate(this.w * Math.PI / 3);
      ctx.drawImage(this.golfclub, -35, 0, 60, 70);
      ctx.restore();
    }

    drawBall(ctx) {
      ctx.save();
      if (!this.ballMoving && this.w < -0.4) {
        if (this.maxClubSwing > 1.8) {
          this.dy = -2 * (this.maxClubSwing*1.3 + 0.4);
        } else {
          this.dy = -2 * (this.maxClubSwing + 0.4);
        }
        if (this.maxClubSwing > 1.5) {
          this.dx = (this.maxClubSwing*2 + 1);
        } else {
          this.dx = (this.maxClubSwing*1.3 + 1);
        }
        this.ballMoving = true;
        this.clubMoving = false;
      }
      if (this.ballMoving) {
        if (this.y < 275) {
          this.dy += 0.05;
        } else {
          this.dy = 0;
        }
        if (this.dx > 0) {
          if (this.dy === 0) {
            this.dx -= 0.03;
          } else {
            this.dx -= 0.01;
          }
        } else {
          this.dx = 0;
        }
        this.x += this.dx;
        this.y += this.dy;
      }

      if (this.ballMoving && this.dx <= 0 && this.dy == 0) {
        if (this.score > 930) {
          this.gameWin = true;
        }
      }
      ctx.drawImage(this.ball, this.x, this.y, 17, 17);
      ctx.restore();
    }

    reset(ctx) {
      this.ballMoving = false;
      this.clubMoving = true;
      this.dx = 0;
      this.dy = 0;
      this.x = 70;
      this.y = 270;
      this.w =0;
      this.dw = 0;
      this.maxClubSwing = 0;
      this.score = 0;
    }

    drawDisplay(ctx) {
      if (this.x > 80) {
        this.score = Math.round(1000 - (Math.abs(this.x - 928)));
      }
      ctx.font = "16px Arial";
      ctx.fillStyle = "#01435cf";
      ctx.fillText("Score: " + this.score, 8, 20);
      ctx.font = "10px Arial";
      ctx.fillText("Press 'r' to reset swing", 8, 340);
    }

    drawGameWin(ctx) {
      ctx.save();
      ctx.drawImage(this.trophy, 450, 50, 150, 150);
      ctx.drawImage(this.prize1, 230, 220, 200, 100);
      ctx.drawImage(this.prize2, 530, 220, 200, 100);
      ctx.restore();
    }
  
    draw() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.drawBackground(this.ctx);
      this.drawGolfer(this.ctx);
      this.drawClub(this.ctx);
      this.drawBall(this.ctx);
      this.drawDisplay(this.ctx);
      if (this.gameWin) {
        this.drawGameWin(this.ctx);
      }
    };
  };

  export default Game;