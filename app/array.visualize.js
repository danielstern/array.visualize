function illustrateArray(data,svg,options){

	options = options || {};
	var speed = options.speed || 500;
	
	var color = d3.scale.category20b();
	
	var container = svg.append('g')
		.attr("transform",function(d,i){return "translate(0,50)"})

	var dataWidths;
	var commaWidth;
	var parensWidth;
	var height;

	function computeWidths(data) {
		var text = container.selectAll('text._text')
			.data(data)
			.enter()
			.append('text')
			.text(function(d,i){return d})

		var commas = container.append('text').text(',')

		var parens=container.append('text').text("[")

		dataWidths = data.map(function(a,i){
			return text[0][i]. getComputedTextLength ();
		})	

		commaWidth = commas[0][0]. getComputedTextLength ();
		parensWidth = parens[0][0]. getComputedTextLength ();

		height = parens[0][0].getBBox().height;

		// debugger;

		text.remove();
		commas.remove();
		parens.remove();

	}


	function update(data) {

		computeWidths(data);

		// DATA JOIN
		var text = container.selectAll('text.text')
			.data(data,function(a){return a});

		var commas = container.selectAll('text.comma')
			.data(data.slice(0,data.length-1));

		var parens = container.selectAll('text.parens')
			.data(['[',']'])

		// UPDATE
		text
			.transition()
			.duration(speed)
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


		// ENTER
		text.enter().append('text')
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

		//EXIT
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
		update:update,
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
