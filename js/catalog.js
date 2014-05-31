(function() {
    "use strict";

    var g = d3.select("svg")
	    .append("g")
              .attr("transform", "translate(90,90)");

    d3.json("/data/sample_courses.json", function(error, courses) {
	var circles = g.selectAll("g")
		.data(courses)
		.enter().append("g")
		.attr("transform", "translate(20,0)");

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

	circles.append("circle")
	    .attr("r", 35)
	    .on("mouseover", circleMouseover)
	    .on("mousemove", circleMousemove)
	    .on("mouseout", circleMouseout);

	circles.append("text")
	    .attr("text-anchor", "middle")
	    .attr("dy", "5px")
	    .text(function(d) { return d.classname; });
    });
})();
