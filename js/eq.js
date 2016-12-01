$(document).ready(function () {
	var frequencyData = [];

	var svgHeight = '300';
	var svgWidth = '1200';
	var barPadding = '1';

	function createSvg(parent, height, width) {
		return d3
		.select(parent)
		.append('svg')
		.attr('height', height)
		.attr('width', width);
	}

	var svg = createSvg('body', svgHeight, svgWidth);

console.dir(svg)

	// Create our initial D3 chart.
	svg
	.selectAll('rect')
	.data(frequencyData)
	.enter()
	.append('rect')
	.attr('width', svgWidth / frequencyData.length - barPadding);

	function renderChart() {
		svg
		.selectAll('rect')
		.data(frequencyData)
		.enter()
		.append('rect')
		.attr('height', function(d) {
			return d;
		})
		.attr('fill', function(d) {
			return 'rgb(100, 100, ' + d + ')';
		});
	}

	$('#the_btn').click(()=>{
		frequencyData.push(getRandomInt(0,100))
		if (frequencyData.length > 100) frequencyData.pop()
	
		requestAnimationFrame(renderChart);
	})
});

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
}
