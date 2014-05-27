(function() {
    "use strict";

    var g = d3.select("svg")
	    .append("g")
              .attr("transform", "translate(90,90)");

    var circles = g.selectAll("g")
	    .data([1,2,3,4,5,6])
	    .enter().append("g")
	    .attr("transform" , function(d) { return "translate(" + d * 60 + ",0)"});

    circles.append("circle")
	.attr("r", 30)
	.on("mouseover", function(d) {
	    console.log("Mouse over on: " + d);
	    d3.select(this).style("opacity", 0.6);
	})
	.on("mouseout", function(d) {
	    console.log("Mouse out on: " + d);
	    d3.select(this).style("opacity", 0.5);
	});

    circles.append("text")
	.attr("text-anchor", "middle")
	.attr("dy", "5px")
	.text(function(d) { return d; });
})();
