import Ball from "./Ball.js";
import Brick from "./Brick.js";
import Display from "./Display.js";
import Paddle from "./Paddle.js";

class Game {
    constructor(canvas, ctx) {
      this.canvas = canvas;
      this.ctx = ctx;
      this.score = 0;
      this.gameStart = false;
      this.gameOver = false;
      this.music = new Audio("./dist/assets/gamemusic.mp3");
      this.ball = new Ball(
        canvas.width / 2,
        canvas.height - 30,
        10,
        10,
        "#0095DD",
        2,
        -2
      );
      
      this.paddle = new Paddle(
        (canvas.width - 10) / 2,
        canvas.height - 10,
        75,
        10,
        "#0095DD"
      );
      this.display = new Display(0);
      this.brickRowCount = 5;
      this.brickColumnCount = 5;
      this.bricks = [];
      this.brickWidth = 50;
      this.brickHeight = 20;
      this.brickPadding = 20;
      this.brickOffsetTop = 30;
      this.brickOffsetLeft = 50;

      for (let c = 0; c < this.brickColumnCount; c++) {
        for (let r = 0; r < this.brickRowCount; r++) {
          let brickX = c * (this.brickWidth + this.brickPadding) + this.brickOffsetLeft;
          let brickY = r * (this.brickHeight + this.brickPadding) + this.brickOffsetTop;
          this.bricks.push(new Brick(brickX, brickY, this.brickWidth, this.brickHeight, "#0095DD"));
        }
      }
      document.addEventListener("keyup", this.keyUpHandler.bind(this));
      console.log("finished init")
    };

    keyUpHandler() {
      console.log("STARTED2")
      this.handleGameStart();
    }

    updateBall() {
      this.ball.draw(this.ctx);
      this.ball.move(this.canvas.width);
      if (!this.ball.bounce(this.canvas.width, this.canvas.height) && !this.gameOver) {
        this.handleGameLose()
      }
    }

    updatePaddle() {
      this.paddle.draw(this.ctx);
      this.paddle.move(this.canvas.width);
    }

    handleGameStart() {
      this.gameStart = true;
      this.music.play();
      this.music.loop = true;
    }

    handleGameLose() {
      this.gameOver = true;
      this.music.pause();
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.bricks.forEach((brick) => {
        brick.draw(this.ctx);
        if (brick.colides(this.ball)) {
          this.score++;
        }
      });
      window.alert("Game over! Reload page");
    }

    handleGameWin() {
      this.gameOver = true;
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.bricks.forEach((brick) => {
        brick.draw(this.ctx);
        if (brick.colides(this.ball)) {
          this.score++;
        }
      });
      let vid = document.getElementById("myVideo");
      vid.play();
    }

    updateDisplay() {
      this.display.draw(this.ctx);
    }

    checkIntersections() {
      this.ball.colides(this.paddle);

      this.bricks.forEach((brick) => {
        brick.draw(this.ctx);
        if (brick.colides(this.ball)) {
          this.score++;
        }
      });
      if (this.score == this.brickRowCount * this.brickColumnCount) {
        this.handleGameWin()
      }
    }
  
    draw() {
      console.log(this.gameStart);
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.updateDisplay();
      if (this.gameStart) {
        this.updateBall();
        this.updatePaddle();
      }
      this.checkIntersections();
    };
  };

  export default Game;