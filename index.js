//Making the canvas, and resizing it to match the users screen
var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c = canvas.getContext('2d');

var startx = 0;
var starty = 0;
var endx = 0;
var endy = 0;
var distance = 0;
var speed = 2;
var mdown = 0;


function Circle(x,y,radius,dx,dy){
	this.x = x;
	this.y = y;
	this.radius = radius;
	this.dx = dx;
	this.dy = dy;
	
	this.draw = function(){
		c.setLineDash([]);
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
		c.lineWidth = 2;
		c.stroke();
		c.fill();
	}
	this.update = function(){
		if(this.x > innerWidth-this.radius || this.x < this.radius){
			this.dx = -this.dx;
		}
		if(this.y > innerHeight-this.radius || this.y < this.radius){
			this.dy = -this.dy;
		}
		this.x += this.dx;
		this.y += this.dy;
		this.draw();
	}
}
CircleArray = []

window.addEventListener('mousedown', function(e){
	startx = e.x;
	starty = e.y;
	endx = e.x;
	endy = e.y;
	console.log(`CLICK: ${startx} | ${starty}`);
	mdown = 1;
});
window.addEventListener('mouseup', function(e){
	endx = e.x;
	endy = e.y;
	dx = -(endx-startx)/10;
	dy = -(endy-starty)/10;
	distance = Math.sqrt(Math.pow((endx-startx),2)+Math.pow((endy-starty),2));
	console.log(`UP	dx: ${dx} dy: ${dy}`);
	CircleArray.push(new Circle(startx,starty,150,dx,dy));
	mdown = 0;
});
window.addEventListener('mousemove', function(e){
	if(mdown){
		
	endx = e.x;
	endy = e.y;
	console.log("move");
	}
});
function animate(){		//Loop that updates and reads buttons
	requestAnimationFrame(animate);
	c.clearRect(0,0,innerWidth,innerHeight);
	for(var i=0;i < CircleArray.length; i++){		//Update
		CircleArray[i].update();
	}
	if(mdown){
	c.setLineDash([20,20,20]);
	c.lineWidth= 20;
	c.beginPath();
	c.moveTo(startx, starty);
	c.lineTo(endx, endy);
	c.stroke();
	}
}
animate();