window.ConvertGradient = function (obj, width, height) {
    this.originObj = obj;
    this.width = width;
    this.height = height;
    this.angle = this.getAngle();
    if (this.angle !== 'none') {
        this.stops = this.processStops();
    }
};
    
window.ConvertGradient.prototype = {
    getAngle : function () {
        var direction = this.originObj.direction,
            degree = direction.match(/^([-*\d]+)[dD]eg$/),
            side = direction.match(/top|left|bottom|right/),
            multipleSides = direction.match(/^(top|left|bottom|right){1}\s(top|left|bottom|right){1}$/),
            angles = {
                'bottom' : 90,
                'top' : 270,
                'left' : 180,
                'right' : 0
            };
        
        if (direction === '') {
            return 270;
        }
        
        if (!degree && !side && !multipleSides) {
            throw new Error('Angle or direction not part of known syntax');
        }
        
        if (multipleSides) {
            throw new Error('Direction is not horizontal or vertical so not supported');
        }
        
        if (degree) {
            return degree[1];
        } else {
            if (typeof angles[side[0]] !== 'undefined') {
                return angles[side[0]];
            }
        }

        return 'none';                    
    },
    processStops : function () {
        var stops = this.originObj.stops,
            lastStop,
            nextStop,
            getStopFloat,
            nullRanges = [],
            nullRange = [],
            stopVal,
            angle = this.angle,
            height = this.height,
            width = this.width,
            a,
            b,
            x,
            y;
            
        getFractionFromPixel = function (val) {
            var vector = height,
                fraction;
            
            if ((angle === 180) || (angle === 0)) {
                // direction is horizontal
                vector = width;
            }
            
            fraction = (1 / vector) * val;
            
            return fraction;
        }
        
        getStopFloat = function (str) {
            var result = str.match(/(\d+)%/);
            
            if (result) {
                return (1 / 100) * parseFloat(result[1]);
            } else {
                result = str.match(/(\d+)px/);
                if (result) {
                    return getFractionFromPixel(parseInt(result[1], 10));
                }
                return false;
            }
        }
        
        for (a = 0, b = stops.length; a < b; a++) {
            if (a === 0) {
                // if position is null, set to 0
                if (!stops[a].position) {
                    stops[a].position = 0;    
                } else {                    
                    stops[a].position = getStopFloat(stops[a].position);
                }
                
            } else if (a === (b - 1)) { // if the last stop
                if (!stops[a].position) {
                    stops[a].position = 1;
                } else {
                    stops[a].position = getStopFloat(stops[a].position);
                }
                
                // if a range of null positions is open, add to it the nullRanges array
                if (nullRange.length) {
                    nullRanges.push(nullRange);
                }
            } else {
                // if a null position, add to the current range
                if (!stops[a].position) {                            
                    nullRange.push(a);
                } else {
                    // close off any populated ranges and add to nullRanges
                    if (nullRange.length) {
                        nullRanges.push(nullRange);
                        nullRange = [];
                    }
                    
                    stops[a].position = getStopFloat(stops[a].position);
                }
            }
        }
        
        // set values of all positions set to null
        for (a = 0, b = nullRanges.length; a < b; a++) {
            for (x = 0, y = nullRanges[a].length; x < y; x++) {
                stopVal = nullRanges[a][x];
                lastStop = stops[stopVal - 1].position;
                nextStop = stops[stopVal + 1].position;
                stops[stopVal].position = (lastStop + nextStop) / 2;
            }
        }
        
        // if the first stop isn't at the start of the gradient, make a new one with its color
        if (stops[0].position !== 0) {
            stops.unshift({
                position : 0,
                color : stops[0].color
            });
        }
        
        // if the last stop isn't at the end of the gradient, make a new one with its color
        if (stops[0].position !== 1) {
            stops.push({
                position : 1,
                color : stops[(stops.length - 1)].color
            });
        }
        
        return stops;
    }
};