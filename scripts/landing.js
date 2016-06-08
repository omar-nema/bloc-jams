    
//     var pointsArray = document.getElementsByClassName('point');

    var animatePoints = function(){
        
        var revealPoint = function(){
//            pt.style.opacity = 1;
//            pt.style.transform = "scaleX(1) translateY(0)";
//            pt.style.msTransform = "scaleX(1) translateY(0)";
//            pt.style.WebkitTransform = "scaleX(1) translateY(0)"  
//            pt.style.transform = "rotate(0deg)"
            $(this).css({
               opacity: 1,
               transform: 'scaleX(1) translateY(0)'
            });
         }

//        forEach(points, revealPoint);
        $.each($('.point'), revealPoint);
        
//        for (var i=0; i<points.length; i++){
//           revealPoint(i);
//        }
     };


    $(window).load(function() {
       ///ANY CODE THAT IS DEPENDENT ON A BROWSER LOAD, LIKE TRANSITIONS
        
//        var sellingPoints = document.getElementsByClassName('allpoints')[0]
//        
//        var scrollDistance = sellingPoints.getBoundingClientRect().top - window.innerHeight + 200;
//        console.log(scrollDistance);
        
        var scrollDistance = $('.allpoints').offset().top - $(window).height()+200;
        
        if ($(window).height() > 950){
            animatePoints();
        }
        
//        window.addEventListener('scroll',
            $(window).scroll(function(event){    
//            if (document.documentElement.scrollTop || document.body.scrollTop >= scrollDistance) {
//                animatePoints(pointsArray);
//                };
                if ( $(window).scrollTop() >= scrollDistance){
                    animatePoints();
                }
        });
    });

//not animated when this runs directly?

//pencil works, st.lydia's, wework

$(window).load(function(){});