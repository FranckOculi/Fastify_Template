import knex from 'knex'

import knexConfiguration from '../../knexfile'

const database = knex(knexConfiguration)

export default database
