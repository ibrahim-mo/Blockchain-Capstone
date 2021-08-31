// migrating the appropriate contracts
var Verifier = artifacts.require("Verifier");
var RealStateToken = artifacts.require("RealStateToken");
var Verification = artifacts.require("Verification");
var SolnSquareVerifier = artifacts.require("SolnSquareVerifier");

module.exports = function(deployer, network, accounts) {
  let proxyRegistryAddress = "";
  if (network === 'rinkeby') {
    proxyRegistryAddress = "0x0682711243d9256641B520Bf913C43315857f5D0";
  } else { // localhost
    proxyRegistryAddress = accounts[0];
  }
  deployer.deploy(Verifier);
  deployer.deploy(RealStateToken, proxyRegistryAddress);
  deployer.deploy(Verification);
  deployer.link(Verification, SolnSquareVerifier);
  deployer.deploy(SolnSquareVerifier, proxyRegistryAddress);
};
