var Block = artifacts.require("./Blockified.sol");
var Elect = artifacts.require("./Election.sol");

module.exports = function(deployer) {
    deployer.deploy(Block);
    deployer.deploy(Elect);
};
