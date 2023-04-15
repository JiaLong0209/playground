let degree = Math.PI / 180;
class Fractal {
    constructor(canvas){
        this.canvas = canvas;
        this.c = canvas.getContext('2d');
        this.branches = 2;
        this.sides = 5;
        this.size = canvas.width < canvas.height ? canvas.width / 5  : canvas.height / 5;
        this.maxLevel = 5;
        this.angle = degree * 30;
        this.lineWidth = this.size / 50;
        this.scale = 0.65;
        // this.color = "#f03";
        this.color = `hsl(${Math.random()*360},100%,50%)`
        this.isShadow = true;
    }   

    spread(angle, i){
        this.c.translate(this.size - (this.size/this.branches)*i , 0);
        // this.c.translate(this.size ,0);
        this.c.scale(this.scale,this.scale)
        this.c.rotate(angle);
    }

    drawBranch(level){
        if(level > this.maxLevel || level > 8) return;
        this.c.beginPath();
        this.c.moveTo(0,0);
        this.c.lineTo(this.size, 0);
        this.c.stroke();

        for(let i = 0; i < this.branches; i++){
            this.c.save()
            this.spread(this.angle, i);
            this.drawBranch(level + 1);
            this.c.restore();
    
            this.c.save()
            this.spread(-this.angle, i);
            this.drawBranch(level + 1);
            this.c.restore();
        }
    }


    drawFractal(){
        this.c.fillStyle = '#3d3';
        this.c.strokeStyle = this.color;
        this.c.lineWidth = this.lineWidth;
        this.c.lineCap = "round";

        this.c.shadowColor = this.isShadow ? '#0009' : '#0000';
        this.c.shadowOffsetX = 3;
        this.c.shadowOffsetY = 3;
        this.c.shadowBlur = 1;

        this.c.save();
        this.c.translate(this.canvas.width/2, this.canvas.height/2)
        this.c.scale(1, 1)
        for(let i = 0; i < this.sides; i++){
            if(i > 40) break;
            this.c.rotate((360 / this.sides)* degree)
            this.drawBranch(1);
        }
        this.c.restore();
    }

    randomizeFractal(){
        this.sides = ~~(Math.random() * 10 + 2);
        this.scale = Math.random() * 0.5 + 0.4;
        this.angle = Math.random() * 360 * degree;
        this.maxLevel = Math.random() * 3 + 4;
        this.color = `hsl(${Math.random()*360},100%,50%)`;
        this.c.clearRect(0,0, canvas.width, canvas.height)
        this.drawFractal();
        console.log({
            sides: this.sides,
            scale: this.scale,
            angle: this.angle / degree,
            maxLevel: this.maxLevel,
            color: this.color
        })
    }

    setupFractal(){
        let randomizeButton = document.querySelector('#randomizeButton');
        this.drawFractal();
        randomizeButton.addEventListener('click',this.randomizeFractal.bind(this))
    }

}


export default Fractal; 