import {Pen, Canva, Polygon} from "./modules/module.js";

const canvas = document.querySelector('#canvas');
const c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 1;
let page = 10;

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
    case 10:
        polygonGenerator();
        canvaGenerator();
        break;
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
}

function penGenerator(){
    let pen = new Pen(c, canvas.width, canvas.height);
    function animation(){
        pen.update();
        window.requestAnimationFrame(animation);
    }
    animation();
}

function canvaGenerator(){
    let canva = new Canva(canvas);
    canva.setupCanva();
}

function polygonGenerator(){
    let polygon = new Polygon(canvas);
    polygon.setupPolygon();
}


document.addEventListener("keydown", keydown);
        

