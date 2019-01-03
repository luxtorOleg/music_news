function go() { 
    (function($) {

        var width, height, strokecolor, canvas, ctx, points, target;
    
        initHeader();
        initAnimation();
        addListeners();
    
        function initHeader() {
            
            width = window.innerWidth;
            height = window.innerHeight;
            target = {x: width/2, y: height/2};    
            
            canvas = document.getElementById('c');
            document.getElementById("main-container").appendChild(canvas);
            strokecolor = "255,255,255";        
            canvas.width = width;
            canvas.height = height;
            ctx = canvas.getContext('2d');
    
            // create points
            points = [];
            for(var x = 0; x < width; x = x + width/20) {
                for(var y = 0; y < height; y = y + height/20) {
                    var px = x + Math.random()*width/20;
                    var py = y + Math.random()*height/20;
                    var p = {x: px, originX: px, y: py, originY: py };
                    points.push(p);
                }
            }
    
            // for each point find the 5 closest points
            for(var i = 0; i < points.length; i++) {
                var closest = [];
                var p1 = points[i];
                for(var j = 0; j < points.length; j++) {
                    var p2 = points[j]
                    if(!(p1 == p2)) {
                        var placed = false;
                        for(var k = 0; k < 5; k++) {
                            if(!placed) {
                                if(closest[k] == undefined) {
                                    closest[k] = p2;
                                    placed = true;
                                }
                            }
                        }
    
                        for(var k = 0; k < 5; k++) {
                            if(!placed) {
                                if(getDistance(p1, p2) < getDistance(p1, closest[k])) {
                                    closest[k] = p2;
                                    placed = true;
                                }
                            }
                        }
                    }
                }
                p1.closest = closest;
            }
    
            // assign a circle to each point
            for(var i in points) {
                var c = new Circle(points[i], 2+Math.random()*2, 'rgba(255,255,255,0.3)');
                points[i].circle = c;
            }
        }
    
        // Event handling
        function addListeners() {
            window.addEventListener('mousemove', mouseMove);
            window.addEventListener('resize', resize);
        }
    
        function mouseMove(e) {
            var posx = posy = 0;
            if (e.pageX || e.pageY) {
                posx = e.pageX;
                posy = e.pageY;
            }
            else if (e.clientX || e.clientY)    {
                posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
                posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
            }
            target.x = posx;
            target.y = posy;
        }
    
        function resize() {
            width = window.innerWidth;
            height = window.innerHeight;        
            canvas.width = width;
            canvas.height = height;
        }
    
        // animation
        function initAnimation() {
            animate();
            for(var i in points) {
                shiftPoint(points[i]);
            }
        }
    
        function animate() {
            ctx.clearRect(0,0,width,height);
            for(var i in points) {
                // detect points in range
                if(Math.abs(getDistance(target, points[i])) < 4000) {
                    points[i].active = 0.4;
                    points[i].circle.active = 0.5;
                } else if(Math.abs(getDistance(target, points[i])) < 20000) {
                    points[i].active = 0.3;
                    points[i].circle.active = 0.4;
                } else if(Math.abs(getDistance(target, points[i])) < 40000) {
                    points[i].active = 0.2;
                    points[i].circle.active = 0.3;
                } else {
                    points[i].active = 0.1;
                    points[i].circle.active = 0.2;
                }
    
                drawLines(points[i]);
                points[i].circle.draw();
            }
            requestAnimationFrame(animate);
        }
    
        function shiftPoint(p) {
            TweenLite.to(p, 1+1*Math.random(), {
              x:p.originX-10+Math.random()*20,
              y:p.originY-10+Math.random()*20,
              ease:Sine.easeInOut,
              onComplete: function() {
                  shiftPoint(p);
              }});
        }
    
        // Canvas manipulation
        function drawLines(p) {
            if(!p.active) return;
            for(var i in p.closest) {
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p.closest[i].x, p.closest[i].y);
                ctx.strokeStyle = 'rgba('+strokecolor+','+ p.active+')';
                ctx.stroke();
            }
        }
    
        function Circle(pos,rad,color) {
            var _this = this;
    
            // constructor
            (function() {
                _this.pos = pos || null;
                _this.radius = rad || null;
                _this.color = color || null;
            })();
    
            this.draw = function() {
                if(!_this.active) return;
                ctx.beginPath();
                ctx.arc(_this.pos.x, _this.pos.y, _this.radius, 0, 2 * Math.PI, false);
                ctx.fillStyle = 'rgba('+strokecolor+','+ _this.active+')';
                ctx.fill();
            };
        }
    
        // Util
        function getDistance(p1, p2) {
            return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
        }
        
    })(jQuery);
//     var cvs = document.getElementById('c'),
//     context = cvs.getContext("2d");
//     document.getElementById("main-container").appendChild(cvs);

// var numDots = 500,
//     n = numDots,
//     currDot,
//     maxRad = 1000,
//     minRad = 100,
//     radDiff = maxRad-minRad,
//     dots = [],
//     pairs = [];
//     PI = Math.PI,
//     centerPt = {x:0, y:0};

// resizeHandler();
// window.onresize = resizeHandler;

// // create dots
// n = numDots
// while(n--){
//   currDot = {};
//   currDot.x = currDot.y = 0;
//   currDot.radius = minRad+Math.random()*radDiff;
//   currDot.radiusV = 10+Math.random()*50,
//   currDot.radiusVS = (1-Math.random()*2)*0.015,
//   currDot.radiusVP = Math.random()*PI,
//   currDot.ang = (1-Math.random()*2)*PI;
//   //currDot.speed = (1-Math.random()*2);
//   currDot.speed = 1-Math.round(Math.random())*2;
//   //currDot.speed = 1;
//   currDot.intensity = Math.round(Math.random()*255);
//   currDot.fillColor = "rgb("+currDot.intensity+","+currDot.intensity+","+currDot.intensity+")";
//   dots.push(currDot);
// }

// //create all pairs

// n = numDots
// while(n--){
//   ni = n;
//   while(ni--){
//     pairs.push([n, ni]);
//   }
// }

// function drawPoints(){
//   n = numDots;
//   var _centerPt = centerPt,
//       _context = context,
//       dX = 0,
//       dY = 0;
  
//   _context.clearRect(0, 0, cvs.width, cvs.height);
  
//   var radDiff;
//   //move dots
//   n = numDots;
//   while(n--){
//     currDot = dots[n];
//     currDot.radiusVP += currDot.radiusVS;
//     radDiff = currDot.radius+Math.sin(currDot.radiusVP)*currDot.radiusV;
//     currDot.x = _centerPt.x+Math.sin(currDot.ang)*radDiff;
//     currDot.y = _centerPt.y+Math.cos(currDot.ang)*radDiff;
    
//     //currDot.ang += currDot.speed;
//     currDot.ang += currDot.speed*radDiff/300000;
    
//   } 
  
//   var pair, dot0, dot1, dist, bright,
//       maxDist = Math.pow(200, 2);
//   //draw lines
//   n = pairs.length;
//   while(n--){
//     pair = pairs[n];
//     dot0 = dots[pair[0]];
//     dot1 = dots[pair[1]];
//     dist = Math.pow((dot1.x-dot0.x), 2)+Math.pow((dot1.y-dot0.y), 2);
//     if(dist<maxDist){
//       bright = Math.round(50*(maxDist-dist)/maxDist);
//       _context.beginPath();
//       _context.moveTo(dot0.x, dot0.y);
//       _context.lineTo(dot1.x, dot1.y);
//       _context.lineWidth = 1;
//       _context.strokeStyle = "rgb("+0+","+96+","+255+")";
//       _context.stroke();
//     }
//   }
  
//   //draw dots
//   n = numDots;
//   while(n--){    
//     //console.log(currDot);
//     _context.fillStyle= dots[n].fillColor;
//     _context.fillRect(dots[n].x, dots[n].y, 1, 1);
//   }
//   window.requestAnimationFrame(drawPoints);
// }

// function resizeHandler(){
//   var box = cvs.getBoundingClientRect();
//   var w = box.width;
//   var h = box.height;
//   cvs.width = w;
//   cvs.height = h;
//   centerPt.x = Math.round(w/2);
//   centerPt.y = Math.round(h/2);
// }

// drawPoints();
}