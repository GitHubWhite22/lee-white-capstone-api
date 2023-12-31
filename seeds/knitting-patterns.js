// import seed data files, arrays of objects
const knittingPatternsData = require("../seed-data/knitting-patterns");

exports.seed = async function (knex) {
  await knex("knitting_patterns").del();
  await knex("knitting_patterns").insert(knittingPatternsData);
};
