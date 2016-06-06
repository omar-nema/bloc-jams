    
     var pointsArray = document.getElementsByClassName('point');

    var animatePoints = function(points){
        
        var revealPoint = function(pt){
            pt.style.opacity = 1;
            pt.style.transform = "scaleX(1) translateY(0)";
            pt.style.msTransform = "scaleX(1) translateY(0)";
            pt.style.WebkitTransform = "scaleX(1) translateY(0)"  
            pt.style.transform = "rotate(0deg)"
         }

        forEach(points, revealPoint);
        
//        for (var i=0; i<points.length; i++){
//           revealPoint(i);
//        }
     };


    window.onload = function() {
       ///ANY CODE THAT IS DEPENDENT ON A BROWSER LOAD, LIKE TRANSITIONS
        
        var sellingPoints = document.getElementsByClassName('allpoints')[0]
        
        var scrollDistance = sellingPoints.getBoundingClientRect().top - window.innerHeight + 200;
        console.log(scrollDistance);
        
        if (window.innerHeight > 950){
            animatePoints(pointsArray);
        }
        
        window.addEventListener('scroll', function(event){
            console.log(event);
            console.log(window.innerHeight);
            console.log(sellingPoints.getBoundingClientRect().top);
            
            if (document.documentElement.scrollTop || document.body.scrollTop >= scrollDistance) {
                animatePoints(pointsArray);
                };
        });
    }

//not animated when this runs directly?

//pencil works, st.lydia's, wework