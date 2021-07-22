(function drawPush(){
    var data = ['stark','jon'];
    var a = illustrateArray("#_push",data,{fontsize:23,speed:250});

    setTimeout(()=>{

        let z = a.highlight(0);

        setTimeout(()=>{

            a.push("baratheon");
            a.push("jon");
            z.goto(3);
            

            setTimeout(()=>{

                a.push("tyrell",2);

            }, 250)

        }, 250)

    }, 250)

})();