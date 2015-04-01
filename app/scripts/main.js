
var filter = function f(n){
	return n%2===0;
}

function illustrateArray(data,svg,options){

	// todo
	// - map (replace)
	// - styles

	options = options || {};
	var fontsize = options.fontsize || 14;
	
	var color = d3.scale.category20b();
	
	var container = svg.append('g')
		.attr("transform",function(d,i){return "translate(0,200)"})

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
			.data(data);

		var parens = container.selectAll('text.parens')
			.data(['[',']'])

		// UPDATE
		text
			.transition()
			.text(function(d,i){return d})
			.attr("transform",function(d,i){
				var x = d3.sum(dataWidths.slice(0,i))+parensWidth;
				x+=i*commaWidth;
				return "translate("+x+",0)"
			})
			.attr("fill",function(a){return color(3)})

		commas
			.transition()
			.attr("transform",function(d,i){
				var x = d3.sum(dataWidths.slice(0,i+1))+parensWidth;
				x+=i*commaWidth;
				return "translate("+x+",0)"
			})


		parens
			.transition()
			.attr("transform",function(d,i){
				var x = d3.sum(dataWidths)+parensWidth;
				x+=(data.length-1)*commaWidth;
				return "translate("+ (i===0?0:x)+",0)"
			})


		// ENTER
		var newText = text.enter().append('text')
			.text(function(d,i){return d})
			.attr('class','avatar')
			.attr("fill",function(a){return color(0)})
			.attr("transform",function(d,i){
				var x = d3.sum(dataWidths.slice(0,i))+parensWidth;
				x+=i*commaWidth;
				return "translate("+x+",0)"})
			.attr('opacity',0)
			.transition()
			.attr('opacity',1)
			.style('font-size',fontsize);

		var newCommas = commas.enter().append('text')
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

		// ENTER AND UPDATE
		commas
			 .attr("opacity",function(a,i){return i==data.length-1 ? 0 : 1})	

		//EXIT
		text.exit()
			.attr("y",0)
			.transition()
			.attr("y",-75)
			.transition()
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
			    .attr("transform",function(){
			    	var x = d3.sum(dataWidths.slice(0,index))+parensWidth;
						x+=index*commaWidth;
						return "translate("+(x-padding)+",0)"
			    })
			    .attr("y", -fontsize+padding)
			    .attr("width", dataWidths[index] + padding * 2)
			    .attr("height", fontsize + padding * 2)
			    .attr('opacity',0)
			    .style("fill", 'blue')

		    rect
		    	.transition()
		    	.attr('opacity',0.5)

		    function goto(i){
		    	index = i;
			    rect
			    	.transition()
				    .attr("transform",function(){
				    	var x = d3.sum(dataWidths.slice(0,index))+parensWidth;
							x+=index*commaWidth;
							return "translate("+(x-padding)+",0)"
				    })
				    .attr("width", dataWidths[index] + padding * 2)
		    }

		    function color(fill){
			    rect.transition()
				    .style('fill',fill)
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

var data = ['red','blue','green'];
var svg = d3.select("#_filter")
	.append('svg')
	.attr('height',600)
	.attr('width',900);
var a = illustrateArray(data,svg,{fontsize:45});
// var b =  illustrateArray(data.filter(filter),svg);
// b.container.attr("transform",function(d,i){return "translate(65,110)"})

// setTimeout(a.push,1500,'purple');
setTimeout(function(){
	var h = a.highlight();
	setTimeout(function(){
		h.goto(2);
		setTimeout(function(){
			h.color('red');
			var j = a.highlight(1);
			setTimeout(j.destroy,500);
			setTimeout(function(){
				a.splice(2);
				h.goto(1);
				setTimeout(function(){
					a.splice(1,'ochre');
					h.goto(1);
				},1000)
			},1000)
		},500);
	},500);
},500,'purple');


// setTimeout(a.push,3000,'orange',2);
// setTimeout(a.splice,4000,1);
// setTimeout(function(){a.update(['red','pink','orange','purple'])},6000);
// setTimeout(function(){a.update(['red','purple','orange','pink'])},8500);
// setTimeout(function(){a.update(['MM','h','i'])},3000);
