import * as d3 from 'd3';

import { computeWidths, SizeComputation } from './utility/computeWidths';
import { Highlight } from './extensions/highlight';

function updateElements(text, commas, parens, speed : number, adjust, computed : SizeComputation, data) {

	const { dataWidths, parensWidth, commaWidth} = computed;

	text
		.transition()
		.duration(speed)
		.text(d => d)
		.attr("transform",function(_d,i){
			var x = d3.sum(dataWidths.slice(0,i))+parensWidth;
			x+=i*commaWidth;
			return "translate("+x+",0)"
		})

	text.enter()
		.append('text')
		.text(function(d,i){return d})
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
		.attr('y',0);

	text.exit()
		.attr("y",0)
		.transition()
		.duration(speed/2)
		.attr("y",-75)
		.transition()
		.duration(speed/2)
		.attr("opacity",0)
		.remove();

	commas
		.transition()
		.duration(speed)
		.attr("transform",function(d,i){
			let x = d3.sum(dataWidths.slice(0,i+1)) + parensWidth + i * commaWidth;
			return `translate(${x},0)`
		})

	commas.enter().append('text')
		.text(function(d,i){return ",";})
		.attr('class','comma')
		.attr("transform",function(d,i){
			var x = d3.sum(dataWidths.slice(0,i+1))+parensWidth;
			x+=i*commaWidth;
			return "translate("+x+",0)"
		});
	
	commas.exit()
		.remove();


	parens
		.transition()
		.duration(speed)
		.attr("transform",function(d,i){
			var x = d3.sum(dataWidths)+parensWidth;
			x+=(data.length-1)*commaWidth;
			if (data.length===0) x = parensWidth;
			return "translate("+ (i===0?0:x)+",0)"
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

}

function illustrateArray(selector, data, options : any = {}){

	var svg = d3.select(selector)
		.append('svg')
		.attr('height', '100px')
		.attr('width', '100%');
	
	const speed = options.speed || 500;
	const adjust = options.adjust || {x: 0, y:50};
	const center = options.center || true;
	
	const container = svg.append('g')
		.attr("id","___n")
		.attr("transform",()=>`translate(${adjust.x},${adjust.y})`);

	let hs = [];
	function update(data : string[]) {

		const computed = computeWidths(data, container);

		const text = container.selectAll('text.text')
			.data(data);

		const commas = container.selectAll('text.comma')
			.data(data.slice(0,data.length-1));

		const parens = container.selectAll('text.parens')
			.data(['[',']'])

	    updateElements(text, commas, parens, options.speed, options.adjust, computed, data);

		for (let h of hs) {

			h.update(data);

		}

		if (center) {
			const div = document.querySelector(selector);
			const width = div.offsetWidth;

			container
				.attr("transform", () => `translate(${adjust.x + ((width - computed.totalWidth) / 2)},${adjust.y})`);


			window.addEventListener('resize', () => {
				const div = document.querySelector(selector)
				const width = div.offsetWidth
				container.attr("transform", () => `translate(${adjust.x + ((width - computed.totalWidth) / 2)},${adjust.y})`)
			});
		}
	
	}	


	let shouldUpdate = true;

	setInterval(()=>{
		if (shouldUpdate) {

			shouldUpdate = false;
			update(data);

		}
	});



	return {
		container,
		update,
		push(a : string, index : number = data.length) {

			// y tho
			data.splice(index,0,a);
			shouldUpdate = true;

		},
		// used to remove data...
		splice( index : number, value : string ){

			value !== undefined ? data.splice(index,1,value) : data.splice(index,1);
			update(data);

		},
		highlight(index){

			const h = new Highlight(container, data, index);
			hs.push(h);
			return h;

		}

	};

}

declare global {
    interface Window { illustrateArray: any; }
}

window.illustrateArray = illustrateArray;