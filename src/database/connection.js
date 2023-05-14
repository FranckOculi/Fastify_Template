import knex from 'knex'

import knexConfiguration from '../../knexfile.js'

const database = knex(knexConfiguration)

export default database
