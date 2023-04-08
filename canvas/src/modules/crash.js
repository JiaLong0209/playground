
class Crash {
    constructor(canvas){
        this.canvas = canvas;
        this.c = canvas.getContext('2d');
        this.width = canvas.width;
        this.height = canvas.height;
        this.radius = 4;
        this.x = undefined;
        this.y = undefined;
        this.particles = [];
        this.particleAmount = 20;
    }
    drawCircle(){
        this.c.save();
        this.c.fillStyle = "#ff5";
        this.c.beginPath();
        this.c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        this.c.fill();
        this.c.restore();
    }
    animate(){
        this.clear();
        this.drawCircle();
        this.handlePariticles();
        requestAnimationFrame(this.animate.bind(this));
    }
    position(e){
        this.x = e.clientX;
        this.y = e.clientY;
    }
    setupCrash(){
        this.canvas.addEventListener("click",(e)=>{
            this.position(e);
            this.spawnParticles();
        })
        this.canvas.addEventListener("mousemove",(e)=>{
            this.position(e);
            this.spawnParticles();
        })
        this.animate();
        console.log(this.particles)
    }

    spawnParticles(){
        for(let i = 0; i < this.particleAmount; i++){
            this.particles.push(new Particle(this.canvas, this.x, this.y));
        }
    }

    handlePariticles(){
        this.particles.forEach( (item,index) => {
            item.update();
            item.draw();
            if(item.size <= 0.2){
                this.particles.splice(index,1);
            }
        })
    }

    clear(){
        // this.c.clearRect(0,0, this.width, this.height);
        this.c.save()
        this.c.fillStyle = "#0001"
        this.c.fillRect(0,0, this.width, this.height);
        this.c.restore();
    }

}

class Particle{
    constructor(canvas,x,y){
        this.canvas = canvas;
        this.c = canvas.getContext('2d');
        this.x = x;
        this.y = y;
        // this.x = Math.random() * canvas.width;
        // this.y = Math.random() * canvas.height;
        this.baseSize = 5;
        this.baseSpeed = 3;
        this.size = Math.random() * this.baseSize + 1;
        this.speed = {
            x: Math.random() * this.baseSpeed - this.baseSpeed / 2,
            y: Math.random() * this.baseSpeed - this.baseSpeed / 2
       }
    }
    update(){
        this.x += this.speed.x;
        this.y += this.speed.y;
        if(this.size > 0.2) this.size -= 0.1;
    }
    draw(){
        this.c.save();
        this.c.fillStyle = "#f3f";
        this.c.beginPath();
        this.c.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        this.c.fill();
        this.c.restore();
    }
    info(){
        console.log(this);
    }
}

export default Crash;