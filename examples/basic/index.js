(function drawPush(){
    var data = ['rickon','jon'];
    var a = illustrateArray("#_push",data,{fontsize:23,speed:250});

    setTimeout(()=>{

        let z = a.highlight(0);

        setTimeout(()=>{

            a.push("stannis");
            a.push("eddard");
            z.goto(1);
            

            setTimeout(()=>{

                a.push("mace",2);

                setTimeout(()=>{

                    a.splice(3);

                    setTimeout(()=>{

                        z.goto(1);
        
                    }, 1000)
    
    
                }, 1000)

            }, 250)

        }, 250)

    }, 250)

})();