import "./style.css";
import Game from "./Game.js";

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
let g = new Game(canvas, ctx);

function draw() {
  g.draw();
  window.requestAnimationFrame(draw);
}
draw();