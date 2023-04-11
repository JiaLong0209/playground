import {Pen, Canva, Polygon, Crash, Fractal} from "./modules/module.js";

const canvas = document.querySelector('#canvas');
const c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let cursorHidden = false;
let page = 4;

let pages = {
    pen: new Pen(c, canvas.width, canvas.height),
    canva: new Canva(canvas),
    polygon: new Polygon(canvas),
    crash: new Crash(canvas)
}

function drawPage(page){
    switch(page){
        case 1:
            penGenerator();
            break;
        case 2:
            canvaGenerator();
            break;
        case 3:
            polygonGenerator();
            break;
        case 4:
            crashGenerator();
            break;
        case 5:
            fractalGenerator();
            break;
        case 10:
            polygonGenerator();
            canvaGenerator();
            break;
        case 11:
            canvaGenerator();
            crashGenerator();
    }
}

function savaImage(filename = "canvaImage.png"){
    let link = document.createElement('a');
    link.download = filename;
    link.href = canvas.toDataURL("image/png").replace(/^data:image\/[^;]/, 'data:application/octet-stream');
    link.click();
    console.log("Save!");
}

function keydown(e){
    if(e.ctrlKey && e.key.toLowerCase() == "s" && e.shiftKey){
        savaImage();
    }
    switch(e.key.toLowerCase()){
        case "escape":
            canvas.style.cursor = cursorHidden ? "auto" : "none";
            cursorHidden = !cursorHidden;
            break;
    }
}

function penGenerator(){
    let pen = new Pen(c, canvas.width, canvas.height)
    function animation(){
        pen.update();
        window.requestAnimationFrame(animation);
    }
    animation();
}

function canvaGenerator(){
    let canva = new Canva(canvas)
    canva.setupCanva();
}

function polygonGenerator(){
    let polygon = new Polygon(canvas)
    polygon.setupPolygon();
}

function crashGenerator(){
    let crash = new Crash(canvas)
    crash.setupCrash();
} 

function fractalGenerator(){
    let fractal = new Fractal(canvas);
    fractal.setupFractal();
}

function resize(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    drawPage(page);
}

document.addEventListener("keydown", keydown);
window.addEventListener("resize", resize)
drawPage(page);

