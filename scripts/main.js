(function (){
    var form = document.getElementById('details'),
        canvasContainer = document.getElementById('canvasContainer'),
        imageContainer = document.getElementById('imageContainer'),
        downloadLink = document.getElementById('download'),
        imageWarpLink = document.getElementById('warpImage'),
        debug = {
            reset : function () {
                var inputs = form.getElementsByTagName('input'),
                    textarea = document.getElementById('css');
                    
                document.getElementById('errors-result').innerHTML = "";
                
                for (a = 0, b = inputs.length; a < b; a++) {
                    if (inputs[a].type !== 'submit') {
                        inputs[a].className = inputs[a].className.replace("errors", "");
                    }
                }
                
                textarea.className = textarea.className.replace('errors', '');
            },
            log : function (str) {
                document.getElementById('errors-result').innerHTML = str;
                document.getElementById(this.source).className += ' errors';
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
        
        debug.reset();
            
        if (linearGradient === null) {
            debug.source = 'css';
            debug.log('Gradient unable to be parsed. Please check the syntax and that the text box contains only the gradient and no other characters');
            return;
        }
        
        if (val === '') {
            debug.source = 'css';
            debug.log('No gradient specified');
            return;
        }
        
        if (height === '') {
            debug.source = 'elementHeight';
            debug.log('No height specified');
            return;
        } else {
            height = parseInt(height, 10);
        }
        
        if (width === '') {
            debug.source = 'elementWidth';
            debug.log('No width specified');
            return;
        } else {
            width = parseInt(width, 10);
        }
        
        try {
            gradientObj = new window.ConvertGradient(linearGradient, width, height);
        }
        catch (e) {
            debug.source = 'css';
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