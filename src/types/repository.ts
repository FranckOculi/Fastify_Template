export type Params = {
	select?: string[]
	where?: { [key: string]: string | number }
	whereIn?: { key: string; value: number[] }
	whereNotIn?: { key: string; value: number[] }
	orWhere?: { [key: string]: string }
	whereRaw?: boolean
	limit?: number
	offset?: number
	orderBy?: string
}

export type Options = {
	first?: boolean
	remove?: boolean
}
