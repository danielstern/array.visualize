(function filterDemo(){
	console.log("filter!");
	var data = [1,2,3,4,5,6,7,8];
	var filter = function(n){return n%2===0};
	var svg = d3.select("#_filter")
		.append('svg')
		.attr('height',300)
		.attr('width',900);

	var a = illustrateArray(data,svg,{speed:250});
	var filteredData = [];
	var b = illustrateArray(filteredData,svg,{speed:250})
	a.container.attr('transform',"translate(0,170)");
	b.container.attr('transform',"translate(0,250)");

	var index = 0;
	var h = a.highlight(index);
	h.color('blue')

	svg.append('text')
		.text('array.filter(function evens(n){n % 2 === 0})')
		.attr('y',50)
		.attr('class','sm')


	var g = setInterval(function checkElement(){
		
		var d = data[index];
		h.color('blue')
		h.goto(index);

		setTimeout(function(){
			if (filter(d)) {
				h.color('green');
				b.push(d);
			} else {
				h.color('red');
			}

			index++;

			if (index > data.length) {
				clearInterval(g);
				svg.remove();
				filterDemo();
			}
	},900)

	},1800)
})();