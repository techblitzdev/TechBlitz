import React from 'react';

type iconProps = {
	fill?: string,
	secondaryfill?: string,
	strokewidth?: number,
	width?: string,
	height?: string,
	title?: string
}

function ERemove(props: iconProps) {
	const fill = props.fill || 'currentColor';
	const secondaryfill = props.secondaryfill || fill;
	const strokewidth = props.strokewidth || 1;
	const width = props.width || '1em';
	const height = props.height || '1em';
	const title = props.title || "e remove";

	return (
		<svg height={height} width={width} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
	<title>{title}</title>
	<g fill={fill} strokeLinecap="butt" strokeLinejoin="miter">
		<line fill="none" stroke={secondaryfill} strokeLinecap="square" strokeMiterlimit="10" strokeWidth={strokewidth} x1="19" x2="5" y1="19" y2="5"/>
		<line fill="none" stroke={fill} strokeLinecap="square" strokeMiterlimit="10" strokeWidth={strokewidth} x1="19" x2="5" y1="5" y2="19"/>
	</g>
</svg>
	);
};

export default ERemove;