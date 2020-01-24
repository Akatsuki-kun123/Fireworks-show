const WIDTH = 1400;
const HEIGHT = 800;
const PARTICLE_SIZE = 10;
const PARTICLE_CHANGE_SIZE_SPEED = 0.1;
const ACCELERATION = 0.1;
const DOT_CHANGE_SIZE_SPEED = 0.1;
const DOT_CHANGE_ALPHA_SPEED = 0.05;
const PARTICLE_MIN_SPEED = 10;

var NUMBER_OF_PARTICLE_PER_BULLET = Math.random() * 10 + 10;
var PARTICLE_CHANGE_SPEED = Math.random() * 0.2 + 0.3;
class particle 
{
    constructor(bullet, deg) 
    {
        this.bullet = bullet;
        this.ctx = bullet.ctx;
        
        this.deg = deg;
        
        this.x = this.bullet.x;
        this.y = this.bullet.y;
        
        this.size = PARTICLE_SIZE;

        this.color = bullet.color;
        
        this.speed = Math.random() * 5 + PARTICLE_MIN_SPEED;
        this.speedx = 0;
        this.speedy = 0;
        this.fallSpeed = 0;

        this.dots = [];
    }

    update() 
    {
        PARTICLE_CHANGE_SPEED = Math.random() * 0.2 + 0.4;

        NUMBER_OF_PARTICLE_PER_BULLET = Math.random() * 10 + 10;

        if (this.speed > 0)
        {
            this.speed -= PARTICLE_CHANGE_SPEED;
        }

        if (this.speed < 0) 
        {
            this.speed = 0;
        }

        this.fallSpeed += ACCELERATION;
        this.speedx = this.speed * Math.cos(this.deg);
        this.speedy = this.speed * Math.sin(this.deg) + this.fallSpeed;

        this.x += this.speedx;
        this.y += this.speedy;

        if (this.size > PARTICLE_CHANGE_SIZE_SPEED) 
        {
            this.size -= PARTICLE_CHANGE_SIZE_SPEED;
        }

        if (this.size > 0)
        {
            this.dots.push({ x : this.x, y : this.y, alpha : 1, size : this.size })
        }

        this.dots.forEach( dot => {
            dot.size -= DOT_CHANGE_SIZE_SPEED;
            dot.alpha -= DOT_CHANGE_ALPHA_SPEED;
        })

        this.dots = this.dots.filter( dot => {
            return dot.size > 0;
        })
    }

    draw() 
    {
        this.dots.forEach(dot => 
        {
            this.ctx.fillStyle = 'rgba(' + this.color + ',' + dot.alpha + ')';
            this.ctx.beginPath();
            this.ctx.arc(dot.x, dot.y, dot.size, 0, 2 * Math.PI);
            this.ctx.fill(); 
            
            if (this.dots.length == 0)
            {
                this.remove();
            }
        })
    }

    remove()
    {
        this.Fireworks.bullets.splice( this.Fireworks.bullets.indexOf(this), 1 );
    }
}

class bullet 
{
    constructor(fireworks) 
    {
        this.fireworks = fireworks;
        this.ctx = fireworks.ctx;

        this.x = randInMultiInterval( {min : 200, max : 400}, {min : 1000, max : 1200} );
        this.y = Math.random() * 400 + 300;
        this.color = Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255);

        let bulletDeg = (Math.PI * 2) / NUMBER_OF_PARTICLE_PER_BULLET;

        this.particles = [];
        
        for (let i = 0; i < NUMBER_OF_PARTICLE_PER_BULLET; i ++)
        {
            let newParticle = new particle(this, i * bulletDeg);
            this.particles.push(newParticle);
        }
    }

    update() 
    {
        if (this.particles.length == 0)
        {
            this.remove();
        }

        this.particles.forEach( particle => particle.update() );
    }

    draw() 
    {
        this.particles.forEach( particle => particle.draw() );
    }

    remove()
    {
        this.bullet.particles.splice( this.bullet.particles.indexOf(this), 1 );
    }
}

class fireworks 
{
    constructor() 
    {
        this.canvas = document.createElement('canvas');

        this.ctx = this.canvas.getContext('2d');

        this.canvas.width = WIDTH;
        this.canvas.height = HEIGHT;

        document.body.appendChild(this.canvas);

        this.bullets = [];

        setInterval( () => {
            let newBullet = new bullet(this);
            this.bullets.push(newBullet);
        }, 2000)

        this.loop();
    }

    loop() 
    {
        this.draw();

        this.bullets.forEach( bullet => bullet.update() );

        setTimeout( () => this.loop(), 50 );
    }

    clearScreen() 
    {
        this.ctx.fillStyle = '#1a0000';
        this.ctx.fillRect(0, 0, WIDTH, HEIGHT);

        this.ctx.fillStyle = '#ff9999';

        this.ctx.fillRect(110 + 80, 110 - 25, 25, 150);
        this.ctx.fillRect(135 + 80, 172.5 - 25, 45, 25);
        this.ctx.fillRect(180 + 80, 110 - 25, 25, 150);

        this.ctx.fillRect(230 + 80, 135 - 25, 25, 125);
        this.ctx.fillRect(245 + 80, 110 - 25, 65, 25);
        this.ctx.fillRect(300 + 80, 135 - 25, 25, 125);
        this.ctx.fillRect(255 + 80, 172.5 - 25, 45, 25);

        this.ctx.fillRect(345 + 80, 110 - 25, 25, 150);
        this.ctx.fillRect(370 + 80, 110 - 25, 50, 25);
        this.ctx.fillRect(405 + 80, 125 - 25, 25, 65);
        this.ctx.fillRect(370 + 80, 180 - 25, 50, 25);

        this.ctx.fillRect(450 + 80, 110 - 25, 25, 150);
        this.ctx.fillRect(475 + 80, 110 - 25, 50, 25);
        this.ctx.fillRect(510 + 80, 125 - 25, 25, 65);
        this.ctx.fillRect(475 + 80, 180 - 25, 50, 25);

        this.ctx.fillRect(555 + 80, 110 - 25, 25, 62.5);
        this.ctx.fillRect(565 + 80, 170 - 25, 60, 25);
        this.ctx.fillRect(610 + 80, 110 - 25, 25, 62.5);
        this.ctx.fillRect(582.5 + 80, 195 - 25, 25, 62.5);

        this.ctx.beginPath();
        this.ctx.moveTo(700 + 80, 110 - 25);
        this.ctx.lineTo(725 + 80, 110 - 25);
        this.ctx.lineTo(775 + 80, 205 - 25);
        this.ctx.lineTo(775 + 80, 110 - 25);
        this.ctx.lineTo(800 + 80, 110 - 25);
        this.ctx.lineTo(800 + 80, 260 - 25);
        this.ctx.lineTo(775 + 80, 260 - 25);
        this.ctx.lineTo(725 + 80, 165 - 25);
        this.ctx.lineTo(725 + 80, 260 - 25);
        this.ctx.lineTo(700 + 80, 260 - 25);
        this.ctx.closePath();
        this.ctx.fill();

        this.ctx.beginPath();
        this.ctx.moveTo(825 + 80, 110 - 25);
        this.ctx.lineTo(920 + 80, 110 - 25);
        this.ctx.lineTo(920 + 80, 140 - 25);
        this.ctx.lineTo(850 + 80, 140 - 25);
        this.ctx.lineTo(850 + 80, 170 - 25);
        this.ctx.lineTo(920 + 80, 170 - 25);
        this.ctx.lineTo(920 + 80, 200 - 25);
        this.ctx.lineTo(850 + 80, 200 - 25);
        this.ctx.lineTo(850 + 80, 230 - 25);
        this.ctx.lineTo(920 + 80, 230 - 25);
        this.ctx.lineTo(920 + 80, 260 - 25);        
        this.ctx.lineTo(825 + 80, 260 - 25);   
        this.ctx.closePath();
        this.ctx.fill();
        
        this.ctx.beginPath();
        this.ctx.moveTo(945 + 80, 110 - 25);
        this.ctx.lineTo(980 + 80, 110 - 25);
        this.ctx.lineTo(997.5 + 80, 230 - 25);
        this.ctx.lineTo(1015 + 80, 110 - 25);
        this.ctx.lineTo(1050 + 80, 110 - 25);
        this.ctx.lineTo(1067.5 + 80, 230 - 25);
        this.ctx.lineTo(1085 + 80, 110 - 25);
        this.ctx.lineTo(1120 + 80, 110 - 25);
        this.ctx.lineTo(1085 + 80, 260 - 25);
        this.ctx.lineTo(1050 + 80, 260 - 25);
        this.ctx.lineTo(1032.5 + 80, 140 - 25);        
        this.ctx.lineTo(1015 + 80, 260 - 25);
        this.ctx.lineTo(980 + 80, 260 - 25);   
        this.ctx.closePath();
        this.ctx.fill(); 

        this.ctx.fillRect(500, 350 - 25, 25, 62.5);
        this.ctx.fillRect(510, 410 - 25, 60, 25);
        this.ctx.fillRect(555, 350 - 25, 25, 62.5);
        this.ctx.fillRect(527.5, 435 - 25, 25, 62.5);

        this.ctx.beginPath();
        this.ctx.moveTo(825 + 80 - 300, 350 - 25);
        this.ctx.lineTo(920 + 80 - 300, 350 - 25);
        this.ctx.lineTo(920 + 80 - 300, 380 - 25);
        this.ctx.lineTo(850 + 80 - 300, 380 - 25);
        this.ctx.lineTo(850 + 80 - 300, 410 - 25);
        this.ctx.lineTo(920 + 80 - 300, 410 - 25);
        this.ctx.lineTo(920 + 80 - 300, 440 - 25);
        this.ctx.lineTo(850 + 80 - 300, 440 - 25);
        this.ctx.lineTo(850 + 80 - 300, 470 - 25);
        this.ctx.lineTo(920 + 80 - 300, 470 - 25);
        this.ctx.lineTo(920 + 80 - 300, 500 - 25);        
        this.ctx.lineTo(825 + 80 - 300, 500 - 25);   
        this.ctx.closePath();
        this.ctx.fill();

        this.ctx.fillRect(230 + 80 + 415, 135 + 240 - 25, 25, 125);
        this.ctx.fillRect(245 + 80 + 415, 350 - 25, 65, 25);
        this.ctx.fillRect(300 + 80 + 415, 135 + 240 - 25, 25, 125);
        this.ctx.fillRect(255 + 80 + 415, 172.5 + 240 - 25, 45, 25);

        this.ctx.fillRect(345 + 80 + 395 + 25, 350 - 25, 25, 150);
        this.ctx.fillRect(370 + 80 + 395 + 25, 350 - 25, 50, 25);
        this.ctx.fillRect(405 + 80 + 395 + 25, 125 + 240 - 25, 25, 65);
        this.ctx.fillRect(370 + 80 + 395 + 25, 180 + 240 - 25, 50, 25);
        this.ctx.beginPath();
        this.ctx.moveTo(370 + 80 + 395 + 25, 420);
        this.ctx.lineTo(370 + 80 + 25 + 395 + 25, 420);
        this.ctx.lineTo(405 + 80 + 395 + 50, 500 - 25);
        this.ctx.lineTo(405 + 80 + 395 + 25, 500 - 25);
        this.ctx.closePath();
        this.ctx.fill();
    }

    draw() 
    {
        this.clearScreen();

        this.bullets.forEach( bullet => bullet.draw() );
    }
}

var a = {};
var b = {};
var _random = 0;

function randInMultiInterval(a, b)
{
    _random = Math.random();

    if (_random <= 0.5)
    {
        return Math.random() * (a.max - a.min) + a.min;
    }

    else
    {
        return Math.random() * (b.max - b.min) + b.min;
    }
}
var f = new fireworks();

