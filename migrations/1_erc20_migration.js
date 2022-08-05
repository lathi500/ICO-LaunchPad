var MintERC20 = artifacts.require("MintERC20");

module.exports = function(deployer) {
  deployer.deploy(MintERC20) ;
};
