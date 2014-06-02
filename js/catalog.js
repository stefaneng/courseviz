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
	    .linkDistance(100)
	    .size([width, height]);

    var linkData = [{source:0, target:1}];

    d3.json("/data/sample_courses.json", function(error, courses) {
	force.nodes(courses)
	    .links(linkData)
	    .start();

	var edges = g.selectAll(".line")
		.data(linkData).enter()
		.append("line")
		.attr("class", "link");

	var circleMouseover = function(d) {
	    d3.select("body")
		.append("div")
		.attr("class", "tooltip")
		.text(d.description);
	};

	var circleMousemove = function() {
	    d3.select(".tooltip")
		.style("left", (d3.event.pageX + 5) + "px")
		.style("top", (d3.event.pageY - 35) + "px");
	};

	var circleMouseout = function() {
	    d3.select(".tooltip")
		.remove();
	};

	var nodes = g.selectAll("g")
		.data(courses)
		.enter().append("g")
		.call(force.drag);

	nodes.append("circle")
	    .attr("r", 30)
	    .on("mouseover", circleMouseover)
	    .on("mousemove", circleMousemove)
	    .on("mouseout", circleMouseout)
	    .on("mouseup", circleMouseout);

	nodes.append("text")
	    .attr("text-anchor", "middle")
	    .attr("dy", "5px")
	    .text(function(d) { return d.classname; });

	force.on("tick", function() {
	    nodes.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

	    edges.attr("x1", function(d) { return d.source.x; })
		.attr("y1", function(d) { return d.source.y; })
		.attr("x2", function(d) { return d.target.x; })
		.attr("y2", function(d) { return d.target.y; });
	});
    });
})();
