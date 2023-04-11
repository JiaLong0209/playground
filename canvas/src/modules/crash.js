
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
        this.particleAmount = 3;
        this.particleColor = {
            hue: 0,
            saturation: 100,
            lightness: 50
        }
        this.particleConnectCount = 3;
        this.particleConnectMode = 1;
        this.lineDis = 80;
        this.isSetup = false;
        this.isGragient = false;
    }
    drawCircle(){
        this.c.save();
        this.c.fillStyle = "#ff5";
        this.c.beginPath();
        this.c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        this.c.fill();
        this.c.restore();
    }v
    animate(){
        this.clear();
        // this.drawCircle();
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
    }

    spawnParticles(e){
        this.position(e);
        for(let i = 0; i < this.particleAmount; i++){
            this.particles.push(new Particle(this.canvas, this.x, this.y, this.particleColor));
        }
    }

    drawLine(x,y,dx,dy,color,width){
        this.c.save();
        this.c.strokeStyle = color;
        this.c.beginPath();
        this.c.lineWidth = width;
        this.c.moveTo(x, y);
        this.c.lineTo(dx, dy);
        this.c.stroke();
        this.c.closePath();
        this.c.restore();
    }

    handlePariticles(){
        this.particles.forEach( (i,index) => {
            i.update();
            i.draw();
            let items = [];
            for(let j = index + 1 ; j < this.particles.length; j++){
                let dx = i.x - this.particles[j].x;
                let dy = i.y - this.particles[j].y;
                let dis = Math.sqrt(dx * dx + dy * dy);
                if(dis < this.lineDis && this.particleConnectMode == 0){
                    this.drawLine(i.x,i.y,this.particles[j].x, this.particles[j].y,i.color,1);
                }
                items.push([dis, this.particles[j]])
            }
            items = items.sort((a,b) => a[0] - b[0])
            // console.log(items)
            if(this.particleConnectMode == 1){
                for(let j = 0; j < this.particleConnectCount; j++){
                    if(items[j]){
                        this.drawLine(i.x, i.y, items[j][1].x, items[j][1].y, i.color, 1)
                    }
    
                }
            }
                
                // console.log(items[0][1])
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
        this.baseSize = 1;
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
        if(this.size > 0.2) this.size -= 0.02;
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