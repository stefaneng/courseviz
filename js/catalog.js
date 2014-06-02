(function() {
    "use strict";

    var width = 960,
	height = 500;

    var g = d3.select("svg")
	    .attr("width", width)
	    .attr("height", height)
	    .append("g")
              .attr("transform", "translate(90,90)");

    var force = d3.layout.force()
	    .charge(-240)
	    .size([width, height]);

    d3.json("/data/sample_courses.json", function(error, courses) {
	force.nodes(courses)
	    .start();

	var circleMouseover = function(d) {
	    d3.select("body")
		.append("div")
		.attr("class", "tooltip")
		.text(d.description);

	    d3.select(this)
		.transition()
		.style("opacity", 0.7);
	};

	var circleMousemove = function() {
	    d3.select(".tooltip")
		.style("left", (d3.event.pageX + 5) + "px")
		.style("top", (d3.event.pageY - 35) + "px");
	};

	var circleMouseout = function() {
	    d3.select(".tooltip")
		.remove();
	    d3.select(this)
		.transition()
		.style("opacity", 0.5);
	};

	var nodes = g.selectAll("g")
		.data(courses)
		.enter().append("g")
		.call(force.drag);


	nodes.append("circle")
	    .attr("r", 25)
	    .on("mouseover", circleMouseover)
	    .on("mousemove", circleMousemove)
	    .on("mouseout", circleMouseout);

	force.on("tick", function() {
	    nodes.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
	});
    });
})();
