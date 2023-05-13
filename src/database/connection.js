// import knexPkg from "knex";
// const { knex } = knexPkg;
import knex from 'knex'

import knexConfiguration from '../../knexfile.js'

const database = knex(knexConfiguration)

export default database
