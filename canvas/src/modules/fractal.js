let degree = Math.PI / 180;

let randomizeButton = document.querySelector('#randomizeButton');
let controlsUI = document.querySelector('#controls');
let controls = {
    sliders: [
        document.querySelector('#spread'),
        document.querySelector('#sides'),
        document.querySelector('#scale'),
        document.querySelector('#size'),
        document.querySelector('#level'),
    ],
    labels: [
        document.querySelector('[for="spread"]'),
        document.querySelector('[for="sides"]'),
        document.querySelector('[for="scale"]'),
        document.querySelector('[for="size"]'),
        document.querySelector('[for="level"]'),

    ]
}

class Fractal {
    constructor(canvas) {
        this.canvas = canvas;
        this.c = canvas.getContext('2d');
        this.branches = 2;
        this.sides = 5;
        this.size = canvas.width < canvas.height ? canvas.width / 5 : canvas.height / 5;
        this.maxLevel = 6;
        this.angle = 30;
        this.lineWidth = this.size / 50;
        this.scale = 0.65;
        // this.color = "#f03";
        this.color = `hsl(${Math.random() * 360},100%,50%)`
        this.isShadow = true;
        this.isHiddenUI = false;
        this.mode = 0;
    }

    spread(angle, i) {
        this.c.translate(this.size - (this.size / this.branches) * i, 0);
        // this.c.translate(this.size ,0);
        this.c.scale(this.scale, this.scale)
        this.c.rotate(angle * degree);
    }

    drawBranch(level) {
        if (level > this.maxLevel || level > 11) return;
        this.c.beginPath();
        this.c.moveTo(0, 0);
        this.c.lineTo(this.size, 0);
        this.c.stroke();

        for (let i = 0; i < this.branches; i++) {
            this.c.save()
            this.spread(this.angle, i);
            this.drawBranch(level + 1);
            this.c.restore();

            if (this.mode == 0) {
                this.c.save()
                this.spread(-this.angle, i);
                this.drawBranch(level + 1);
                this.c.restore();
            }
        }
    }

    drawFractal() {
        this.updateData();
        this.c.fillStyle = '#3d3';
        this.c.strokeStyle = this.color;
        this.c.lineWidth = this.lineWidth;
        this.c.lineCap = "round";

        this.c.shadowColor = this.isShadow ? '#0009' : '#0000';
        this.c.shadowOffsetX = 3;
        this.c.shadowOffsetY = 3;
        this.c.shadowBlur = 1;

        this.c.save();
        this.c.translate(this.canvas.width / 2, this.canvas.height / 2)
        this.c.scale(1, 1)
        for (let i = 0; i < this.sides; i++) {
            if (i > 40) break;
            this.c.rotate((360 / this.sides) * degree)
            this.drawBranch(1);
        }
        this.c.restore();
    }

    clear() {
        this.c.clearRect(0, 0, canvas.width, canvas.height);
    }

    randomizeFractal() {
        this.sides = ~~(Math.random() * 10 + 2);
        this.scale = (Math.random() * 0.5 + 0.4).toFixed(2);
        this.angle = (Math.random() * 180).toFixed(2);
        this.maxLevel = ~~(Math.random() * 7 + 3);
        this.color = `hsl(${Math.random() * 360},100%,50%)`;
        this.clear();
        this.drawFractal();

        // console.log({
        //     sides: this.sides,
        //     scale: this.scale,
        //     angle: this.angle / degree,
        //     maxLevel: this.maxLevel,
        //     color: this.color
        // })
    }


    sliderChange(e) {
        let nodes = document.querySelectorAll("input[type='range']");
        nodes.forEach((i, index) => {
            if (i == e.target) {
                this.updateSlider(index, e.target.value)
            };
        })
        this.clear();
        this.drawFractal();

    }

    updateSlider(index, value) {
        switch (index) {
            case 0:
                this.angle = value;
                break;
            case 1:
                this.sides = value;
                break;
            case 2:
                this.scale = value;
                break;
            case 3:
                this.size = value;
                break;
            case 4:
                this.maxLevel = value;
                break;
        }
        let name = controls.labels[index].innerText.match(/\D+/i)[0];
        controls.labels[index].innerText = `${name} ${value}`;
    }

    updateData() {
        controls.labels.forEach((i, index) => {
            let name = controls.labels[index].innerText.match(/\D+/i)[0];
            controls.labels[index].innerText = `${name} ${this.getSliderData(index)}`;
            controls.sliders[index].value = this.getSliderData(index);

        });
    }

    getSliderData(index) {
        switch (index) {
            case 0:
                return this.angle;
                break;
            case 1:
                return this.sides;
                break;
            case 2:
                return this.scale;
                break;
            case 3:
                return this.size;
                break;
            case 4:
                return this.maxLevel;
                break;
        }
    }

    setupFractal() {
        this.drawFractal();
        randomizeButton.addEventListener('click', this.randomizeFractal.bind(this))
        controls.sliders.forEach(slider => {
            slider.addEventListener('change', e => {
                this.sliderChange(e);
            })
        })
        window.addEventListener('keydown', (e) => {
            if (e.key == "Escape") {
                this.isHiddenUI = !this.isHiddenUI;
                controlsUI.style.display = this.isHiddenUI ? "none" : "block";
            }
        })
    }

}


export default Fractal; 