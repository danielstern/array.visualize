import { computeWidths } from '../../utility/computeWidths';
import * as d3 from 'd3';

export function Highlight (container, data, index = 0) {

    function redraw(data){

        const { targetX, targetY, targetWidth , padding} = calculateHighlightProperties(data);

        rect
            .transition()
            .attr('opacity',targetOpacity)	
            .attr("transform","translate("+(targetX-padding)+","+(targetY-padding)+")")
            .attr("width", targetWidth+padding*2)
            .style('fill',targetColor)
    }

    function calculateHighlightProperties(data){

        const {dataWidths, parensWidth, commaWidth, height } = computeWidths(data, container);
        let targetX = d3.sum(dataWidths.slice(0,index)) + parensWidth + index * commaWidth;
        let targetY = -height*0.75;
        let targetWidth = dataWidths[index];
        let padding = height / 12;

        return { targetX, targetY, targetWidth, padding }

    }

    const { height } = computeWidths(data, container);

  
    var targetOpacity = 0.35;
    var targetColor = 'red';

    const { targetX, targetY, padding } = calculateHighlightProperties(data);

    let rect = container.append("rect")
        .attr("rx", 6)
        .attr("ry", 6)
        .attr("height", height+padding*2)
        .attr('opacity',0)
        .attr("transform","translate("+(targetX-padding)+","+(targetY-padding)+")")

    redraw(data);
    

    function goto(i){

        index = i;
        if (index > data.length - 1) index = data.length - 1;
        redraw(data);
            
    }

    function update(_data) {
        data = _data;
        redraw(data);
    }

    function color(fill){
        targetColor = fill;
        redraw(data);				   
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
        update,
        updateAll: redraw
    }


}