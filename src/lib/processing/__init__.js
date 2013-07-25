var $builtinmodule = function(name)
{
    var mod = {};
    var imList = [];
    var looping = true;

    // We need this to store a reference to the actual processing object which is not created
    // until the run function is called.  Even then the processing object is passed by the
    // processing-js sytem as a parameter to the sketchProc function.  Why not set it to None here
    //

    // See:  http://processingjs.org/reference/

    mod.processing = null
    mod.p = null

    // ProcessingJS constants
    mod.TOP = Sk.builtin.assk$(101, Sk.builtin.nmber.int$);
    mod.BOTTOM = Sk.builtin.assk$(102, Sk.builtin.nmber.int$);
    mod.BASELINE = Sk.builtin.assk$(0, Sk.builtin.nmber.int$);
    mod.RIGHT = Sk.builtin.assk$(39, Sk.builtin.nmber.int$);
    mod.LEFT = Sk.builtin.assk$(37, Sk.builtin.nmber.int$);
    mod.SHAPE = Sk.builtin.assk$(5, Sk.builtin.nmber.int$);
    mod.MODEL = Sk.builtin.assk$(4, Sk.builtin.nmber.int$);
    mod.SCREEN = Sk.builtin.assk$(256, Sk.builtin.nmber.int$);
    mod.IMAGE = Sk.builtin.assk$(2, Sk.builtin.nmber.int$);
    mod.CENTER = Sk.builtin.assk$(3, Sk.builtin.nmber.int$);
    mod.RADIUS = Sk.builtin.assk$(2, Sk.builtin.nmber.int$);
    mod.CORNERS = Sk.builtin.assk$(1, Sk.builtin.nmber.int$);
    mod.CORNER = Sk.builtin.assk$(0, Sk.builtin.nmber.int$);
    mod.POINTS = Sk.builtin.assk$(3, Sk.builtin.nmber.int$);
    mod.LINES = Sk.builtin.assk$(5, Sk.builtin.nmber.int$);
    mod.TRIANGLES = Sk.builtin.assk$(9, Sk.builtin.nmber.int$);
    mod.TRIANGLE_FAN = Sk.builtin.assk$(11, Sk.builtin.nmber.int$);
    mod.TRIANGLE_STRIP = Sk.builtin.assk$(10, Sk.builtin.nmber.int$);
    mod.QUADS = Sk.builtin.assk$(17, Sk.builtin.nmber.int$);
    mod.QUAD_STRIP = Sk.builtin.assk$(18, Sk.builtin.nmber.int$);
    mod.CLOSE = Sk.builtin.assk$(2, Sk.builtin.nmber.int$);
    mod.RGB = Sk.builtin.assk$(1, Sk.builtin.nmber.int$);
    mod.HSB = Sk.builtin.assk$(3, Sk.builtin.nmber.int$);
    mod.CMYK = Sk.builtin.assk$(5, Sk.builtin.nmber.int$);
    mod.MITER = new Sk.builtin.str('miter'); //MITER 8
    mod.BEVEL = new Sk.builtin.str('bevel'); //BEVEL 32
    mod.ROUND = new Sk.builtin.str('round'); //ROUND 2
    mod.SQUARE = new Sk.builtin.str('butt'); //SQUARE 1
    mod.PROJECT = new Sk.builtin.str('square'); //PROJECT 4
    mod.PI = new Sk.builtin.assk$(Math.PI, Sk.builtin.nmber.float$);
    mod.HALF_PI = new Sk.builtin.assk$(Math.PI*0.5, Sk.builtin.nmber.float$);
    mod.QUARTER_PI = new Sk.builtin.assk$(Math.PI*0.25, Sk.builtin.nmber.float$);
    mod.TWO_PI = new Sk.builtin.assk$(Math.PI*2, Sk.builtin.nmber.float$);

// internal utility function (process arguments to functions: sometimes they come through as objects with a v property, sometimes as numbers)
    processArgs = function(a) {
	return Array.prototype.slice.call(a).map(function(d){return typeof(d)=="object" ? d.v : d;});
    }
	
// Calculation

//    mod.abs --> already in python

    mod.ceil = new Sk.builtin.func(function(v) {
        return new Sk.builtin.nmber(
			mod.processing.ceil(v.v), 
			Sk.builtin.nmber.float$);
    });

    mod.constrain = new Sk.builtin.func(function(value, min, max) {
        return new Sk.builtin.nmber(
			mod.processing.constrain(value.v, min.v, max.v), 
			Sk.builtin.nmber.float$);
    });

    mod.dist = new Sk.builtin.func(function(x1, y1, x2, y2) {
	return new Sk.builtin.nmber(
			mod.processing.dist(x1.v, y1.v, x2.v, y2.v), 
			Sk.builtin.nmber.float$);
    });

    mod.exp = new Sk.builtin.func(function(v) {
        return new Sk.builtin.nmber(
			mod.processing.exp(v.v), 
			Sk.builtin.nmber.float$);
    });
 	
    mod.floor = new Sk.builtin.func(function(v) {
        return new Sk.builtin.nmber(
			mod.processing.floor(v.v), 
			Sk.builtin.nmber.float$);
    });

    mod.lerp = new Sk.builtin.func(function(v1, v2, t) {
        return new Sk.builtin.nmber(
			mod.processing.lerp(v1.v, v2.v, t.v), 
			Sk.builtin.nmber.float$);
    });

    mod.log = new Sk.builtin.func(function(v) {
        return new Sk.builtin.nmber(
			mod.processing.log(v.v), 
			Sk.builtin.nmber.float$);
    });

    mod.mag = new Sk.builtin.func(function(a, b) {
	return new Sk.builtin.nmber(
			mod.processing.mag(a.v, b.v), 
			Sk.builtin.nmber.float$);
    });

    mod.map = new Sk.builtin.func(function(v, fromLo, fromHi, toLo, toHi) {
	return new Sk.builtin.nmber(	
			mod.processing.map(v.v, fromLo.v, fromHi.v, toLo.v, toHi.v), 
			Sk.builtin.nmber.float$);
    });

    mod.norm = new Sk.builtin.func(function(v, fromLo, fromHi) {
	return new Sk.builtin.nmber(
			mod.processing.norm(v.v, fromLo.v, fromHi.v), 
			Sk.builtin.nmber.float$);
    });

    mod.pow = new Sk.builtin.func(function(num, exp) {
        return new Sk.builtin.nmber(
			mod.processing.pow(num.v,exp.v), 
			Sk.builtin.nmber.float$);
    });

    mod.round = new Sk.builtin.func(function(v) {
        return new Sk.builtin.nmber(
			mod.processing.round(v.v), 
			Sk.builtin.nmber.int$);
    });

    mod.sq = new Sk.builtin.func(function(v) {
        return new Sk.builtin.nmber(
			mod.processing.sq(v.v), 
			Sk.builtin.nmber.float$);
    });

    mod.sqrt = new Sk.builtin.func(function(v) {
        return new Sk.builtin.nmber(
			mod.processing.sqrt(v.v), 
			Sk.builtin.nmber.float$);
    });

// trigonometry 
//  (no need to wrap these -- just import everything from the math module)

// random
    mod.noise = new Sk.builtin.func(function(v1, v2) {
	var nz = 0.0;
	if( typeof(v2) == "undefined" ) {
		nz = mod.processing.noise(v1.v.toFixed(5));
	}
	else {
		nz = mod.processing.noise(v1.v.toFixed(5), v2.v.toFixed(5)); 
	}
	return new Sk.builtin.nmber( nz, Sk.builtin.nmber.float$ );
    });

    mod.noiseDetail = new Sk.builtin.func(function(octaves,falloff) {
	if( typeof(falloff) == "undefined" ) {
		mod.processing.noiseDetail(octaves.v);
	}
	else {
		mod.processing.noiseDetail(octaves.v,falloff.v);
	}
    });

    mod.noiseSeed = new Sk.builtin.func(function(v) {
	mod.processing.noiseSeed(v.v.toFixed(5));
    });

    mod.random = new Sk.builtin.func(function(low,high) {
	var r = 0.0;
	if( typeof(high) == "undefined" ) {
		r = mod.processing.random(low.v);
	}
	else {
		r = mod.processing.random(low.v, high.v);
	}
	return new Sk.builtin.nmber( r, Sk.builtin.nmber.float$ );
    });

    mod.randomSeed = new Sk.builtin.func(function(v) {
	mod.processing.randomSeed(v.v.toFixed(5));
    });

    // String functions
    mod.nf = new Sk.builtin.func(function(args) {
	if(arguments.length == 2) {
	    var intValue = arguments[0].v,
		digits = arguments[1].v;
	    return new Sk.builtin.str(mod.processing.nf(intValue,digits));
	}
	else if(arguments.length == 3) {
	    var floatValue = arguments[0].v,
		left = arguments[1].v,
		right = arguments[2].v;
	    return new Sk.builtin.str(mod.processing.nf(floatValue,left,right));
	}
	else { console.log("ERROR: wrong number of parameters to function nf()"); }
    });

    mod.nfc = new Sk.builtin.func(function(args) {
	if(arguments.length == 1) {
	    var intValue = arguments[0].v;
	    return new Sk.builtin.str(mod.processing.nfc(intValue));
	}
	else if(arguments.length == 2) {
	    var floatValue = arguments[0].v,
		right = arguments[1].v;
	    return new Sk.builtin.str(mod.processing.nf(floatValue,right));
	}
	else { console.log("ERROR: wrong number of parameters to function nfc()"); }
    });

    mod.nfp = new Sk.builtin.func(function(args) {
	if(arguments.length == 2) {
	    var intValue = arguments[0].v,
		digits = arguments[1].v;
	    return new Sk.builtin.str(mod.processing.nfp(intValue,digits));
	}
	else if(arguments.length == 3) {
	    var floatValue = arguments[0].v,
		left = arguments[1].v,
		right = arguments[2].v;
	    return new Sk.builtin.str(mod.processing.nfp(floatValue,left,right));
	}
	else { console.log("ERROR: wrong number of parameters to function nfp()"); }
    });

    mod.nfs = new Sk.builtin.func(function(args) {
	if(arguments.length == 2) {
	    var intValue = arguments[0].v,
		digits = arguments[1].v;
	    return new Sk.builtin.str(mod.processing.nfs(intValue,digits));
	}
	else if(arguments.length == 3) {
	    var floatValue = arguments[0].v,
		left = arguments[1].v,
		right = arguments[2].v;
	    return new Sk.builtin.str(mod.processing.nfs(floatValue,left,right));
	}
	else { console.log("ERROR: wrong number of parameters to function nfs()"); }
    });

    // Typography
    mod.text = new Sk.builtin.func(function(s, x, y) {
	mod.processing.text(s.v, x.v, y.v);
    });

    mod.loadFont = new Sk.builtin.func(function(font) {
	return mod.processing.loadFont(font.v);
    });

    mod.textFont = new Sk.builtin.func(function(font, size) {
	mod.processing.textFont(font.v, size.v);
    });

    mod.textAlign = new Sk.builtin.func(function(horiz, vert) {
	if(typeof(vert) == "undefined") { mod.processing.textAlign(horiz.v); }
	else { mod.processing.textAlign(horiz.v, vert.v); }
    });

    mod.textSize = new Sk.builtin.func(function(size) {
	mod.processing.textSize(size.v);
    });

    // 2D - Primitives
    mod.line = new Sk.builtin.func(function(x1, y1, x2, y2) {
	mod.processing.line(x1.v, y1.v, x2.v, y2.v);
    });
    
    mod.ellipse = new Sk.builtin.func(function(x,y,r1,r2) {
	mod.processing.ellipse(x.v,y.v,r1.v,r2.v);
    });

    mod.point = new Sk.builtin.func(function(x1,y1) {
        mod.processing.point(x1.v,y1.v)
    });
        
    mod.arc = new Sk.builtin.func(function(x, y, width, height, start, stop) {
        mod.processing.arc(x.v, y.v, width.v, height.v, start.v, stop.v)
    });

    mod.quad = new Sk.builtin.func(function(x1, y1, x2, y2, x3, y3, x4, y4) {
        mod.processing.quad(x1.v, y1.v, x2.v, y2.v, x3.v, y3.v, x4.v, y4.v)
    });
            
    mod.rect = new Sk.builtin.func(function(x, y, width, height, radius) {
        if (typeof(radius) == 'undefined') {
            var rad = 0
        } else {
            var rad = radius.v
        }
	var rx = x.v,
	    ry = y.v,
	    rw = width.v,
	    rh = height.v;
	if (rh < 0)	// handle negative widths and heights gracefully
	{ ry += rh; rh *= -1; }
	if (rw < 0)
	{ rx += rw; rw *= -1; }
	
        mod.processing.rect(rx, ry, rw, rh, rad)
    });
    
    mod.triangle = new Sk.builtin.func(function(x1, y1, x2, y2, x3, y3) {
            mod.processing.triangle(x1.v, y1.v, x2.v, y2.v, x3.v, y3.v)
        });
            

    // Curves
    mod.bezier = new Sk.builtin.func(function(args) {
	if(arguments.length == 8) {
	    var x1 = arguments[0].v, 
		y1 = arguments[1].v, 
		cx1 = arguments[2].v, 
		cy1 = arguments[3].v, 
		cx2 = arguments[4].v, 
		cy2 = arguments[5].v, 
		x2 = arguments[6].v, 
		y2 = arguments[7].v; 
		mod.processing.bezier(x1, y1, cx1, cy1, cx2, cy2, x2, y2);
	}
	else if(arguments.length == 12) {
	    var x1 = arguments[0].v, 
		y1 = arguments[1].v, 
		z1 = arguments[2].v, 
		cx1 = arguments[3].v, 
		cy1 = arguments[4].v, 
		cz1 = arguments[5].v, 
		cx2 = arguments[6].v, 
		cy2 = arguments[7].v, 
		cz2 = arguments[8].v, 
		x2 = arguments[9].v, 
		y2 = arguments[10].v, 
		z2 = arguments[11].v;
		mod.processing.bezier(x1, y1, z1, cx1, cy1, cz1, cx2, cy2, cz2, x2, y2, z2);
	}
	else { console.log("ERROR: wrong number of parameters to function bezier()"); }
    });
	
    mod.bezierDetail = new Sk.builtin.func(function(d) {
        mod.processing.bezierDetail(d.v);
    });

    mod.bezierPoint = new Sk.builtin.func(function(a,b,c,d,t) {
        return new Sk.builtin.nmber( 
		mod.processing.bezierPoint(a.v,b.v,c.v,d.v,t.v), 
		Sk.builtin.nmber.float$ );
    });

    mod.bezierTangent = new Sk.builtin.func(function(a,b,c,d,t) {
        return new Sk.builtin.nmber( 
		mod.processing.bezierTangent(a.v,b.v,c.v,d.v,t.v), 
		Sk.builtin.nmber.float$ );
    });

    mod.curve = new Sk.builtin.func(function(args) {
	if(arguments.length == 8) {
	    var x1 = arguments[0].v, 
		y1 = arguments[1].v, 
		x2 = arguments[2].v, 
		y2 = arguments[3].v, 
		x3 = arguments[4].v, 
		y3 = arguments[5].v, 
		x4 = arguments[6].v, 
		y4 = arguments[7].v; 
		mod.processing.bezier(x1, y1, x2, y2, x3, y3, x4, y4);
	}
	else if(arguments.length == 12) {
	    var x1 = arguments[0].v, 
		y1 = arguments[1].v, 
		z1 = arguments[2].v, 
		x2 = arguments[3].v, 
		y2 = arguments[4].v, 
		z2 = arguments[5].v, 
		x3 = arguments[6].v, 
		y3 = arguments[7].v, 
		z3 = arguments[8].v, 
		x4 = arguments[9].v, 
		y4 = arguments[10].v, 
		z4 = arguments[11].v;
		mod.processing.curve(x1, y1, z1, x2, y2, z2, x3, y3, z3, x4, y4, z4);
	}
	else { console.log("ERROR: wrong number of parameters to function curve()"); }
    });

    mod.curveDetail = new Sk.builtin.func(function(d) {
        mod.processing.curveDetail(d.v);
    });	

    mod.curvePoint = new Sk.builtin.func(function(a,b,c,d,t) {
        return new Sk.builtin.nmber( 
		mod.processing.curvePoint(a.v,b.v,c.v,d.v,t.v), 
		Sk.builtin.nmber.float$ );
    });

    mod.curveTangent = new Sk.builtin.func(function(a,b,c,d,t) {
        return new Sk.builtin.nmber( 
		mod.processing.curveTangent(a.v,b.v,c.v,d.v,t.v), 
		Sk.builtin.nmber.float$ );
    });

    mod.curveTightness = new Sk.builtin.func(function(t) {
        mod.processing.curveTightness(t.v)
    });

    // Vertex
    mod.beginShape = new Sk.builtin.func(function(mode) {
	if( typeof(mode) == 'undefined' )
	{ mod.processing.beginShape() }
	else
	{ mod.processing.beginShape(mode.v) }
    });	

    mod.bezierVertex = new Sk.builtin.func(function(args) {
	if(arguments.length == 6) {
	    var cx1 = arguments[2].v, 
		cy1 = arguments[3].v, 
		cx2 = arguments[4].v, 
		cy2 = arguments[5].v, 
		x2 = arguments[6].v, 
		y2 = arguments[7].v; 
		mod.processing.bezierVertex(cx1, cy1, cx2, cy2, x2, y2);
	}
	else if(arguments.length == 9) {
	    var cx1 = arguments[3].v, 
		cy1 = arguments[4].v, 
		cz1 = arguments[5].v, 
		cx2 = arguments[6].v, 
		cy2 = arguments[7].v, 
		cz2 = arguments[8].v, 
		x2 = arguments[9].v, 
		y2 = arguments[10].v, 
		z2 = arguments[11].v;
		mod.processing.bezierVertex(cx1, cy1, cz1, cx2, cy2, cz2, x2, y2, z2);
	}
	else { console.log("ERROR: wrong number of parameters to function bezierVertex()"); }
    });

    mod.curveVertex = new Sk.builtin.func(function(x,y,z) {
	if(typeof(z) == 'undefined') 
	{ mod.processing.curveVertex(x.v,y.v); }
	else
	{ mod.processing.curveVertex(x.v,y.v,z.v); }
    });

    mod.vertex = new Sk.builtin.func(function(args) {
	if(arguments.length == 2){
	    var x = arguments[0].v,
		y = arguments[1].v;
	    mod.processing.vertex(x,y);
	}
	else if(arguments.length == 3){
	    var x = arguments[0].v,
		y = arguments[1].v,
		z = arguments[2].v;
	    mod.processing.vertex(x,y,z);
	}
	else if(arguments.length == 4){
	    var x = arguments[0].v,
		y = arguments[1].v,
		u = arguments[2].v,
		v = arguments[3].v;
	    mod.processing.vertex(x,y,u,v);
	}
	else if(arguments.length == 5){
	    var x = arguments[0].v,
		y = arguments[1].v,
		z = arguments[2].v,
		u = arguments[3].v,
		v = arguments[4].v;
	    mod.processing.vertex(x,y,z,u,v);
	}
	else { console.log("ERROR: wrong number of parameters to function vertex()"); }
    });
	
    mod.endShape = new Sk.builtin.func(function(mode) {
	if( typeof(mode) == 'undefined' )
	{ console.log("endShape()"); mod.processing.endShape() }
	else
	{ console.log("endShape("+mode.v+")"); mod.processing.endShape(mode.v) }
    });	

    // 3D Primitives

    // todo:  box, sphere, sphereDetail

    // Color
    mod.background = new Sk.builtin.func(function(r,g,b) {

        if (typeof(g) !== 'undefined')
            g = g.v
        if (typeof(b) !== 'undefined')
            b = b.v

        mod.processing.background(r.v,g,b)
        
    });

    mod.fill = new Sk.builtin.func(function(r,g,b,a) {
        // r will be either:
        //      a number in which case the fill will be grayscale
        //      a color object
        // g, and b may be undefined.  If they hold values it will
        // be assumed that we have an r,g,b color tuple
	if (arguments.length == 2)
	{ mod.processing.fill(r.v,g.v); }	// g is assumed to be alpha in this case
	else {
		if (typeof(g) !== 'undefined')
		    g = g.v
		if (typeof(b) !== 'undefined')
		    b = b.v
		if (typeof(a) !== 'undefined')
		    a = a.v
		mod.processing.fill(r.v,g,b,a)
        }
    });


    mod.stroke = new Sk.builtin.func(function(r,g,b,a) {
	if (arguments.length == 2)
	{ mod.processing.stroke(r.v,g.v); }	// g is assumed to be alpha in this case
	else {
		if (typeof(g) !== 'undefined')
		    g = g.v
		if (typeof(b) !== 'undefined')
		    b = b.v
		if (typeof(a) !== 'undefined')
		    a = a.v
		mod.processing.stroke(r.v,g,b,a)
        }
    });

    mod.noStroke = new Sk.builtin.func(function() {
        mod.processing.noStroke()
    });
    

    mod.colorMode = new Sk.builtin.func(function(model, maxV) {
        if (typeof(maxV) === 'undefined')
            maxV = 255
        else
            maxV = maxV.v
        mod.processing.colorMode(model.v, maxV)
    });

    mod.noFill = new Sk.builtin.func(function() {
            mod.processing.noFill()
        });
            

    // Environment

    mod.loop = new Sk.builtin.func(function() {
            if (mod.processing === null) {
                throw new Sk.builtin.Exception("Loop should be called in setup")
            }
            looping = true;
            mod.processing.loop()
        });
            
    mod.noLoop = new Sk.builtin.func(function() {
        if (mod.processing === null) {
            throw new Sk.builtin.Exception("noLoop should be called in setup")
        }
        looping = false;
        mod.processing.noLoop()
    });
    
    mod.frameRate = new Sk.builtin.func(function(fr) {
        mod.processing.frameRate(fr.v)
        
    });

    mod.size = new Sk.builtin.func(function(h,w) {
        mod.processing.size(h.v,w.v)
        
    });

    mod.exitp = new Sk.builtin.func(function(h,w) {
        mod.processing.exit()
    });

    mod.pmouseX = new Sk.builtin.func(function() {
        return Sk.builtin.assk$(mod.processing.pmouseX, Sk.builtin.nmber.int$);
        
    });

    mod.pmouseY = new Sk.builtin.func(function() {
        return Sk.builtin.assk$(mod.processing.pmouseY, Sk.builtin.nmber.int$);
        
    });

    mod.mouseX = new Sk.builtin.func(function() {
        return Sk.builtin.assk$(mod.processing.mouseX, Sk.builtin.nmber.int$);
        
    });

    mod.mouseY = new Sk.builtin.func(function() {
        return Sk.builtin.assk$(mod.processing.mouseY, Sk.builtin.nmber.int$);
        
    });

    // Attributes
    mod.rectMode = new Sk.builtin.func(function(mode) {
        mod.processing.rectMode(mode.v)
    });

    mod.strokeWeight = new Sk.builtin.func(function(wt) {
        mod.processing.strokeWeight(wt.v)
        
    });

    mod.smooth = new Sk.builtin.func(function() {
        mod.processing.smooth()
    });

    mod.noSmooth = new Sk.builtin.func(function() {
        mod.processing.noSmooth()
        });
            
    mod.ellipseMode = new Sk.builtin.func(function(mode) {
        mod.processing.ellipseMode(mode.v)
        });

    mod.strokeCap = new Sk.builtin.func(function(mode) {
        mod.processing.strokeCap(mode.v)
        });

    mod.strokeJoin = new Sk.builtin.func(function(mode) {
        mod.processing.strokeJoin(mode.v)
    });
    


    // Transforms

    mod.rotate = new Sk.builtin.func(function(rads) {
        // rotation in radians
        mod.processing.rotate(rads.v)
        
    });

    mod.scale = new Sk.builtin.func(function(sx, sy, sz) {
        if (typeof(sy) == 'undefined') {
            sy = 1.0
        } else 
            sy = sy.v
        if (typeof(sz) == 'undefined') {
            sz = 1.0
        } else
            sz = sz.v
        mod.processing.scale(sx.v, sy, sz)
    });

    mod.translate = new Sk.builtin.func(function(sx, sy, sz) {
        if (typeof(sy) == 'undefined') {
            sy = 1.0
        } else 
            sy = sy.v
        if (typeof(sz) == 'undefined') {
            sz = 1.0
        } else
            sz = sz.v
        mod.processing.translate(sx.v, sy, sz)
    });

    // todo:  applyMatrix, popMatrix, printMatrix??, pushMatrix, resetMatrix, rotate{X,Y,Z}
    
    mod.pushMatrix = new Sk.builtin.func(function() {
	mod.processing.pushMatrix();
    });

    mod.popMatrix = new Sk.builtin.func(function() {
	mod.processing.popMatrix();
    });

   /* mod.loadStrings = new Sk.builtin.func(function(filename) {
	console.log(filename.v);
	console.log(mod.processing.loadStrings(filename.v));
	console.log(new Sk.builtin.tuple(mod.processing.loadStrings(filename.v)));

	return new Sk.builtin.list(mod.processing.loadStrings(filename.v));
    });*/

    //  //////////////////////////////////////////////////////////////////////
    //  Run
    // 
    //  Create the processing context and setup of calls to setup, draw etc.
    //
    //
    //  //////////////////////////////////////////////////////////////////////    
    mod.run = new Sk.builtin.func(function() {
        function sketchProc(processing) {
            mod.processing = processing

             //processing.setup = function() {
                //if (Sk.globals['setup'] ) {
                //     Sk.misceval.callsim(Sk.globals['setup'])
		//}
             //}

            
            processing.draw = function() {
                // if there are pending image loads then just use the natural looping calls to 
                // retry until all the images are loaded.  If noLoop was called in setup then make
                // sure to revert to that after all the images in hand.
                var wait = false
                for (var i in imList) {
                    if (imList[i].width == 0) {
                        wait = true
                    }
                }
                if (wait == true) {
                    if (looping == true) 
                        return
                    else {
                        processing.loop()
                        return
                    }

                } else {
                    if (looping == false)
                        processing.noLoop()
                }

                mod.frameCount = processing.frameCount;
		if (Sk.globals['draw'])
                    Sk.misceval.callsim(Sk.globals['draw'])
            }
            
            var callBacks = ['setup', 'mouseMoved','mouseClicked', 'mouseDragged', 'mouseMoved', 'mouseOut',
             'mouseOver', 'mousePressed', 'mouseReleased', 'keyPressed', 'keyReleased', 'keyTyped'
             ];

             for(var cb in callBacks) {
                if (Sk.globals[callBacks[cb]]) {
                    //console.log('defining ' + callBacks[cb])                    
                    processing[callBacks[cb]] = new Function("Sk.misceval.callsim(Sk.globals['"+callBacks[cb]+"']);")
                }
            }
        }
        
        var canvas = document.getElementById(Sk.canvas)
        $(canvas).show()
        mod.p = new Processing(canvas, sketchProc)

        
    });

    var mouseClass = function($gbl, $loc) {

        $loc.__getattr__ = new Sk.builtin.func(function(self,key) {
            if (key == 'x') 
                return mod.processing.mouseX;
            else if (key == 'y') 
                return mod.processing.mouseY;
            else if (key == 'px')
                return mod.processing.pmouseX;
            else if (key == 'py')
                return mod.processing.pmouseY;
            else if (key == 'pressed')
                return mod.processing.__mousePressed;
            else if (key == 'button')
                return mod.processing.mouseButton
        });


    }


    mod.Mouse = Sk.misceval.buildClass(mod, mouseClass, 'Mouse', []);

    mod.mouse = Sk.misceval.callsim(mod.Mouse)

    var keyboardClass = function($gbl, $loc) {

        $loc.__getattr__ = new Sk.builtin.func(function(self,key) {
            if (key == 'key') {
                return new Sk.builtin.str(mod.processing.key)
            }
            else if (key == 'keyCode') 
                return mod.processing.keyCode
            else if (key == 'keyPressed')
                return new Sk.builtin.str(mod.processing.__keyPressed) // todo bool
        });


    }

    mod.Keyboard = Sk.misceval.buildClass(mod,keyboardClass,'Keyboard', [])

    mod.keyboard = Sk.misceval.callsim(mod.Keyboard)



    var environmentClass = function($gbl, $loc) {

        $loc.__getattr__ = new Sk.builtin.func(function(self,key) {
            if (key == 'frameCount') 
                return mod.processing.frameCount
            else if (key == 'frameRate') {
                return mod.processing.__frameRate;}
            else if (key == 'height')
                return mod.processing.height
            else if (key == 'width')
                return mod.processing.width
            else if (key == 'online')
                return mod.processing.online
            else if (key == 'focused')
                return mod.processing.focused
        });


    }

    mod.Environment = Sk.misceval.buildClass(mod,environmentClass,'Environment', [])

    mod.environment = Sk.misceval.callsim(mod.Environment)

    var screenClass = function($gbl, $loc) {

        $loc.__init__ = new Sk.builtin.func(function(self) {
            self.pixels = null;
        });

        $loc.__getattr__ = new Sk.builtin.func(function(self,key) {
            if (key == 'height')
                return mod.processing.height
            else if (key == 'width')
                return mod.processing.width
            else if (key == 'pixels')
                if (self.pixels == null) {
                    self.pixels = new Sk.builtin.list(mod.processing.pixels.toArray())
                }
                return self.pixels
        });

    }

    mod.Screen = Sk.misceval.buildClass(mod,screenClass,'Screen', [])

    mod.screen = Sk.misceval.callsim(mod.Screen)

    mod.loadPixels = new Sk.builtin.func(function() {
        mod.processing.loadPixels()
        console.log(mod.processing.pixels)
    });

    //mod.pixels = new Sk.builtin.list(mod.processing.pixels); 

    var colorClass = function($gbl, $loc) {
        $loc.__init__ = new Sk.builtin.func(function(self, val1, val2, val3, alpha) {
            if (typeof(val2) !== 'undefined')
                val2 = val2.v
            if (typeof(val3) !== 'undefined')
                val3 = val3.v
            if (typeof(alpha) !== 'undefined')
                alpha = alpha.v
	    self.v = mod.processing.color(val1.v, val2, val3, alpha)
        })
    
    }

    mod.color = Sk.misceval.buildClass(mod,colorClass,'color', [])

    mod.red = new Sk.builtin.func(function(clr) {
        return Sk.builtin.assk$(mod.processing.red(clr.v), Sk.builtin.nmber.int$);
    });
    
    mod.green = new Sk.builtin.func(function(clr) {
        return Sk.builtin.assk$(mod.processing.green(clr.v), Sk.builtin.nmber.int$);
    });

    mod.blue = new Sk.builtin.func(function(clr) {
        return Sk.builtin.assk$(mod.processing.blue(clr.v), Sk.builtin.nmber.int$);
    });

    mod.alpha = new Sk.builtin.func(function(clr) {
        return Sk.builtin.assk$(mod.processing.alpha(clr.v), Sk.builtin.nmber.int$);
    });

    // PVector class and functions
    //
 /*   var pvectorClass = function($gbl, $loc) {
	 $loc.__init__ = new Sk.builtin.func(function(self,x,y,z) {
          //  self.v = pv
            self.x = Sk.builtin.assk$(x, Sk.builtin.nmber.float$);
            self.y = Sk.builtin.assk$(y, Sk.builtin.nmber.float$);
	    self.z = Sk.builtin.assk$(z, Sk.builtin.nmber.float$);
        })

        $loc.__getattr__ = new Sk.builtin.func(function(self,key) {
            if (key == 'x') return new Sk.builtin.nmber(self.x, Sk.builtin.nmber.float$);
            if (key == 'y') return new Sk.builtin.nmber(self.y, Sk.builtin.nmber.float$);
	    if (key == 'z') return new Sk.builtin.nmber(self.z, Sk.builtin.nmber.float$);
        });
	
	$loc.__setattr__ = new Sk.builtin.func(function(self,key,value) {
            if (key == 'x') self.x = value.v;
            if (key == 'y') self.y = value.v;
	    if (key == 'z') self.z = value.v;
        });
	
	$gbl.bork = new Sk.builtin.func(function(self) {
	    console.log("yuck"); //return new Sk.builtin.nmber( 42.0, Sk.builtin.nmber.float$);
	});

/*	$loc.__str__ = new Sk.builtin.func(function(self) {
	    return ("[ "+self.x+", "+self.y+", "+self.z+" ]");
	});
	
	$loc.get = new Sk.builtin.func(function(self) {
	    return Sk.misceval.callsim($loc.__init__, self, self.x, self.y, self.z);
	});

	$loc.mag = new Sk.builtin.func(function(self) {
	    console.log(Math.sqrt(Math.pow(self.x,2) + Math.pow(self.y,2) + Math.pow(self.z,2)));
	    return new Sk.builtin.nmber(
			Math.sqrt(Math.pow(self.x,2) + Math.pow(self.y,2) + Math.pow(self.z,2)),
			Sk.builtin.nmber.float$);
	});
    }

    mod.PVector = Sk.misceval.buildClass(mod,pvectorClass,'PVector',[]);
*/
/*    mod.PVector.prototype.mag = function() {
	return new Sk.builtin.nmber(
			Math.sqrt(Math.pow(self.x,2) + Math.pow(self.y,2) + Math.pow(self.z,2)),
			Sk.builtin.nmber.float$);
    };
  */  

    // Image class and functions
    //
    var imageClass = function($gbl, $loc) {
        /* images are loaded async.. so its best to preload them */
        $loc.__init__ = new Sk.builtin.func(function(self,im) {
            self.v = im
            self.width = Sk.builtin.assk$(im.width, Sk.builtin.nmber.int$);
            self.height = Sk.builtin.assk$(im.height, Sk.builtin.nmber.int$);
        })

        $loc.__getattr__ = new Sk.builtin.func(function(self,key) {
            if (key == 'width') return self.v.width;
            if (key == 'height') return self.v.height;
        });
    
    }

    mod.PImage = Sk.misceval.buildClass(mod,imageClass,'PImage', []);

    mod.createImage = new Sk.builtin.func(function(w,h,mode) {
        var i = mod.processing.createImage(w.v,h.v,mode.v);
        imList.push(i);
        return Sk.misceval.callsim(mod.PImage,i);
    });

    mod.loadImage = new Sk.builtin.func(function(imfile) {
        var i = mod.processing.loadImage(imfile.v);
        imList.push(i);
        return Sk.misceval.callsim(mod.PImage,i);
    });
    
    mod.imageMode = new Sk.builtin.func(function(mode) {
	mod.processing.imageMode(mode.v);
    });

    mod.image = new Sk.builtin.func(function(im,x,y) {
        if (im.v.width > 0)
            mod.processing.image(im.v,x.v,y.v,im.v.width,im.v.height)
    });

    mod.save = new Sk.builtin.func(function(filename) {
	mod.processing.save(filename.v);
    });

    mod.saveFrame = new Sk.builtin.func(function(filename) {
	mod.processing.saveFrame(filename.v);
    });

    mod.get = new Sk.builtin.func(function(x,y) {
        var clr = mod.processing.get(x.v,y.v)
        return Sk.misceval.callsim(mod.color,
            Sk.builtin.assk$(mod.processing.red(clr), Sk.builtin.nmber.int$),
            Sk.builtin.assk$(mod.processing.green(clr), Sk.builtin.nmber.int$),
            Sk.builtin.assk$(mod.processing.blue(clr), Sk.builtin.nmber.int$));
    });

    mod.set = new Sk.builtin.func(function(x, y, color) {
        mod.processing.set(x.v, y.v, color.v)
    });
    
// todo  -- add a color class for creating color objects.


    return mod;
}
