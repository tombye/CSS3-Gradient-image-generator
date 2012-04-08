(function (){
    var form = document.getElementById('details'),
        canvasContainer = document.getElementById('canvasContainer'),
        imageContainer = document.getElementById('imageContainer'),
        downloadLink = document.getElementById('download'),
        imageWarpLink = document.getElementById('warpImage'),
        debug = {
            log : function (str) {
                console.log(str);    
            }
        },
        gradientObj,
        renderer;
        
    imageWarpLink.style.display = 'none';
    downloadLink.style.display = 'none';
    
    form.onsubmit = function (evt) {
        evt.preventDefault();
        
        var val = document.getElementById('css').value,
            linearGradient = LinearGradient.parse(val),
            height = document.getElementById('elementHeight').value,
            width = document.getElementById('elementWidth').value;
            
        if (linearGradient === null) {
            debug.log('Gradient unable to be parsed. Please check the syntax and that the text box contains only the gradient and no other characters');
            return;
        }
        
        if (val === '') {
            debug.log('No gradient specified');
            return;
        }
        
        if (height === '') {
            debug.log('No height specified');
            return;
        } else {
            height = parseInt(height, 10);
        }
        
        if (width === '') {
            debug.log('No width specified');
            return;
        } else {
            width = parseInt(width, 10);
        }
        
        try {
            gradientObj = new window.ConvertGradient(linearGradient, width, height);
        }
        catch (e) {
            debug.log(e.message);
            return;
        }
        if (document.getElementById('canvas')) {
            document.getElementById('canvasContainer').removeChild(document.getElementById('canvas'));
        }
        renderer = new Gradient2File('canvas', 'canvasContainer', 'imageContainer');
        renderer.createCanvas(width, height);
        renderer.drawCanvasGradient(gradientObj, width, height);
        renderer.embedImageFromCanvas(gradientObj);
        
        imageWarpLink.style.display = 'inline';
        downloadLink.style.display = 'inline-block';
    }
    
    document.getElementById('warpImage').onclick = function () {
        var text = this.innerHTML,
            alt = this.dataset.alt,
            status = this.dataset.status,
            height = document.getElementById('elementHeight').value,
            width = document.getElementById('elementWidth').value,
            img = document.getElementById('imageContainer').getElementsByTagName('img')[0],
            direction = img.dataset.direction;
            
        this.innerHTML = alt;
        this.dataset.alt = text;
        
        if (status === 'actual') {
            this.dataset.status = 'stretched';
            
            img.height = height;
            img.width = width;
        } else {
            this.dataset.status = 'actual';
            
            if (direction === 'vertical') {
                img.height = '1';    
            } else {
                img.width = '1';
            }
        }
        
        return false;
    };
    
    downloadLink.onclick = function () {
        renderer.downloadImageFromCanvas(gradientObj);
        return false;
    };
}());