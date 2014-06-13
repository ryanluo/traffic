// size of SVG
var w=500;
var h=500;
// radius of track, in pixels
var radius_pixels = 200; 
// length of track , in meters
var L = 230;
// width of lane, in meters
var track_width = 5;
// number of vehicles
var N = 22;
var exp1 = document.getElementById("experiment1");
var density = L/N;
var a = 1.0;
var c = 2.0;

// set up SVG container
var svg = d3.select("#experiment1")
.append("svg")
.attr("width",w)
.attr("height",h)
.attr("id","experiment1_viz")
.attr("xmlns", "http://www.w3.org/2000/svg");
// conversion factor from arbitrary units to meters
var r = (2*Math.PI*radius_pixels)/L; 
// draw the track
var track = svg.append("circle")
	.attr("cx",w/2)
	.attr("cy",h/2)
	.attr("r",radius_pixels)
	.attr("fill","white")
	.style({'stroke': '#666666', 'stroke-width': track_width * r})

function tanh(value) {
        var y = Math.exp(2 * value);
        return (y - 1) / (y + 1);	
}

function V(dx) {
	return 6 * (tanh(0.3 * dx - c) + tanh(c)); //4*Math.random();
}
function calcf(x, v, fx, fv) {
	for(var i = 0; i < N; i++) {
		var dx;
		dx = x[(i+1)%N] - x[i]; 
		if (dx < -L * 0.5) {
			dx += L;
		}

		fv[i] = a*(V(dx) - v[i]);
	}
	for (var i = 0; i < N; i++) {
		fx[i] = v[i];
	}

}
function integrate_RungeKutta(x, v) {
	var kx1 = [];
	var kv1 = [];
	var kx2 = [];
	var kv2 = [];
	var kx3 = [];
	var kv3 = [];
	var kx4 = [];
	var kv4 = [];
	var tx = [];
	var tv = [];

	calcf(x, v, kx1, kv1);
	
	for (var i = 0; i < N; i++) {
		tx[i] = x[i] + kx1[i] * dt * 0.5;
		tv[i] = v[i] + kv1[i] * dt * 0.5;
	}

	calcf(tx, tv, kx2, kv2);
	
	for (var i = 0; i < N; i++) {
		tx[i] = x[i] + kx2[i] * dt * 0.5;
		tv[i] = v[i] + kv2[i] * dt * 0.5;
	}

	calcf(tx, tv, kx3, kv3);

	for (var i = 0; i < N; i++) {
		tx[i] = x[i] + kx3[i] * dt;
		tv[i] = v[i] + kv3[i] * dt;
	}	

	calcf(tx, tv, kx4, kv4);

	for (var i = 0; i < N; i++) {
                x[i] += (kx1[i] + 2.0 * kx2[i] + 2.0 * kx3[i] + kx4[i]) / 6.0 * dt;
                v[i] += (kv1[i] + 2.0 * kv2[i] + 2.0 * kv3[i] + kv4[i]) / 6.0 * dt;
	
	}
}
		
function integrate(x, v) {
	integrate_RungeKutta(x, v);

	for (var i = 0; i < N; i++) {
		if (x[i] > L) {
			x[i] -= L;
		}
	}
	s_time += dt;
}

function init(x, v) {
	var dx = L / N;
	var iv = V(dx);
	for (var i = 0; i < N; i++) {
		x[i] = L/N*i + 0.1*Math.random();
		v[i] = iv;
	}
	console.log("# dt = " + dt + "\n");
	console.log("# density = " + density + "\n");
	console.log("# a = " + a + "\n");
}

// initialize vehicle positions and velocities
var data = []
var x = []
var v = []
var fx = []
var fv = []

var global_max_velocity = 0.001; // max velocity among all cars

init(x, v);

for (var i=0; i<N; i++)
{
	var d = {}
	d.r = 1.5 * r; // radius of each vehicle
	d.acceleration = 0;
	d.max_velocity = 9 + Math.random()/3.6;
	global_max_velocity = Math.max(d.max_velocity, global_max_velocity)
	d.velocity = v[i];
	d.theta = x[i]/L*(2*Math.PI);

	// position in actual space (meters)
	d.xPos = radius_pixels * r * Math.cos(d.theta);
	d.yPos = radius_pixels * r * Math.sin(d.theta);

	// position on SVG canvas
	d.x = w/2 + radius_pixels * Math.cos(d.theta);
	d.y = h/2 + radius_pixels * Math.sin(d.theta);
	data.push(d);
}

// introduce some road rage
data[0].max_velocity = 15;
global_max_velocity = Math.max(data[0].max_velocity, global_max_velocity)

var last_tick = 0;
var dt = 0.07;
function redraw(ms) {
	// compute elapsed seconds
	dt = (ms - last_tick)/1000;
	last_tick = ms;
	for (var i=0; i<N; i++)
	{
		integrate(x, v);
		// current vehicle
		var d = data[i];
		// vehicle in front, wrapping to prevent index out of bounds 
		var d_front = data[(i+1)%N];
		var carLength = d.r * 2;

		// RYAN: not arc length for distance? I guess not a big deal
		var dist = Math.sqrt( Math.pow(d_front.xPos - d.xPos, 2) 
						+ Math.pow(d_front.yPos - d.yPos, 2) ) - 2 * d.r;

		d.acceleration = fv[i];
/*
	        if (dist < carLength * 3) {//dist < d.velocity * 3 || dist < carLength * 3 || d.velocity > d.max_velocity) {
			// come to a stop within 3 seconds
			d.acceleration = -d.velocity/2;
		}
		// speed up
		else if (dist > 5 * d.velocity && d.acceleration <=3 && d.velocity < d.max_velocity) {
			d.acceleration += .1;
		}
		// maintain speed RYAN: Perhaps introduce randomness (no perfect cruising)
		else {
		        //d.acceleration = 0;
		}
*/
		if (d.acceleration/9.8 > 25) {
			console.log("unsafe collision force of " + d.acceleration/9.8 + "G. You die.")
		}

		// integrate acceleration into velocity
		//d.velocity += d.acceleration * dt;
		d.velocity = v[i];

		// cars never travel backward
		if (d.velocity < 0) { 
			d.velocity = 0; 
		}
		if (dist < d.r + d_front.r) {
			// sudden impact. you die
			console.log("sudden impact. you die")
			d.velocity = 0;
		}

		// integrate velocity into angular position along track
		d.theta += d.velocity/L * (2 * Math.PI) * dt;
		// compute XY position 
		d.xPos = radius_pixels * r * Math.cos(d.theta);
		d.yPos = radius_pixels * r * Math.sin(d.theta);
		// compute XY position for drawing
		d.x = w/2 + radius_pixels * Math.cos(d.theta);
		d.y = h/2 + radius_pixels * Math.sin(d.theta);
	}

	// data join
	var vehicles = svg.selectAll(".vehicle").data(data)

	// update old elements
	vehicles
		.attr("cx", function(d) { return d.x; })
		.attr("cy", function(d) { return d.y; })
		.attr("fill", function(d) {
			var col = tinycolor("hsv(" + (d.velocity/global_max_velocity) * 120   + ", 100%, 100%)");
			return "#" + col.toHex();
		})

	// create new vehicles
	vehicles.enter().append("circle")
		.attr("class","vehicle")
		.attr("cx", function(d) { return d.x; })
    	.attr("cy", function(d) { return d.y; })
    	.attr("r", function(d) { return d.r; })
    	.attr("fill","#33CC33")

    // exit
    vehicles.exit().remove()
}

// ui controllers
var animID;
var startButton = document.getElementById("start");
var stopButton = document.getElementById("stop");
startButton.onclick = function() {
	startButton.disabled = true;
	requestAnimationFrame(repeatOften);
}
stopButton.onclick = function() {
	cancelAnimationFrame(animID);
	startButton.disabled = false;
}
function repeatOften(ms) {
	// ms = time in milliseconds
	redraw(ms)
  	animID = requestAnimationFrame(repeatOften);
}
function skip(next_ms) {
	stopButton.click();
	var refresh_rate = 50;
	var time;
	var new_time = last_tick + next_ms;
	for (time=last_tick+refresh_rate; time<new_time; time+=refresh_rate)
	{
		redraw(time);	
	}	
	last_tick = time;
	startButton.click();
}

// start simulation on page load
startButton.click()
var cout = [];
var s_time = 0;
var TIME = 50;
var INTERVAL = 10;
function main() {
	init(x, v);
	for (var i = 0; s_time < TIME; i++) {
		integrate(x, v);
		if (i % INTERVAL) {
			for (var j = 0; j < N; j++) {
				cout.push("" + x[j] + " " + s_time + "\n");
			}
		}
	}
}

