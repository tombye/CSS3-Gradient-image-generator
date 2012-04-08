getAngleTest = TestCase("getAngleTest");

getAngleTest.prototype.testBlank = function() {
    window.ConvertGradient.prototype.originObj = {
        direction : '' // top
    }
    
    assertEquals(270, window.ConvertGradient.prototype.getAngle());
};

/* Testing all single word natural language types */

getAngleTest.prototype.testTop = function() {
    window.ConvertGradient.prototype.originObj = {
        direction : 'top'
    }
    
    assertEquals(270, window.ConvertGradient.prototype.getAngle());
};

getAngleTest.prototype.testBottom = function() {
    window.ConvertGradient.prototype.originObj = {
        direction : 'bottom'
    }
    
    assertEquals(90, window.ConvertGradient.prototype.getAngle());
};

getAngleTest.prototype.testLeft = function() {
    window.ConvertGradient.prototype.originObj = {
        direction : 'left'
    }
    
    assertEquals(180, window.ConvertGradient.prototype.getAngle());
};

getAngleTest.prototype.testRight = function() {
    window.ConvertGradient.prototype.originObj = {
        direction : 'right'
    }
    
    assertEquals(0, window.ConvertGradient.prototype.getAngle());
};

/* Testing the ways to define an exact angle */

getAngleTest.prototype.test90DegLowerCase = function() {
    window.ConvertGradient.prototype.originObj = {
        direction : '90deg'
    }
    
    assertEquals(90, window.ConvertGradient.prototype.getAngle());
};

getAngleTest.prototype.test90DegUpperCase = function() {
    window.ConvertGradient.prototype.originObj = {
        direction : '90Deg'
    }
    
    assertEquals(90, window.ConvertGradient.prototype.getAngle());
};

/* Testing natural language angles with 2 words */

getAngleTest.prototype.testDoubleWord1 = function() {
    var func;
    
    window.ConvertGradient.prototype.originObj = {
        direction : 'top right'
    }
    
    func = function () {
        window.ConvertGradient.prototype.getAngle();
    }
    
    assertException('Direction is not horizontal or vertical so not supported', func, '');    
};

getAngleTest.prototype.testDoubleWord2 = function() {
    var func;
    
    window.ConvertGradient.prototype.originObj = {
        direction : 'top left'
    }
        
    func = function () {
        window.ConvertGradient.prototype.getAngle();
    }
    
    assertException('Direction is not horizontal or vertical so not supported', func, '');    
};

getAngleTest.prototype.testDoubleWord3 = function() {
    var func;
    
    window.ConvertGradient.prototype.originObj = {
        direction : 'bottom right'
    }
        
    func = function () {
        window.ConvertGradient.prototype.getAngle();
    }
    
    assertException('Direction is not horizontal or vertical so not supported', func, '');    
};

getAngleTest.prototype.testDoubleWord4 = function() {
    var func;
    
    window.ConvertGradient.prototype.originObj = {
        direction : 'bottom left'
    }
        
    func = function () {
        window.ConvertGradient.prototype.getAngle();
    }
    
    assertException('Direction is not horizontal or vertical so not supported', func, '');    
};

getAngleTest.prototype.testBadSyntax1 = function() {
    var func;
    
    window.ConvertGradient.prototype.originObj = {
        direction : '180 degrees'
    }
            
    func = function () {
        window.ConvertGradient.prototype.getAngle();
    }
    
    assertException('Angle or direction not part of known syntax', func, '');
};