processStopsTest = TestCase("processStopsTest");

processStopsTest.prototype.test2PointRange = function() {
    var result;
    
    window.ConvertGradient.prototype.originObj = {
        stops : [
            {
                position : '0%'
            },
            {
                position : '100%'
            }
        ]
    }
    
    result = window.ConvertGradient.prototype.processStops();
    
    assertEquals(0, result[0].position);
    assertEquals(1, result[1].position);
};

processStopsTest.prototype.test3PointRange = function() {
    var result;
    
    window.ConvertGradient.prototype.originObj = {
        stops : [
            {
                position : '0%'
            },
            {
                position : '50%'
            },
            {
                position : '100%'
            }
        ]
    }
    
    result = window.ConvertGradient.prototype.processStops();
    
    assertEquals(0, result[0].position);
    assertEquals(0.5, result[1].position);
    assertEquals(1, result[2].position);
};

processStopsTest.prototype.test4PointRange = function() {
    var result;
    
    window.ConvertGradient.prototype.originObj = {
        stops : [
            {
                position : '0%'
            },
            {
                position : '30%'
            },
            {
                position : '60%'
            },
            {
                position : '100%'
            }
        ]
    }
    
    result = window.ConvertGradient.prototype.processStops();
    
    assertEquals(0, result[0].position);
    assertEquals(0.3, result[1].position);
    assertEquals(0.6, result[2].position);
    assertEquals(1, result[3].position);
};

processStopsTest.prototype.testNullStart = function() {
    var result;
    
    window.ConvertGradient.prototype.originObj = {
        stops : [
            {
                position : null
            },            
            {
                position : '100%'
            }
        ]
    }
    
    result = window.ConvertGradient.prototype.processStops();
    
    assertEquals(0, result[0].position);
    assertEquals(1, result[1].position);
};

processStopsTest.prototype.testNullEnd = function() {
    var result;
    
    window.ConvertGradient.prototype.originObj = {
        stops : [
            {
                position : '0%'
            },            
            {
                position : null
            }
        ]
    }
    
    result = window.ConvertGradient.prototype.processStops();
    
    assertEquals(0, result[0].position);
    assertEquals(1, result[1].position);
};

processStopsTest.prototype.testNullStartEnd = function() {
    var result;
    
    window.ConvertGradient.prototype.originObj = {
        stops : [
            {
                position : null
            },            
            {
                position : null
            }
        ]
    }
    
    result = window.ConvertGradient.prototype.processStops();
    
    assertEquals(0, result[0].position);
    assertEquals(1, result[1].position);
};

processStopsTest.prototype.test3PointNull = function() {
    var result;
    
    window.ConvertGradient.prototype.originObj = {
        stops : [
            {
                position : null
            },            
            {
                position : null
            },
            {
                position : null
            }
        ]
    }
    
    result = window.ConvertGradient.prototype.processStops();
    
    assertEquals(0, result[0].position);
    assertEquals(0.5, result[1].position);
    assertEquals(1, result[2].position);
};

processStopsTest.prototype.test5PointNullMix1 = function() {
    var result;
    
    window.ConvertGradient.prototype.originObj = {
        stops : [
            {
                position : null
            },            
            {
                position : '20%'
            },
            {
                position : null
            },
            {
                position : '90%'
            },
            {
                position : null
            }
        ]
    }
    
    result = window.ConvertGradient.prototype.processStops();
    
    assertEquals(0, result[0].position);
    assertEquals(0.2, result[1].position);
    assertEquals(0.55, result[2].position);
    assertEquals(0.9, result[3].position);
    assertEquals(1, result[4].position);
};

processStopsTest.prototype.test2PointNoStart = function() {
    var result;
    
    window.ConvertGradient.prototype.originObj = {
        stops : [
            {
                position : '30%'
            },            
            {
                position : '100%'
            }
        ]
    }
    
    result = window.ConvertGradient.prototype.processStops();
    
    assertEquals(0, result[0].position);
    assertEquals(0.3, result[1].position);
    assertEquals(1, result[2].position);
};

processStopsTest.prototype.test2PointNoEnd = function() {
    var result;
    
    window.ConvertGradient.prototype.originObj = {
        stops : [
            {
                position : '0%'
            },            
            {
                position : '90%'
            }
        ]
    }
    
    result = window.ConvertGradient.prototype.processStops();
    
    assertEquals(0, result[0].position);
    assertEquals(0.9, result[1].position);
    assertEquals(1, result[2].position);
};

processStopsTest.prototype.test2PointNoStartNoEnd = function() {
    var result;
    
    window.ConvertGradient.prototype.originObj = {
        stops : [
            {
                position : '30%'
            },            
            {
                position : '90%'
            }
        ]
    }
    
    result = window.ConvertGradient.prototype.processStops();
    
    assertEquals(0, result[0].position);
    assertEquals(0.3, result[1].position);
    assertEquals(0.9, result[2].position);
    assertEquals(1, result[3].position);
};

processStopsTest.prototype.test3Point1PixelValue = function() {
    var result;
    
    window.ConvertGradient.prototype.width = 100;
    window.ConvertGradient.prototype.height = 100;
    window.ConvertGradient.prototype.originObj = {
        stops : [
            {
                position : '0%'
            },
            {
                position : '20px'
            },
            {
                position : '100%'
            }
        ]
    }
    
    result = window.ConvertGradient.prototype.processStops();
    
    assertEquals(0, result[0].position);
    assertEquals(0.2, result[1].position);
    assertEquals(1, result[2].position);
};

processStopsTest.prototype.test3Point2PixelValue = function() {
    var result;
    
    window.ConvertGradient.prototype.width = 100;
    window.ConvertGradient.prototype.height = 100;
    window.ConvertGradient.prototype.originObj = {
        stops : [
            {
                position : '0px'
            },
            {
                position : '20%'
            },
            {
                position : '100px'
            }
        ]
    }
    
    result = window.ConvertGradient.prototype.processStops();
    
    assertEquals(0, result[0].position);
    assertEquals(0.2, result[1].position);
    assertEquals(1, result[2].position);
};

processStopsTest.prototype.test3Point2PixelValueNoEnds = function() {
    var result;
    
    window.ConvertGradient.prototype.width = 100;
    window.ConvertGradient.prototype.height = 100;
    window.ConvertGradient.prototype.originObj = {
        stops : [
            {
                position : '20px'
            },
            {
                position : '30%'
            },
            {
                position : '90px'
            }
        ]
    }
    
    result = window.ConvertGradient.prototype.processStops();
    
    assertEquals(0, result[0].position);
    assertEquals(0.2, result[1].position);
    assertEquals(0.3, result[2].position);
    assertEquals(0.9, result[3].position);
    assertEquals(1, result[4].position);
};

processStopsTest.prototype.test5PointNullMix2 = function() {
    var result;
    
    window.ConvertGradient.prototype.width = 100;
    window.ConvertGradient.prototype.height = 100;
    window.ConvertGradient.prototype.originObj = {
        stops : [
            {
                position : '10px'
            },            
            {
                position : '20%'
            },
            {
                position : null
            },
            {
                position : '90px'
            },
            {
                position : null
            }
        ]
    }
    
    result = window.ConvertGradient.prototype.processStops();
    
    assertEquals(0, result[0].position);
    assertEquals(0.1, result[1].position);
    assertEquals(0.2, result[2].position);
    assertEquals(0.55, result[3].position);
    assertEquals(0.9, result[4].position);
    assertEquals(1, result[5].position);
};

processStopsTest.prototype.testCreatedFirstColour = function() {
    var result;

    window.ConvertGradient.prototype.originObj = {
        stops : [
            {
                position : '10%',
                color : '#ffffff'
            },
            {
                position : '60%'
            }
        ]
    }
    
    result = window.ConvertGradient.prototype.processStops();
    
    assertEquals('#ffffff', result[0].color);
};

processStopsTest.prototype.testCreatedLastColour = function() {
    var result;

    window.ConvertGradient.prototype.originObj = {
        stops : [
            {
                position : '10%'
            },
            {
                position : '60%',
                color : '#ffffff'
            }
        ]
    }
    
    result = window.ConvertGradient.prototype.processStops();
    
    assertEquals('#ffffff', result[result.length - 1].color);
};