// basic demo

var data = ['stark','lannister','targeryen']
var svg = d3.select("#_first")
	.append('svg')
	.attr('height',100)
	.attr('width',900);
var a = illustrateArray(data,svg,{fontsize:45,speed:250});

// push
(function drawPush(){
	var data = ['stark','lannister','targeryen']
	var svg = d3.select("#_push")
		.append('svg')
		.attr('height',100)
		.attr('width',900);
	var a = illustrateArray(data,svg,{fontsize:23,speed:250});
	setTimeout(function(){
		a.push("baratheon");
		setTimeout(function(){
			a.push("tyrell",2);
			setTimeout(function(){
				svg.remove();
				drawPush();
			},3500)
		},2000)
	},2000);
})();


// splice
(function splice(){
	var data = ['stark','lannister','targeryen']
	var svg = d3.select("#_splice")
		.append('svg')
		.attr('height',100)
		.attr('width',900);
	var a = illustrateArray(data,svg,{fontsize:23,speed:250});
	setTimeout(function(){
		a.splice(2);
		setTimeout(function(){
			a.splice(0,"bolton")
			setTimeout(function(){
				svg.remove();
				splice();
			},3500)
		},2000)
	},2000);
})();

// highlight
(function splice(){
	var data = ["robert","stannis","renly"]
	var svg = d3.select("#_highlight")
		.append('svg')
		.attr('height',100)
		.attr('width',900);
	var a = illustrateArray(data,svg,{fontsize:23,speed:250});
	setTimeout(function(){
		a.highlight(0);
		setTimeout(function(){
			a.highlight(2)
			setTimeout(function(){
				svg.remove();
				splice();
			},3500)
		},2000)
	},2000);
})();

// goto
(function goto(){
	var data = ["cersei","tyrion","jaime"]
	var svg = d3.select("#_goto")
		.append('svg')
		.attr('height',100)
		.attr('width',900);
	var a = illustrateArray(data,svg,{fontsize:23,speed:250});
	setTimeout(function(){
		var  n = a.highlight(0);
		setTimeout(function(){
			n.goto(2)
			setTimeout(function(){
				svg.remove();
				goto();
			},3500)
		},2000)
	},2000);
})();

// color
(function goto(){
	var data = ["drogon","rhaegal","viserion"]
	var svg = d3.select("#_color")
		.append('svg')
		.attr('height',100)
		.attr('width',900);
	var a = illustrateArray(data,svg,{fontsize:23,speed:250});
	setTimeout(function(){
		var  n = a.highlight(2);
		n.color('green')
		setTimeout(function(){
			n.goto(1);
			n.color('#dddddd')
			setTimeout(function(){
				n.goto(0);
				n.color('#333333')
				
				setTimeout(function(){
					svg.remove();
					goto();
				},3500)
			},2000)
		},2000)
	},2000);
})();