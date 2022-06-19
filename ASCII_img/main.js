const density = 'N@#W$9876543210?!abc;:+=-,.  ';
// const density = '接嗚哦直冠豆MVP ';


let img;
function preload(){
    img = loadImage("img5.png")
}
function setup() {
    // createCanvas(1280, 760);
    // createCanvas(840, 554);
    createCanvas(600,600); 
}

function draw(){
    background(250);
    // image(img, 0, 0, width, height);
    
    let w = width / img.width;
    let h = height / img.height;
    img.loadPixels();

    for(let i = 0; i < img.width; i++){
        for(let j = 0; j < img.height; j++){
            const pixelIndex = (i + j * img.width) * 4;
            const r = img.pixels[pixelIndex + 0];
            const g = img.pixels[pixelIndex + 1];
            const b = img.pixels[pixelIndex + 2];
            const avg = (r+g+b) / 3;

            noStroke();
            fill(avg);
            // fill(r,g,b);
            // square(i * w, j * h, w);

            const len = density.length;
            const charIndex = floor(map(avg,0,255,0,len));

            textSize(w);
            textAlign(CENTER,CENTER)
            text(density.charAt(charIndex), i * w + w/2, j * h + h/2);

        }
    }



}


