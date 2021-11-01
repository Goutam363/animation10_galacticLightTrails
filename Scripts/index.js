const canvas=document.querySelector("canvas");
const c=canvas.getContext('2d');

canvas.height=window.innerHeight;
canvas.width=window.innerWidth;

const n=500;

const color_palate=['#EDF1FA','#A7D5F2','white','#1C7FA6','#024059','#6C47FF'];

let mousedown=false;
window.addEventListener('mousedown',function(){
    mousedown=true;
})
window.addEventListener('mouseup',function(){
    mousedown=false;
})
window.addEventListener('resize',function(){
    canvas.height=window.innerHeight;
    canvas.width=window.innerWidth;
    init();
})

//utility functions
function randomIntFromRange(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
}
function randomColor(color_palate){
    return color_palate[Math.floor(Math.random()*color_palate.length)];
}

//Objects
function Particle(x,y,radius,color)
{
    this.x=x;
    this.y=y;
    this.radius=radius;
    this.color=color;
    this.draw=function(){
        c.beginPath();
        c.strokeStyle=this.color;
        c.arc(this.x,this.y,this.radius,0,Math.PI*2,false);
        c.shadowColor=this.color;
        c.shadowBlur=15;
        c.fillStyle=this.color;
        c.fill();
        // c.stroke();
        c.closePath();
    };
    this.update=function(){
        this.draw();
    };
}

//Implementation
let particles;
function init(){
    particles=[];
    for(i=0;i<n;i++)
    {
        const canvasWidth=canvas.width+300;
        const canvasHeight=canvas.height+300;
        const x=Math.random()*canvasWidth-canvasWidth/2;
        const y=Math.random()*canvasHeight-canvasHeight/2;
        const radius=2*Math.random();
        const color=randomColor(color_palate);
        particles.push(new Particle(x,y,radius,color));
    }
}

//Animation logo
let radian=0;
let speed=0.001;
let alpha=1;
function animate(){
    requestAnimationFrame(animate);
    c.fillStyle=`rgba(10,10,10,${alpha})`;
    c.fillRect(0,0,canvas.width,canvas.height);
    c.save();
    c.translate(canvas.width/2,canvas.height/2);
    c.rotate(radian);
    particles.forEach((particle) => {
        particle.update();
    });
    c.restore();
    radian+=speed;
    if(mousedown && alpha>=0.1){
        alpha-=0.01;
    }else if(!mousedown && alpha<1){
        alpha+=0.01;
    }
    if(mousedown && speed<=0.005){
        speed+=0.001;
    }else if(!mousedown && speed>0.001){
        speed-=0.001;
    }
}

init();
animate();