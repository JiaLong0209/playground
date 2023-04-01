class Canva {
    constructor(canvas){
        this.canvas = canvas;
        this.c = canvas.getContext('2d');
        this.width = canvas.width;
        this.height = canvas.height;
        this.painting = false;

    }
    startDrawing(e){
        this.painting = true;
        this.draw(e)
    }
    endDrawing(){
        this.painting = false;
        this.c.beginPath();
    }
    draw(e){
        if(!this.painting) return;
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        this.c.lineCap = "round";
        this.c.lineWidth = 3;
        this.c.lineTo(x,y)
        this.c.strokeStyle = "#00000016"
        this.c.stroke();
        // this.c.beginPath();
        // this.c.moveTo(x,y);
    }
    setupCanva(){
        this.canvas.addEventListener("mousedown",this.startDrawing.bind(this));
        this.canvas.addEventListener("mouseup",this.endDrawing.bind(this));
        this.canvas.addEventListener("mousemove", this.draw.bind(this));
    }
}
export default Canva;