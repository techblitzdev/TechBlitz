import React from 'react';

type iconProps = {
	fill?: string,
	secondaryfill?: string,
	strokewidth?: number,
	width?: string,
	height?: string,
	title?: string
}

function Target(props: iconProps) {
	const fill = props.fill || 'currentColor';
	const secondaryfill = props.secondaryfill || fill;
	const strokewidth = props.strokewidth || 1;
	const width = props.width || '1em';
	const height = props.height || '1em';
	const title = props.title || "target";

	return (
		<svg height={height} width={width} viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
	<title>{title}</title>
	<g fill={fill}>
		<path d="M17.693,2.963c-.116-.28-.39-.463-.693-.463h-1.5V1c0-.303-.183-.577-.463-.693-.28-.117-.603-.052-.817,.163l-2.5,2.5c-.141,.141-.22,.332-.22,.53v1.939l-3.03,3.03c-.293,.293-.293,.768,0,1.061,.146,.146,.338,.22,.53,.22s.384-.073,.53-.22l3.03-3.03h1.939c.199,0,.39-.079,.53-.22l2.5-2.5c.215-.214,.278-.537,.163-.817Z" fill={secondaryfill}/>
		<path d="M9,17c-4.411,0-8-3.589-8-8C1,4.102,5.397,.177,10.499,1.145c.407,.077,.675,.47,.598,.876-.077,.408-.477,.674-.877,.597-.416-.079-.826-.119-1.22-.119-3.584,0-6.5,2.916-6.5,6.5s2.916,6.5,6.5,6.5,6.5-2.916,6.5-6.5c0-.396-.04-.807-.118-1.22-.078-.407,.189-.799,.596-.877,.408-.078,.799,.189,.877,.597,.097,.505,.146,1.01,.146,1.5,0,4.411-3.589,8-8,8Z" fill={fill}/>
		<path d="M9,14c-2.757,0-5-2.243-5-5s2.243-5,5-5c.262,0,.513,.036,.764,.074,.409,.063,.69,.446,.627,.855-.062,.41-.438,.693-.855,.627-.176-.027-.352-.057-.535-.057-1.93,0-3.5,1.57-3.5,3.5s1.57,3.5,3.5,3.5,3.5-1.57,3.5-3.5c0-.183-.029-.358-.057-.534-.063-.409,.217-.792,.626-.856,.416-.058,.793,.217,.856,.626,.039,.251,.074,.503,.074,.765,0,2.757-2.243,5-5,5Z" fill={fill}/>
	</g>
</svg>
	);
};

export default Target;