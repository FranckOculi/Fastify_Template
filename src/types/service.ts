export interface ServiceResponse<T> {
	error: string | null
	status: number | null
	data: T | null
}
