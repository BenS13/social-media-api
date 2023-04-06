/**
 * A module to execute SQL queries on the databse
 * @module helpers/database
 */
const mysql = require('promise-mysql');
const info = require('../config');

//define async utitlity
//connect to db run queury and then close connection CODE from week3Lab Doc

/**
 * Run an SQL query on the database
 * @param {string} query The SQL query
 * @param {array|string|number} values The values to insert into the database
 * @returns {object} Indexable result object
 */
exports.run_query = async function run_query(query, values) {
    try {
      const connection = await mysql.createConnection(info.config);
      let data = await connection.query(query, values);
      await connection.end();
      return data;
    } catch (error) {
      // Don't let the actual error propagate up to the response object
      // as it may contain sensitive server information.
      // Instead log it somehow and throw a generic error.
      console.error(error, query, values);
      throw 'Database query error'
    }
  }
  