import React from 'react';

type iconProps = {
	fill?: string,
	secondaryfill?: string,
	strokewidth?: number,
	width?: string,
	height?: string,
	title?: string
}

function Map(props: iconProps) {
	const fill = props.fill || 'currentColor';
	const secondaryfill = props.secondaryfill || fill;
	const strokewidth = props.strokewidth || 1;
	const width = props.width || '1em';
	const height = props.height || '1em';
	const title = props.title || "map";

	return (
		<svg height={height} width={width} viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
	<title>{title}</title>
	<g fill={fill}>
		<line fill="none" stroke={secondaryfill} strokeLinecap="round" strokeLinejoin="round" strokeWidth={strokewidth} x1="6.25" x2="6.25" y1="2.792" y2="13.292"/>
		<line fill="none" stroke={secondaryfill} strokeLinecap="round" strokeLinejoin="round" strokeWidth={strokewidth} x1="11.75" x2="11.75" y1="4.708" y2="15.208"/>
		<path d="M2.533,3.576l3.432-.763c.186-.041,.38-.029,.559,.036l4.952,1.801c.179,.065,.373,.078,.559,.036l2.998-.666c.625-.139,1.217,.336,1.217,.976V13.448c0,.469-.326,.875-.783,.976l-3.432,.763c-.186,.041-.38,.029-.559-.036l-4.952-1.801c-.179-.065-.373-.078-.559-.036l-2.998,.666c-.625,.139-1.217-.336-1.217-.976V4.552c0-.469,.326-.875,.783-.976Z" fill="none" stroke={fill} strokeLinecap="round" strokeLinejoin="round" strokeWidth={strokewidth}/>
	</g>
</svg>
	);
};

export default Map;