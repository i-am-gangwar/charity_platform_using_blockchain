const Migrations = artifacts.require("Donation");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
};
