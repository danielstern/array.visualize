(function drawPush(){
    var data = ['stark','lannister','targeryen', 'jon', 'jon']
    var svg = d3.select("#_push")
        .append('svg')
        .attr('height',100)
        .attr('width',900);
    var a = illustrateArray(data,svg,{fontsize:23,speed:250});
    setTimeout(function(){
        console.log("Pushin");
        a.push("baratheon");
        
        setTimeout(function(){
            a.push("baratheon");
            a.push("tyrell",2);
            setTimeout(function(){
                svg.remove();
                drawPush();
            },3500)
        },2000)
    },2000);
})();