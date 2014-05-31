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

	var node = g.selectAll("circle")
		.data(courses)
		.enter().append("circle")
		.attr("r", 25)
		.call(force.drag);
	force.on("tick", function() {
	    node.attr("cx", function(d) { return d.x; })
		.attr("cy", function(d) { return d.y; });
	});
    });
})();
