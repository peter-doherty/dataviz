function barChart() {

    var margin = {top: 20, right: 20, bottom: 30, left: 40},
        width = 400,
        height = 400,
        innerWidth = width - margin.left - margin.right,
        innerHeight = height - margin.top - margin.bottom;

    function chart(selection) {

        selection.each(function (data) {
        // generate chart here; d is the data and this is the element
        
        // Select the svg element, if it exists.
        var svg = d3.select(this).selectAll("svg").data([data]);

        // Otherwise, create the skeletal chart.
        var svgEnter = svg.enter().append("svg");
        var gEnter = svgEnter.append("g");
        gEnter.append("g").attr("class", "x axis");
        gEnter.append("g").attr("class", "y axis");

        // Update the outer dimensions.
        svg.merge(svgEnter).attr("width", width)
            .attr("height", height);

        // Update the inner dimensions.
        var g = svg.merge(svgEnter).select("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var x = d3.scaleBand().rangeRound([0, innerWidth]).padding(0.1),
            y = d3.scaleLinear().rangeRound([innerHeight, 0]);

        x.domain(data.map(function(d) { return d.letter; }));
        y.domain([0, d3.max(data, function(d) { return d.frequency; })]);

        g.select(".x.axis")
            .attr("transform", "translate(0," + innerHeight + ")")
            .call(d3.axisBottom(x));

        g.select(".y.axis")
            .call(d3.axisLeft(y).ticks(10, "%"))
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", "0.71em")
            .attr("text-anchor", "end")
            .text("Frequency");

        var bars = g.selectAll(".bar")
            .data(function (d) { return d; });

        bars.enter().append("rect")
            .attr("class", "bar")    
            .merge(bars)
            .attr("x", function(d) { return x(d.letter); })
            .attr("y", function(d) { return y(d.frequency); })
            .attr("width", x.bandwidth())
            .attr("height", function(d) { return innerHeight - y(d.frequency); });
            });
        
    }
    
    return chart;
};


