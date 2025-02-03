import React from 'react';

type iconProps = {
	fill?: string,
	secondaryfill?: string,
	strokewidth?: number,
	width?: string,
	height?: string,
	title?: string
}

function Lock(props: iconProps) {
	const fill = props.fill || 'currentColor';
	const secondaryfill = props.secondaryfill || fill;
	const strokewidth = props.strokewidth || 1;
	const width = props.width || '1em';
	const height = props.height || '1em';
	const title = props.title || "lock";

	return (
		<svg height={height} width={width} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
	<title>{title}</title>
	<g fill={fill}>
		<path d="M35,18H33V12a9,9,0,1,0-18,0v6H13V12a11,11,0,0,1,22,0Z" fill={secondaryfill}/>
		<path d="M40,20H8a3,3,0,0,0-3,3V44a3,3,0,0,0,3,3H40a3,3,0,0,0,3-3V23A3,3,0,0,0,40,20ZM25,35.9V40a1,1,0,0,1-2,0V35.9a5,5,0,1,1,2,0Z" fill={fill}/>
	</g>
</svg>
	);
};

export default Lock;