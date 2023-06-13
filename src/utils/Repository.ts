import db from '../database/connection'
import { Tables } from '../types/tables'
import { Options, Params } from '../types/repository'

export default class Repository {
	table: keyof typeof Tables

	constructor(table: keyof typeof Tables) {
		this.table = table
	}

	findAll = async function Promise<T>(
		{
			select = ['*'],
			where,
			whereIn,
			whereNotIn,
			orWhere,
			whereRaw,
			limit,
			offset,
			orderBy,
		}: Params,
		opts: Options = null
	): Promise<T> {
		const request = db(this.table)

		if (select) request.select(select)
		if (where) request.where(where)
		if (orWhere) request.orWhere(orWhere)
		if (whereIn) request.whereIn(whereIn.key, whereIn.value)
		if (whereNotIn) request.whereNotIn(whereNotIn.key, whereNotIn.value)
		if (whereRaw) request.whereRaw(whereRaw)

		if (limit) request.limit(limit)
		if (offset) request.offset(offset)
		if (orderBy) request.orderBy(orderBy)

		if (opts?.first) request.first()
		if (opts?.remove) request.del()

		return request as T
	}

	findOne = async function Promise<T>(params: Params): Promise<T> {
		return this.findAll(params, { first: true })
	}

	remove = async (params: Params): Promise<number> => {
		return this.findAll<Promise<number>>(params, { remove: true })
	}

	find = async function Promise<T>(query: Params['where']): Promise<T[]> {
		return db(this.table).where(query)
	}

	findSimpleOne = async function Promise<T>(
		query: Params['where']
	): Promise<T> {
		return db(this.table).where(query).first()
	}

	create = async function Promise<T>(data: T) {
		return db(this.table).insert(data)
	}

	update = async function Promise<T>(query: Params['where'], data: T) {
		return db(this.table).where(query).update(data)
	}

	destroy = async (query: Params['where']): Promise<number> => {
		return db(this.table).where(query).del()
	}

	getDB = () => {
		return db(this.table)
	}
}
