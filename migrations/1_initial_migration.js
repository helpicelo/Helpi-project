const Migrations = artifacts.require("Migrations");

module.exports = function() {
  const migrations = await Migrations.new();

  Migrations.deploy(migrations);
};
