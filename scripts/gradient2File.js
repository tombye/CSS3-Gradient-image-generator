window.Gradient2File = function(canvasId, canvasContainerId, imageContainerId, singleRadioId, imageFormat) {
    this.canvasId = canvasId;
    this.canvasContainerId = canvasContainerId;
    this.imageContainerId = imageContainerId;
    this.singleRadioId = singleRadioId;
    this.imageFormat = (imageFormat !== undefined) ? imageFormat : "image/png";
};
window.Gradient2File.prototype = {    
    createCanvas : function(width, height) {
        var canvasElm = document.createElement('canvas');
        canvasElm.width = width;
        canvasElm.height = height;
        canvasElm.id = this.canvasId;
        
        document.getElementById(this.canvasContainerId).appendChild(canvasElm);
    },
    drawCanvasGradient : function(gradientObj, width, height) {        
        var ctx = document.getElementById(this.canvasId).getContext('2d'),
            stops = gradientObj.stops,
            angleOptions = {
                0 : [width, 0, 0, 0],
                90 : [0, height, 0, 0],
                180 : [0, 0, width, 0],
                270 : [0, 0, 0, height]
            },
            angle = angleOptions[gradientObj.angle];
        
        // store direction
        gradientObj.direction = 'vertical';
        
        if (gradientObj.angle === 0 || gradientObj.angle === 180) {
            gradientObj.direction = 'horizontal';
        }
        
        // Create gradients  
        var lingrad = ctx.createLinearGradient(angle[0], angle[1], angle[2], angle[3]);                  
        
        for (a = 0, b = stops.length; a < b; a++) {
            lingrad.addColorStop(stops[a].position, stops[a].color);
        }
        
        // assign gradients to fill and stroke styles  
        ctx.fillStyle = lingrad;  
          
        // draw shapes  
        ctx.fillRect(0, 0, width, height);        
    },
    getImageDataFromCanvas : function (gradientObj) {
        var sData,
            canvas = document.getElementById(this.canvasId),
            singleRadio = document.getElementById(this.singleRadioId),
            height = canvas.height,
            width = canvas.width;
        
        if (singleRadio.checked) {
            // draw the image on the canvas as a 1 pixel repeater
            this.clearCanvas(width, height);        
        
            // repeaters run in the adjacent direction to the gradient
            if (gradientObj.direction === 'vertical') {
                canvas.width = '1';
                this.drawCanvasGradient(gradientObj, 1, height);
            } else {
                canvas.height = '1';
                this.drawCanvasGradient(gradientObj, width, 1);
            }
        }
                  
        sData = canvas.toDataURL(this.imageFormat);
        
        if (singleRadio.checked) {
            this.clearCanvas(width, height);
            
            // reset dimension set to 1px
            if (gradientObj.direction === 'vertical') {
                canvas.width = width + '';
            } else {
                canvas.height = height + '';
            }
            
        
            // redraw gradient
            this.drawCanvasGradient(gradientObj, width, height);
        }
        
        return sData;
    },
    downloadImageFromCanvas : function (gradientObj) {
        var sData = this.getImageDataFromCanvas(gradientObj);
        
        sData = sData.replace("image/png", "image/octet-stream");
        window.location.href = sData;
    },
    embedImageFromCanvas : function (gradientObj) {
        var imgElm = new Image(),
            sData = this.getImageDataFromCanvas(gradientObj);
            containerElm = document.getElementById(this.imageContainerId);
    
        imgElm.src = sData;
        imgElm.dataset.direction = (gradientObj.direction === 'vertical') ? 'horizontal' : 'vertical';
        
        containerElm.innerHTML = '';
        containerElm.appendChild(imgElm);
    },
    clearCanvas : function (width, height) {
        var ctx = document.getElementById(this.canvasId).getContext('2d');
        
        ctx.clearRect(0,0,width,height);
    }
};