import React from 'react';

type iconProps = {
	fill?: string,
	secondaryfill?: string,
	strokewidth?: number,
	width?: string,
	height?: string,
	title?: string
}

function Home2(props: iconProps) {
	const fill = props.fill || 'currentColor';
	const secondaryfill = props.secondaryfill || fill;
	const strokewidth = props.strokewidth || 1;
	const width = props.width || '1em';
	const height = props.height || '1em';
	const title = props.title || "home 2";

	return (
		<svg height={height} width={width} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
	<title>{title}</title>
	<g fill={fill} strokeLinecap="butt" strokeLinejoin="miter">
		<polyline fill="none" points="2 21 24 3 46 21" stroke={secondaryfill} strokeMiterlimit="10" strokeWidth={strokewidth}/>
		<polyline fill="none" points="19 45 19 33 29 33 29 45" stroke={fill} strokeMiterlimit="10" strokeWidth={strokewidth}/>
		<path d="M7,24v17c0,2.209,1.791,4,4,4h26c2.209,0,4-1.791,4-4V24" fill="none" stroke={fill} strokeLinecap="square" strokeMiterlimit="10" strokeWidth={strokewidth}/>
	</g>
</svg>
	);
};

export default Home2;