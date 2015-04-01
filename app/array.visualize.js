
function illustrateArray(data,svg,options){

	// todo
	// - demos
	// docs
	// images

	options = options || {};
	var fontsize = options.fontsize || 14;
	var speed = options.speed || 500;
	
	var color = d3.scale.category20b();
	
	var container = svg.append('g')
		.attr("transform",function(d,i){return "translate(0,50)"})

	var dataWidths;
	var commaWidth;
	var parensWidth;

	function computeWidths(data) {
		var text = container.selectAll('text._avatar')
			.data(data)
			.enter()
			.append('text')
			.text(function(d,i){return d})
			.style('font-size',fontsize);

		var commas = container.append('text').text(',')
			.style('font-size',fontsize);

		var parens=container.append('text')
			.style('font-size',fontsize)
			.text("[")

		dataWidths = data.map(function(a,i){
			return text[0][i]. getComputedTextLength ();
		})	

		commaWidth = commas[0][0]. getComputedTextLength ();
		parensWidth = parens[0][0]. getComputedTextLength ();

		text.remove();
		commas.remove();
		parens.remove();
	}


	function update(data) {

		computeWidths(data);

		// DATA JOIN
		var text = container.selectAll('text.avatar')
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
			.attr("fill",function(a){return color(3)})

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
				return "translate("+ (i===0?0:x)+",0)"
			})


		// ENTER
		text.enter().append('text')
			.text(function(d,i){return d})
			.attr('class','avatar')
			.attr("fill",function(a){return color(0)})
			.attr("transform",function(d,i){
				var x = d3.sum(dataWidths.slice(0,i))+parensWidth;
				x+=i*commaWidth;
				return "translate("+x+",0)"})
			.style('font-size',fontsize)
			.attr('opacity',0)
			.attr('y',50)
			.transition()
			.duration(speed)
			.attr('opacity',1)
			.attr('y',0)

		commas.enter().append('text')
			.text(function(d,i){return ",";})
			.attr('class','comma')
			.attr("fill",function(a){return color(1)})
			.attr("transform",function(d,i){
				var x = d3.sum(dataWidths.slice(0,i+1))+parensWidth;
				x+=i*commaWidth;
				return "translate("+x+",0)"})
			.style('font-size',fontsize);

		parens
			.enter().append('text')
			.attr('class','parens')
			.attr("transform",function(d,i){
				var x = d3.sum(dataWidths)+parensWidth;
				x+=(data.length-1)*commaWidth;
				return "translate("+ (i===0?0:x)+",0)"
			})
			.style('font-size',fontsize)
			.text(function(d,i){return d})
			.attr("fill",function(a){return color(2)})

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
			var padding = 3;
			var rect = container.append("rect")
			    .attr("rx", 6)
			    .attr("ry", 6)
			    .attr("y", -fontsize+padding)
			    .attr("height", fontsize + padding * 2)
			    .attr('opacity',0)


			var targetX = 0;
			var targetY = 0;
			var targetWidth = 0;
			var targetOpacity = 0.35;
			var targetColor = 'red';

			updateAll();
			
			function updateAll(){
				targetX = d3.sum(dataWidths.slice(0,index))+parensWidth+index*commaWidth;
		    	targetWidth = dataWidths[index] + padding * 2;

				rect
			    	.transition()
			    	.attr('opacity',targetOpacity)	
			    	.attr("transform","translate("+(targetX-padding)+",0)")
				    .attr("width", targetWidth)
				    .style('fill',targetColor)
			}

		    

		    function goto(i){
		    	index = i;
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
