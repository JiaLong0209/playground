let degree = Math.PI / 180;
class Polygon {
    constructor(canvas){
        this.canvas = canvas;
        this.c = canvas.getContext('2d');
        this.polygonWidth = 400;
        this.corner = 3;
        this.text = true;
        this.lineWidth = this.polygonWidth/100;
        this.mode = 0;
    }
    draw(){
        switch(this.mode){
            case 0:
                this.drawRegularPoly(); 
            break;
            case 1:
                this.drawStar();
            break;
        }
    }
    drawText(){
        
        this.c.beginPath();
        this.c.moveTo(0,0);
        this.c.font = `${this.corner + 15}px sans-serif`;
        this.c.textAlign = "center"
        this.c.textBaseline = "middle";
        this.c.fillText(this.corner, 0, 0)

    }
    drawRegularPoly(){
        this.c.save();
        this.c.beginPath();
        this.c.lineCap = "round"
        this.c.strokeStyle = "#000";
        this.c.lineWidth = this.lineWidth
        this.c.translate(this.canvas.width/2, this.canvas.height/2);
        this.c.moveTo(this.polygonWidth/2, 0);
        for(let i = 0; i < this.corner; i++){
            this.c.rotate(360 / this.corner * degree);
            this.c.lineTo(this.polygonWidth/2, 0);
        }
        this.c.stroke();
        if(this.text){
            this.drawText();
        }
        this.c.restore();
        this.c.beginPath();
    }

    drawStar(){
        this.c.save();
        this.c.beginPath();
        this.c.lineCap = "round"
        this.c.strokeStyle = "#000";
        this.c.lineWidth = this.lineWidth
        this.c.translate(this.canvas.width/2, this.canvas.height/2);
        this.c.moveTo(this.polygonWidth/2, 0);
        this.c.lineTo(100,0);
        this.c.stroke();
    }

    clear(){
        this.c.clearRect(0,0, this.canvas.width, this.canvas.height);
    }

    changePoly(e){
        switch(e.key.toLowerCase()){
            case "arrowleft":
            case "arrowdown":
                this.corner -= 1;
                this.clear();
                this.draw();
            break;
            
            case "arrowright":
            case "arrowup":
                this.corner += 1;
                this.clear();
                this.draw();
            break;
            case "escape":
                this.text = !this.text;
                this.clear();
                this.draw();
        }
    }

    setupPolygon(){
        document.addEventListener("keydown", this.changePoly.bind(this));
        this.draw();

    }
}
export default Polygon;