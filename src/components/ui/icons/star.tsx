import React from 'react';

type iconProps = {
	fill?: string,
	secondaryfill?: string,
	strokewidth?: number,
	width?: string,
	height?: string,
	title?: string
}

function Star3(props: iconProps) {
	const fill = props.fill || 'currentColor';
	const secondaryfill = props.secondaryfill || fill;
	const strokewidth = props.strokewidth || 1;
	const width = props.width || '1em';
	const height = props.height || '1em';
	const title = props.title || "star 3";

	return (
		<svg height={height} width={width} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
	<title>{title}</title>
	<g fill={fill}>
		<path d="M31.947,12.294a1.066,1.066,0,0,0-.86-.727l-9.764-1.419L16.957,1.3a1.111,1.111,0,0,0-1.914,0l-4.366,8.846L.913,11.567a1.067,1.067,0,0,0-.591,1.82l7.066,6.886L5.721,30a1.066,1.066,0,0,0,1.547,1.124L16,26.531l8.733,4.591A1.066,1.066,0,0,0,26.28,30l-1.667-9.725,7.066-6.886A1.066,1.066,0,0,0,31.947,12.294Z" fill={fill}/>
	</g>
</svg>
	);
};

export default Star3;