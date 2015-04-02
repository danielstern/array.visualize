(function mapDemo() {
    var data = [2,7,5,8,4,1,9];
    var map = function(n) {
        return n*2;
    };
    var svg = d3.select("#_map")
        .append('svg')
        .attr('height', 300)
        .attr('width', 900);

    var a = illustrateArray(data, svg, {
        speed: 250
    });
    var filteredData = [];
    var b = illustrateArray(filteredData, svg, {
        speed: 250
    })
    a.container.attr('transform', "translate(0,150)");
    b.container.attr('transform', "translate(0,250)");

    var index = 0;
    var h = a.highlight(index);
    h.color('blue');

    // define arrow markers for graph links
    var arrow = svg
        .append('svg:path')
        .attr('d', 'M0,-5L10,0L0,5')
        .attr('fill', '#000')
        .attr('transform', 'translate(30,180),rotate(90),scale(2)')

    function bumpArrow() {
        arrow
            .transition()
            .attr('transform', 'translate(30,190),rotate(90),scale(2)')
            .transition()
            .attr('transform', 'translate(30,180),rotate(90),scale(2)')

    }


    svg.append('text')
        .text('map')
        .attr('y', 75)
        .attr('class', 'sm')

    svg.append('text')
        .text('array.map(function(n){return (n*2)})')
        .attr('y', 105)
        .attr('x', 0)
        .attr('class', 'xsm')

    svg.append('text')
        .text(' * 2 =')
        .attr('y', 195)
        .attr('x', 90)
        .attr('class', 'sm')

    var operator = svg.append('text')
        .text('n')
        .attr('y', 195)
        .attr('x', 60)
        .attr('class', 'sm')
        .style('text-align', 'right')
        .attr('opacity',1)

    var operand = svg.append('text')
        .text('x')
        .attr('y', 195)
        .attr('x', 170)
        .attr('class', 'sm')
        .style('text-align', 'right')
        .attr('opacity',1)

    var rect = svg.append("rect")
        .attr("rx", 6)
        .attr("ry", 6)
        .attr("height", 40)
        .attr("width", 42)
        .attr('opacity', 0)
        .attr("transform", "translate(160,170)")

    function flashRect(color) {
        rect
            .transition()
            .attr('opacity', 0.35)
            .style('fill', color)
            .transition()
            .delay(1600)
            .attr('opacity', 0)
    }

    function updateOperator(number) {
        operator
        .transition()
        .attr('opacity',0)
        .transition()
        .text(number||'n')
        .attr('opacity',1)

    }


    function updateOperand(number) {
        operand
        .transition()
        .attr('opacity',0)
        .transition()
        .text(number||'n')
        .attr('opacity',1)

    }


    var g = setInterval(function checkElement() {

        var d = data[index];
        h.color('blue')
        h.goto(index);
        updateOperator(d);
        updateOperand(' ');

        if (index > data.length - 1) {
            clearInterval(g);
            setTimeout(function() {
                svg.remove();
                mapDemo();
            }, 3000);
            return;
        }

        setTimeout(function() {
            h.color('green');
            b.push(map(d));
            updateOperand(map(d));
            flashRect('green');
            bumpArrow();

            index++;


        }, 1800)

    }, 3600)
})();
