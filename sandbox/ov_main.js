var fs = require('fs');

// length of track , in meters
var L = 220;

// number of vehicles
var N = 22;

var density = L/N;

// Sensitivity
var a = 2.0;

// Time steps
var dt = 0.05

function tanh(value) {
        var y = Math.exp(2 * value);
        return (y - 1) / (y + 1);	
}

function V(dx) {
        return (16.8*tanh(.086 * (dx -25) + 0.913) + (17));
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
}

// initialize vehicle positions and velocities
var data = []
var x = []
var v = []
var fx = []
var fv = []

init(x, v);

var cout = [];
var s_time = 0;
var TIME = 660;
var INTERVAL = 10;
var sizeOfNumber = 8;
var numberOfWrites = (N + 1) * TIME / dt / INTERVAL;
var sizeOfBuffer = numberOfWrites * sizeOfNumber;
function main() {
        init(x, v);
        var buffer = '';
        var offset = 0;
        for (var i = 0; s_time < TIME; i++) {
                integrate(x, v);
                if (i % INTERVAL == 0) {
                        buffer += s_time + ',';
                        for (var j = 0; j < N - 1; j++) {
                                buffer += x[j] + ',';
                        }
                        buffer += x[N-1] + '\n';
                }
        }
        var b = new Buffer(buffer);
        fs.open("data/results_20_5.csv",'w', function(err, fd) {
                fs.write(fd, b, 0, b.length, null, function(err) {
                        if (err) console.log("error writing file sorry");

                });
                fs.close(fd, function() {
                        console.log('finished writing');
                });
        });
}

main()
