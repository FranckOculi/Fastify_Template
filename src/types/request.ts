export interface RequestHeaders {
	authorization: string
	tokenInfo?:
		| {
				authorization: {
					id: number
					access: string
				}
		  }
		| string
}
