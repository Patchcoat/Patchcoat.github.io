var canvas = document.getElementById("visualCanvas");
var context = canvas.getContext("2d");

var imagew = canvas.width;
var imageh = canvas.height;

var imagedata = context.createImageData(imagew, imageh);

var maxiterations = 250;

var palette = {p:[], gen:function(time) {
    var roffset = 24;
    var goffset = 16;
    var boffset = (Math.sin(time)+1)*20;
    var color = {r:roffset, g:goffset, b:boffset};
    for (var i = 0; i<256; i++) {
        this.p[i] = color;

        if (i < 64) {
            roffset += (Math.sin(time)+1)*2;
        } else if (i<(Math.sin(time)+1)*127) {
            goffset += (Math.sin(time)+1)*2;
        } else if (i<(Math.sin(time)+1)*191) {
            boffset += (Math.sin(time)+1)*2;
        }
        color = {r:roffset, g:goffset, b:boffset};
    }
}};

var offsetx = -imagew/2;
var offsety = -imageh/2;
var panx = -100;
var pany = 0;
var zoom = 150;

function iterate(x, y, maxiterations) {
    var x0 = (x + offsetx + panx) / zoom;
    var y0 = (y + offsety + pany) / zoom;

    var a = 0;
    var b = 0;
    var rx = 0;
    var ry = 0;

    var iterations = 0;
    while (iterations < maxiterations && (rx * rx + ry * ry <= 4)) {
        rx = a * a - b * b + x0;
        ry = 2 * a * b + y0;

        a = rx;
        b = ry;
        iterations++;
    }

    var color;
    if (iterations == maxiterations) {
        color = {r:0, g:0, b:0};
    } else {
        var index = Math.floor((iterations / (maxiterations-1)) * 255);
        color = palette.p[index];
    }
    

    var pixelindex = (y * imagew + x) * 4;
    imagedata.data[pixelindex] = color.r;
    imagedata.data[pixelindex+1] = color.g;
    imagedata.data[pixelindex+2] = color.b;
    imagedata.data[pixelindex+3] = 255;
}

function generateImage() {
    for (var y = 0; y<imageh; y++) {
        for (var x=0; x<imagew; x++) {
            iterate(x, y, maxiterations);
        }
    }
    context.putImageData(imagedata, 0, 0);
}

var playing = false;

var sng = document.getElementById("song");
sng.onplay = function() {
    playing = true;
};
sng.onpause = function() {
    playing = false;
};

palette.gen(sng.currentTime);
generateImage();

setInterval(function() {
if (playing) {
    palette.gen(sng.currentTime);
    generateImage();
}
if (sng.currentTime > 26.8) {
    zoom = 170+((sng.currentTime-26.8)**1.62808737);
    panx = (sng.currentTime-26.8)**1.46606828-100;
    pany = ((sng.currentTime-26.8)**1.55854153644)*-1;
}
}, 16);
