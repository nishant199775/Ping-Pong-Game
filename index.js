const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
var isActive=false;
if(localStorage.getItem('HighestScore')===null||localStorage.getItem('HighestScore')==='null')
{
    localStorage.setItem('HighestScore','0');
}

const w=canvas.width;
var score1=0;
const h=canvas.height;
const bar={
    x:w/2-100,
    y:0,
    w:200,
    h:10,
    dx:0,
    dy:0,
    speed:5

}
//making bars
// bar-1&2
function drawBars(){
    ctx.fillStyle='dark-grey';
    ctx.fillRect(bar.x,bar.y,bar.w,bar.h);
    ctx.fillRect(bar.x,h-bar.h,bar.w,bar.h);
}
// moveBar
function moveBar(){
  ctx.clearRect(0,0,w,10);
  ctx.clearRect(0,h-10,w,10);
  drawBars();
// new position
  newPos();


  requestAnimationFrame(moveBar);
  

}
function newPos(){
    bar.x+=bar.dx;
    detectWalls();
}

function detectWalls(){
    // right wall
    if(bar.x>w-bar.w)
    {
        bar.x=w-bar.w;
    }
    // left wall
    if(bar.x<0)
    bar.x=0;
}

function moveRight()
{
    
    bar.dx=bar.speed;

}
function moveLeft()
{
   
    bar.dx=-bar.speed;
    
}

function keyDown(e)
{
    console.log(e.key);
    if(e.key==='ArrowRight'||e.key==='d'&&isActive)
    {
        moveRight();
    }
    else if(e.key==='ArrowLeft'||e.key==='a'&&isActive)
    {
        moveLeft();
    }
    else if(e.key==='Enter'&&!isActive)
    {
        moveBall();
        moveBar();
        isActive=true;
    }
}

function keyUp(e)
{
    if(e.key==='ArrowRight'||e.key==='ArrowLeft')
    {
        bar.dx=0;
    }
}

// ball
ctx.fillStyle="red"
const ball={
    x:w/2,
    y:h-20,
    size:10,
    dx:-5,
    dy:-4
}
function drawBall(){
    ctx.beginPath();
    ctx.arc(ball.x,ball.y,ball.size,0,Math.PI*2,true);
    ctx.fillStyle="purple";
    ctx.fill();
}

function clear()
{
    ctx.clearRect(0,0,w,h);
}

function moveBall(){
    // to clear prev ball
    ctx.clearRect(0,10,w,h-20);
    // to draw ball at new position
    drawBall();
    // change position
    ball.x+=ball.dx;
    ball.y+=ball.dy;

    // Detect side wall
    if(ball.x+ball.size>w||ball.x-ball.size<0)
    {
        ball.dx*=-1;
    }
    // top-down wall
    // when ball hit first half of bar
    if(ball.y-ball.size<10&&ball.x>=bar.x&&ball.x<bar.x+(bar.w)/2)
    {
        ball.dy*=-1;
        var angle = -1 * Math.PI / 4;
        ball.dx*=Math.sin(angle);
        score1++;
        // set to initial state0
        // ball.x=w/2;
        // ball.y=h-20;
           
    }
    // when ball hit at second half if bar
    else if(ball.y-ball.size<10&&ball.x>bar.x+(bar.w/2)&&ball.x<=bar.x+bar.w)
    {
        ball.dy*=-1;
        var angle = Math.PI / 4;;
        ball.dx*=Math.sin(angle);
    }
    else if(ball.y-ball.size<10&&ball.x===bar.x+(bar.w)/2)
    {
        // midlle hit 180 deg rotation
        ball.dx*=0;
        ball.dy*=-1;
    }
    else if(ball.y-ball.size<0){
        // console.log("ball.x=",ball.x);
        // console.log("ball.y=",ball.y);
        // console.log("bar.x=",bar.x);
        // console.log("bar.y=",bar.y);
        const highestScore=parseInt(localStorage.getItem('HighestScore'));
        if(score1>Number(highestScore))
        {
            localStorage.setItem('HighestScore',score1);
            if(!alert("player 1 wins and Achieve highest score="+score1)){window.location.reload();}

            
        }
        else{
            if(!alert('player 1 wins and highest score='+highestScore)){window.location.reload()};
        }

        
        
        clear();
        ball.x=w/2;
        ball.y=h-20;
        bar.x=w/2-100;
        drawBall();
        drawBars();
        cancelAnimationFrame(moveBall);
       
    }
    if(ball.y+ball.size>=h-10&&ball.x>bar.x&&ball.x<bar.x+bar.w){
        ball.dy*=-1;
    }
    else if(ball.y+ball.size>h){
        console.log("ball.x=",ball.x);
        console.log("ball.x=",ball.y);
        console.log("ball.x=",bar.x);
        console.log("ball.x=",bar.y);

        alert('player 2 wins');
        
        clear();
        ball.x=w/2;
        ball.y=h-20;
        bar.x=w/2-100;
        drawBall();
        drawBars();
        cancelAnimationFrame(moveBall);
          
    }

    requestAnimationFrame(moveBall);
}

drawBars();
drawBall();
document.addEventListener('keydown',keyDown);
document.addEventListener('keyup',keyUp);