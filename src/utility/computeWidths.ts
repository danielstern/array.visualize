
export interface SizeComputation {
    commaWidth: number;
    parensWidth: number;
    height: number;
    dataWidths: number[];
	totalWidth: number;
}
/** 
 * Returns the width and height of text and decorations
 * @data the collection of data
 * @container 
 * */ 
 export function computeWidths   (data : string[], container)  : SizeComputation {

	const text = container.selectAll('text._text')
		.data(data)
		.enter()
		.append('text')
		.text(function(d,i){return d})

	const commas = container.append('text').text(',')

	const parens=container.append('text').text("[")

	const dataWidths = data.map(function(a,i){
		return text.nodes()[i]. getComputedTextLength ();
	});

	const commaWidth = commas.nodes()[0].getComputedTextLength ();
	const parensWidth = parens.nodes()[0].getComputedTextLength ();
	const height = parens.nodes()[0].getBBox().height;
	const totalWidth =
		commas.nodes().reduce((a,b) => a + b.getComputedTextLength(), 0)
		+ text.nodes().reduce((a,b) => a + b.getComputedTextLength(), 0)

	text.remove();
	commas.remove();
	parens.remove();

	return {
		dataWidths,
		commaWidth,
		parensWidth,
		totalWidth,
		height
	}
 }