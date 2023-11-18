let hostUrl = window.location.href.split('#')[0];

function render(str){
    location.replace(`${hostUrl}#${str}`);
}

// function animationText(){
//     let result = `${text.slice(0,textIndex)}${symbol}${text.slice(textIndex+1, text.length)}`
//     textIndex += 1;
//     textIndex %= text.length;
//     return result;
// }


class UrlGame{
    constructor(){
        this.init();
    }

    init(){
        this.isGameStart = false;
        this.countDownTimer = 3;
        this.gameResult = '';
        this.clickCount = 0;
    }
    
    start(){
        this.init();
        this.isGameStart = true;
        this.countDownTimer = 3;

    }

    update(delta){
        if(this.isGameStart){
            this.countDownTimer -= (delta/1000);
            if(this.countDownTimer <= 0){
                this.isGameStart = false;
                this.gameResult = `Total: ${this.clickCount}`;
            }
            

        }
    }

    getResult(){
        if(!this.isGameStart){
            if(this.gameResult == ''){
                return `Press R key to start game`;
            }else{
                console.log(this.gameResult)
                return `${this.gameResult} | Press R key to restart game`
            }
        }else{
            this.gameResult = `Click: ${this.clickCount} | Time: ${~~(this.countDownTimer)+1}`

        }

        return this.gameResult;
    }

    keyboardInput(key){
        switch(key){
            case 'r':
                if(!game.isGameStart){
                    game.start();
                }else{
                    game.clickCount += 1;
                }
                break;
            
            default:
                game.clickCount += 1;
                break;
        }
    }
    
}

let delta = 100;
// let textIndex = 0;
// let text = 'Hello,world!';
// let symbol = '_';

let game = new UrlGame();
// game.start();

function update(){
    game.update(delta);
    
    render(game.getResult())
    setTimeout(() => {
        requestAnimationFrame(update);
    }, delta);
}

update();

window.addEventListener('keydown', (e) => {
    game.keyboardInput(e.key.toLowerCase());
})