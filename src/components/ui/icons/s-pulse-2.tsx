import React from 'react';

type iconProps = {
	fill?: string,
	secondaryfill?: string,
	strokewidth?: number,
	width?: string,
	height?: string,
	title?: string
}

function SPulse2(props: iconProps) {
	const fill = props.fill || 'currentColor';
	const secondaryfill = props.secondaryfill || fill;
	const strokewidth = props.strokewidth || 1;
	const width = props.width || '1em';
	const height = props.height || '1em';
	const title = props.title || "s pulse 2";

	return (
		<svg height={height} width={width} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
	<title>{title}</title>
	<g fill={fill} strokeLinecap="butt" strokeLinejoin="miter">
		<rect height="40" width="40" fill="none" rx="4" ry="4" stroke={fill} strokeLinecap="square" strokeMiterlimit="10" strokeWidth={strokewidth} x="4" y="4"/>
		<polyline fill="none" points="9 24 14 24 18 14 28 34 33 24 39 24" stroke={secondaryfill} strokeLinecap="square" strokeMiterlimit="10" strokeWidth={strokewidth}/>
	</g>
</svg>
	);
};

export default SPulse2;