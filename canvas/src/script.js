import Pen from "./pen.js";
import Canva from "./canva.js";
const canvas = document.querySelector('#canvas');
const c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 1;

let canva = new Canva(canvas);

canva.setupCanva();

// let pen = new Pen(c, canvas.width, canvas.height);
// function animation(){
//     pen.update();
//     window.requestAnimationFrame(animation);
// }
// animation();

