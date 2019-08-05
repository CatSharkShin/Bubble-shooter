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
var baseRadius = 300;
var diameter = Math.sqrt(Math.pow(window.innerHeight,2)+Math.pow(window.innerWidth,2));

function Circle(x,y,radius,dx,dy){
	this.x = x;
	this.y = y;
	this.radius = radius;
	this.spawnradius = radius;
	this.dx = dx;
	this.dy = dy;
	
	this.draw = function(){
		c.strokeStyle = "#000000"
		c.setLineDash([]);
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
		c.lineWidth = 2;
		c.stroke();
		c.fill();
	}
	this.update = function(i){
		if(this.x > innerWidth-this.radius || this.x < this.radius){
			this.dx = -this.dx;
			this.hit(i);
		}
		if(this.y > innerHeight-this.radius || this.y < this.radius){
			this.dy = -this.dy;
			this.hit(i);
		}
		this.x += this.dx;
		this.y += this.dy;
		this.draw();
	}
	this.hit = function(i){
		if(this.radius<50){
			CircleArray.splice(i,1);
		}else{
		this.radius *= 0.9;
		this.dx *= 0.9;
		this.dy *= 0.9;
		}
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
	console.log(`UP	dx: ${dx} dy: ${dy}`);
	if(dx!=0||dy!=0)
	CircleArray.push(new Circle(startx,starty,baseRadius*(1-(distance/diameter)),dx,dy));
	mdown = 0;
});
window.addEventListener('mousemove', function(e){
	if(mdown){
	distance = Math.sqrt(Math.pow((endx-startx),2)+Math.pow((endy-starty),2));
	console.log(diameter);
	endx = e.x;
	endy = e.y;
	console.log("move");
	}
});
function animate(){		//Loop that updates and reads buttons
	requestAnimationFrame(animate);
	c.clearRect(0,0,innerWidth,innerHeight);
	for(var i=0;i < CircleArray.length; i++){		//Update
		CircleArray[i].update(i);
	}
	if(mdown){
	c.lineCap = "round";
	c.setLineDash([20+distance/100]);
	c.lineWidth= 20;
	c.strokeStyle = "#FFFFFF"
	c.beginPath();
	c.moveTo(startx, starty);
	c.lineTo(endx, endy);
	c.stroke();
	}
}
animate();