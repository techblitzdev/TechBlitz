import React from 'react';

type iconProps = {
	fill?: string,
	secondaryfill?: string,
	strokewidth?: number,
	width?: string,
	height?: string,
	title?: string
}

function ICheck2(props: iconProps) {
	const fill = props.fill || 'currentColor';
	const secondaryfill = props.secondaryfill || fill;
	const strokewidth = props.strokewidth || 1;
	const width = props.width || '1em';
	const height = props.height || '1em';
	const title = props.title || "i check 2";

	return (
		<svg height={height} width={width} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
	<title>{title}</title>
	<g fill={fill} strokeLinecap="butt" strokeLinejoin="miter">
		<polyline fill="none" points="12 24 20 32 36 16" stroke={secondaryfill} strokeLinecap="square" strokeMiterlimit="10" strokeWidth={strokewidth}/>
		<rect height="40" width="40" fill="none" rx="4" ry="4" stroke={fill} strokeLinecap="square" strokeMiterlimit="10" strokeWidth={strokewidth} x="4" y="4"/>
	</g>
</svg>
	);
};

export default ICheck2;