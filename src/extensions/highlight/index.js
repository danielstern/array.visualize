import { computeWidths } from '../../utility/computeWidths';

export function Highlight (container, data, index = 0) {

    function updateAll(){

        const { targetX, targetY, targetWidth , padding} = calculateHighlightProperties();

        rect
            .transition()
            .attr('opacity',targetOpacity)	
            .attr("transform","translate("+(targetX-padding)+","+(targetY-padding)+")")
            .attr("width", targetWidth+padding*2)
            .style('fill',targetColor)
    }

    const {dataWidths, parensWidth, commaWidth, height } = computeWidths(data, container);

    function calculateHighlightProperties(){
        let targetX = d3.sum(dataWidths.slice(0,index)) + parensWidth + index * commaWidth;
        let targetY = -height*0.75;
        let targetWidth = dataWidths[index];
        let padding = height / 12;

        return { targetX, targetY, targetWidth, padding }
    }

    var targetOpacity = 0.35;
    var targetColor = 'red';

    const { targetX, targetY, padding} = calculateHighlightProperties();

    var rect = container.append("rect")
        .attr("rx", 6)
        .attr("ry", 6)
        .attr("height", height+padding*2)
        .attr('opacity',0)
        .attr("transform","translate("+(targetX-padding)+","+(targetY-padding)+")")

    updateAll();
    

    // fiendish...
    function goto(i){

        index = i;
        if (index > data.length - 1) index = data.length - 1;
        updateAll();
            
    }

    function color(fill){
        targetColor = fill;
        updateAll();				   
    }

    function destroy(){
        rect.transition()
            .attr("opacity",0)
            .remove()
    }

    return {
        goto,
        color,
        destroy,
        updateAll
    }


}