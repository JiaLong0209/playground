
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
        this.particleAmount = 2;
        this.particleColor = {
            hue: 0,
            saturation: 100,
            lightness: 50
        }
        this.lineDis = 100;
        // this.hue = 0;
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
        this.changePariticleColor();

    }

    changePariticleColor(){
        this.particleColor.hue += Math.random() * 5;
        // this.particleColor.saturation += Math.random() * 5;
        // this.particleColor.saturation %= 100;
    }

    position(e){
        this.x = e.clientX;
        this.y = e.clientY;
    }
    setupCrash(){
        this.canvas.addEventListener("click",(e)=>{
            this.spawnParticles(e);
        })
        this.canvas.addEventListener("mousemove",(e)=>{
            this.spawnParticles(e);
        })
        this.animate();
        console.log(this.particles)
    }



    spawnParticles(e){
        this.position(e);
        for(let i = 0; i < this.particleAmount; i++){
            this.particles.push(new Particle(this.canvas, this.x, this.y, this.particleColor));
        }
    }

    handlePariticles(){
        this.particles.forEach( (i,index) => {
            i.update();
            i.draw();
            for(let j = index + 1 ; j < this.particles.length; j++){
                let dx = i.x - this.particles[j].x;
                let dy = i.y - this.particles[j].y;
                let dis = Math.sqrt(dx * dx + dy * dy);
                if(dis < this.lineDis){
                    this.c.save();
                    this.c.strokeStyle = i.color;
                    this.c.beginPath();
                    this.c.lineWidth = 0.5;
                    this.c.moveTo(i.x, i.y);
                    this.c.lineTo(this.particles[j].x, this.particles[j].y);
                    this.c.stroke();
                    this.c.closePath();
                    this.c.restore();
                }
            }
            
            if(i.size <= 0.2 ||
               i.x - i.size > this.width || 
               i.x + i.size < 0 || 
               i.y - i.size > this.height || 
               i.y + i.size < 0){
                this.particles.splice(index,1);
            }

        })
    }

    clear(){
        this.c.save()
        // this.c.clearRect(0,0, this.width, this.height);
        this.c.fillStyle = "#0003"
        this.c.fillRect(0,0, this.width, this.height);
        this.c.restore();
    }

}

class Particle{
    constructor(canvas,x,y,color){
        this.canvas = canvas;
        this.c = canvas.getContext('2d');
        this.x = x;
        this.y = y;
        // this.x = Math.random() * canvas.width;
        // this.y = Math.random() * canvas.height;
        this.baseSize = 10;
        this.baseSpeed = 4;
        this.size = Math.random() * this.baseSize + 1;
        this.speed = {
            x: Math.random() * this.baseSpeed - this.baseSpeed / 2,
            y: Math.random() * this.baseSpeed - this.baseSpeed / 2
       }
       this.color = `hsl(${color.hue},${color.saturation}%,${color.lightness}%)`;
    }
    update(){
        this.x += this.speed.x;
        this.y += this.speed.y;
        this.speed.x *= 0.99;
        this.speed.y *= 0.99;
        if(this.size > 0.2) this.size -= 0.1;
    }
    draw(){
        this.c.save();
        this.c.fillStyle = this.color;
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