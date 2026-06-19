// Definiciones para que TS reconozca archivos de shader .vs, .fs, .glsl
/**
 * Declaración de módulos de shaders
 */

declare module '*.fs' {
	const value: string
	export default value
}
declare module '*.vs' {
	const value: string
	export default value
}
declare module '*.glsl' {
	const value: string
	export default value
}