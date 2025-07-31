// TypeScript가 .module.css를 제대로 인식해서 에러 없이 사용할 수 있게 해줌
declare module '*.module.css' {
	const classes: { [key: string]: string };
	export default classes;
}
