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
var diameter = Math.sqrt(Math.pow(window.innerHeight,2)+Math.pow(window.innerWidth,2));
var baseRadius = diameter/42;
var gravity = diameter/850;
var lifetime = 0.5;

function Circle(x,y,radius,dx,dy,spark){
	this.x = x;
	this.y = y;
	this.radius = radius;
	this.spawnradius = radius;
	this.dx = dx;
	this.dy = dy;
	this.spark = spark;
	this.lt = lifetime*(Math.random()*(0.8)+0.2);
	this.maxlt = this.lt;
	
	this.draw = function(){
		if(this.spark){
		c.fillStyle = `rgba(255,255,255,${this.lt/this.maxlt})`;
		c.shadowColor = 'white';
		c.shadowBlur = 20000;
		c.strokeStyle = "rgba(255,255,255,0)";
		}else{
			c.shadowColor = 'black';
			c.shadowBlur = 200;
		}
		c.setLineDash([]);
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
		c.lineWidth = 2;
		c.stroke();
		c.fill();
		c.fillStyle = 'black';
	}
	this.update = function(i){
		if(this.x > innerWidth-this.radius || this.x < this.radius){
			this.dx = -this.dx;
			if(this.x > innerWidth-this.radius){
				this.hit(i,1);
			}else if(this.x < this.radius){
				this.hit(i,-1);
			}
		}
		if(this.y > innerHeight-this.radius || this.y < this.radius){
			this.dy = -this.dy;
			this.hit(i,1);
		}
		if(this.sparkle){
		this.dy += gravity*1000;
		}else{
		this.dy += gravity*this.radius/baseRadius;
		}
		this.x += this.dx;
		this.y += this.dy;
		this.draw();
	}
	this.hit = function(i,d){
		if(this.radius<this.spawnradius*0.1 || (this.radius<this.spawnradius*0.9 && this.spark) || (this.lt<=0 && this.spark)){
			CircleArray.splice(i,1);
		}else{
			if(this.spark){
				this.radius *= 0.8;
				this.dx *= 0.8;
				this.dy *= 0.8;
			}else{
				for(var j=0;j<5;j++){
				rdx = d*Math.random()*100;
				rdy = -Math.random()*50;
				CircleArray.push(new Circle(this.x,this.y,this.radius/5,rdx,rdy,1));
				}
				this.radius *= 0.8;
				this.dx *= 0.8;
				this.dy *= 0.7;
				console.log("asd");
			}
	}
	}
}
window.setInterval(function(){
	for(var i=0; i < CircleArray.length; i++){
		CircleArray[i].lt -= 0.01;
		if(CircleArray[i].lt <= 0 && CircleArray[i].spark){
			CircleArray.splice(i,1);
		}
	}
},10);
CircleArray = [];
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
	CircleArray.push(new Circle(startx,starty,baseRadius*(1-(distance/diameter)),dx,dy,0));
	mdown = 0;
});
window.addEventListener('mousemove', function(e){
	if(mdown){
	distance = Math.sqrt(Math.pow((endx-startx),2)+Math.pow((endy-starty),2));
	endx = e.x;
	endy = e.y;
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
	c.strokeStyle = "#FFFFFF";
	c.beginPath();
	c.moveTo(startx, starty);
	c.lineTo(endx, endy);
	c.stroke();
	}
	
	c.strokeStyle = "#000000";
}
animate();