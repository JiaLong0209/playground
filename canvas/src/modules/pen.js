let degree = Math.PI / 180
class Pen{
    constructor(context, width, height){
        this.c = context;
        this.width = width;
        this.height = height;
        this.rotate = 0.01;
    }
    update(){
        this.c.save();
        this.c.clearRect(0,0,this.width*2,this.height*2)
        this.rotate *= 1.01;
        this.drawPanel(this.rotate);
        this.c.restore();
    }
    drawRect(x = 0, y = 0, width = 50, height = 50, color = "rgb(200,100,0,0.5)", rotateDeg = 0){
        // this.c.save();
            this.c.rotate(rotateDeg * degree)
            this.c.fillStyle = color;
            this.c.fillRect(x, y, width, height);
        // this.c.restore();
    }
    
    drawPanel(rotateDeg = 0){
        let initx = this.width/3;
        let inity = this.height/12;
        for(let i = 0; i < 10; i++){
            for(let j = 0; j < 10; j++){
                this.drawRect(55 * i + initx, 55 * j + inity, 50, 50, "rgb(200,100,0,0.5)", rotateDeg);
            }
        }
        for(let i = 0; i < 10; i++){
            for(let j = 0; j < 10; j++){
                this.drawRect(55 * i+5 + initx,55 * j + 5 + inity, 50,50, "rgb(100,50,200,0.35)",-rotateDeg);
            }
        }
        for(let i = 0; i < 15; i++){
            for(let j = 0; j < 15; j++){
                this.drawRect(55 * i + 20 + initx,55 * j+20 + inity, 50,50, "rgb(10,200,100,0.3)",rotateDeg * 2);
            }
        }
    }
}

export default Pen;
