class Canva {
    constructor(canvas){
        this.canvas = canvas;
        this.c = canvas.getContext('2d');
        this.width = canvas.width;
        this.height = canvas.height;
        this.painting = false;
        this.x = 0;
        this.y = 0;
        this.radius = 3;
        this.mode = "brush";
        this.cursorHidden = false;
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
        const currentX = e.clientX - rect.left;
        const currentY = e.clientY - rect.top;
        const controlX = (this.x + currentX) / 2;
        const controlY = (this.y + currentY) / 2;
        if(this.mode == "eraser"){
            this.c.save();
            this.c.lineWidth = this.radius * 4;
            this.c.lineTo(currentX, currentY);
            this.c.globalCompositeOperation = 'destination-out';
            this.c.strokeStyle = "#000f"
            this.c.stroke();
            // this.c.fillStyle = "blue";
            // this.c.arc(currentX, currentY, eraserSize, 0, Math.PI * 2);
            this.c.restore();
            // this.c.fill();
        }else if(this.mode == "brush"){
            this.c.lineCap = "round";
            this.c.lineWidth = this.radius;
            this.c.lineTo(currentX, currentY);
            // this.c.quadraticCurveTo(this.x,this.y,controlX,controlY)
            this.c.strokeStyle = "#00334f22"
            this.c.stroke();
        }
        this.x = currentX;
        this.y = currentY;
    }
    cursor(e){
        const rect = this.canvas.getBoundingClientRect();
        const currentX = e.clientX - rect.left;
        const currentY = e.clientY - rect.top;
        // this.c.save();
        // this.c.strokeStyle = "black";
        // this.c.lineWidth = 0.5;
        // this.c.beginPath();
        // this.c.arc(currentX, currentY, this.radius, 0 , Math.PI * 2);
        // this.c.clearRect(0,0, canvas.width, canvas.height)
        // this.c.stroke();
        // this.c.restore();
        
    }
    setupCanva(){
        document.addEventListener("keydown", (e) => {
            console.log(e)
            switch(e.key.toLowerCase()){
                case "b": 
                    this.mode = "brush";
                    break;  
                case "e":
                    this.mode = "eraser";
                    break;
                case "c":
                    this.c.clearRect(0,0, canvas.width, canvas.height);
                    break;
                case "escape":
                    this.canvas.style.cursor = this.cursorHidden ? "auto" : "none";
                    this.cursorHidden = !this.cursorHidden;
                    break;
                    
            }
        })
        this.canvas.addEventListener("mousedown",this.startDrawing.bind(this));
        this.canvas.addEventListener("mouseup",this.endDrawing.bind(this));
        this.canvas.addEventListener("mousemove", this.draw.bind(this));
        // this.canvas.addEventListener("mousemove", this.cursor.bind(this));
    }
}
export default Canva;