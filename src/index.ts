import * as config from './config';
import * as d3 from 'd3';
// Returns the width of each data element, the width of a comma and the width of a parenthesis based on current CSS applied
function computeWidths(data, container) {

	const text = container.selectAll('text._text')
		.data(data)
		.enter()
		.append('text')
		.text(function(d,i){return d})

	const commas = container.append('text').text(',')

	const parens=container.append('text').text("[")

	const dataWidths = data.map(function(a,i){
		return text.nodes()[i]. getComputedTextLength ();
	});

	const commaWidth = commas.nodes()[0].getComputedTextLength ();
	const parensWidth = parens.nodes()[0].getComputedTextLength ();
	const height = parens.nodes()[0].getBBox().height;

	text.remove();
	commas.remove();
	parens.remove();

	return {
		dataWidths,
		commaWidth,
		parensWidth,
		height
	}

}

function illustrateArray(data,svg,options : any = {}){
	
	const speed = options.speed || 500;
	const adjust = options.adjust || {x: 0, y:50};
	
	const container = svg.append('g')
		.attr("transform",function(){return `translate(${adjust.x},${adjust.y})`});

	console.log("Container?", container);

	function update(data) {

		let z = 0;

		let v = data.map(d => ({
			value: data,
			n: z++
		}))

		const {dataWidths, parensWidth, commaWidth } = computeWidths(data, container);

		// NOTE - SHOULD THE DATA BE GIVEN A KEY HERE???
		// but... no.. that doesn't... it just... it doesn't make any sense...
		const text = container.selectAll('text.text')
			.data(data,function(a, i){return a})
			// .data(data,function(a, i){return a+i})
			// .data(data)
			// .data(data,function(a, i){return {a,i}})
			// .keys(data)
			// .data(data,function(a, i){return {a,i}})
			// .keys(x => z++)

		const commas = container.selectAll('text.comma')
			.data(data.slice(0,data.length-1));

		const parens = container.selectAll('text.parens')
			.data(['[',']'])

		// why does the order here matter... what have we done...

				//
		// UPDATE
		//

		text
		.transition()
		.duration(speed)
		// .text(function(d,i){return d + i})
		// .text(function(d,i){return d.value})
		.text(function(d,i){return d})
		.attr("transform",function(d,i){
			var x = d3.sum(dataWidths.slice(0,i))+parensWidth;
			x+=i*commaWidth;
			return "translate("+x+",0)"
		})

	commas
		.transition()
		.duration(speed)
		.attr("transform",function(d,i){
			var x = d3.sum(dataWidths.slice(0,i+1))+parensWidth;
			x+=i*commaWidth;
			return "translate("+x+",0)"
		})


	parens
		.transition()
		.duration(speed)
		.attr("transform",function(d,i){
			var x = d3.sum(dataWidths)+parensWidth;
			x+=(data.length-1)*commaWidth;
			if (data.length===0) x = parensWidth;
			return "translate("+ (i===0?0:x)+",0)"
		})


		//
		// ENTER
		//

		text.enter()
			.append('text')
			.text(function(d,i){console.log("Enter...", d); return d})
			.attr('class','text')
			.attr("transform",function(d,i){
				var x = d3.sum(dataWidths.slice(0,i))+parensWidth;
				x+=i*commaWidth;
				return "translate("+x+",0)"})
			.attr('opacity',0)
			.attr('y',50)
			.transition()
			.duration(speed)
			.attr('opacity',1)
			.attr('y',0)

		commas.enter().append('text')
			.text(function(d,i){return ",";})
			.attr('class','comma')
			.attr("transform",function(d,i){
				var x = d3.sum(dataWidths.slice(0,i+1))+parensWidth;
				x+=i*commaWidth;
				return "translate("+x+",0)"
			})

		parens
			.enter().append('text')
			.attr('class','parens')
			.attr("transform",function(d,i){
				var x = d3.sum(dataWidths)+parensWidth;
				x+=(data.length-1)*commaWidth;
				if (data.length===0) x = parensWidth;
				return "translate("+ (i===0?0:x)+",0)"
			})
			.text(function(d,i){return d})


	
		text.exit()
			.attr("y",0)
			.transition()
			.duration(speed/2)
			.attr("y",-75)
			.transition()
			.duration(speed/2)
			.attr("opacity",0)
			.remove();

		commas.exit()
			.remove();
	
	}	

	update(data)

	return {
		container:container,
		update,
		push:function(a,index){
			data.splice(index||data.length,0,a);
			update(data);
		},
		splice:function(index,value){
			value ? data.splice(index,1,value) : data.splice(index,1);
			update(data);
		},
		highlight:function(index){

			index = index || 0;

			const {dataWidths, parensWidth, commaWidth, height } = computeWidths(data, container);

			function calculate(){
				targetX = d3.sum(dataWidths.slice(0,index))+parensWidth+index*commaWidth;
				targetY = -height*0.75;
		    	targetWidth = dataWidths[index];
		    	padding = height / 12;
			}

			var targetX = 0;
			var targetY = 0;
			var targetWidth = 0;
			var targetOpacity = 0.35;
			var targetColor = 'red';
			var padding;

			calculate();
			
			var rect = container.append("rect")
			    .attr("rx", 6)
			    .attr("ry", 6)
			    .attr("height", height+padding*2)
			    .attr('opacity',0)
			    .attr("transform","translate("+(targetX-padding)+","+(targetY-padding)+")")


			updateAll();
			
			function updateAll(){
				calculate();

				rect
			    	.transition()
			    	.attr('opacity',targetOpacity)	
			    	.attr("transform","translate("+(targetX-padding)+","+(targetY-padding)+")")
				    .attr("width", targetWidth+padding*2)
				    .style('fill',targetColor)
			}

		    

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
		    	goto:goto,
		    	color:color,
		    	destroy:destroy
		    }

		}
	};
}

declare global {
    interface Window { illustrateArray: any; }
}

window.illustrateArray = illustrateArray;