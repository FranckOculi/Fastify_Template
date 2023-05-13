import db from '../database/connection.js'

export default class Repository {
	constructor(table) {
		this.table = table
	}

	findAll = async (
		{
			select = ['*'],
			where,
			whereIn,
			whereNotIn,
			whereOperator,
			orWhere,
			whereRaw,
			limit,
			offset,
			orderBy,
		},
		opts = null
	) => {
		const request = db(this.table)

		if (select) request.select(select)
		if (where) request.where(where)
		if (orWhere) request.orWhere(orWhere)
		if (whereIn) request.whereIn(whereIn.key, whereIn.value)
		if (whereNotIn) request.whereNotIn(whereNotIn.key, whereNotIn.value)
		if (whereRaw) request.whereRaw(whereRaw)

		if (whereOperator)
			request.where(
				whereOperator.key,
				whereOperator.operator,
				whereOperator.value
			)

		if (limit) request.limit(limit)
		if (offset) request.offset(offset)
		if (orderBy) request.orderBy(orderBy)

		if (opts?.first) request.first()
		if (opts?.remove) request.del()
		return request
	}

	findOne = async (params) => {
		return this.findAll(params, { first: true })
	}

	remove = async (params) => {
		return this.findAll(params, { remove: true })
	}

	find = async (query) => {
		return db(this.table).where(query)
	}
	findSimpleOne = async (query) => {
		return db(this.table).where(query).first()
	}
	create = async (data) => {
		return db(this.table).insert(data)
	}
	update = async (query, data) => {
		return db(this.table).where(query).update(data)
	}
	destroy = async (query) => {
		return db(this.table).where(query).del()
	}
	getDB = () => {
		return db(this.table)
	}
}
