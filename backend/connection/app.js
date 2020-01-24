const contract = require("truffle-contract");

const electCandidate = require("../build/contracts/Election.json");
var Elect = contract(electCandidate);

const block_artifact = require("../build/contracts/Blockified.json");
var Block = contract(block_artifact);

var account;

module.exports = {
  start: function(callback) {
    var self = this;

    // Bootstrap the Block abstraction for Use.
    Block.setProvider(self.web3.currentProvider);

    // Get the initial account balance so it can be displayed.
    self.web3.eth.getAccounts(function(err, accs) {
      if (err != null) {
        console.log("There was an error fetching your accounts.", err);
        return;
      }

      if (accs.length == 0) {
        console.log(
          "Couldn't get any accounts! Make sure your Ethereum client is configured correctly."
        );
        return;
      }
      self.accounts = accs;
      account = self.accounts[0];

      callback(self.accounts);
    });
  },

  getCandidate: function(callback) {
    var self = this;

    Elect.setProvider(self.web3.currentProvider);
    var meta;
    Elect.deployed()
      .then(function(instance) {
        meta = instance;
        return meta.candidate.call();
      })
      .then(function(value) {
        callback(value.valueOf());
      })
      .catch(function(e) {
        console.log(e);
        callback("Error 404");
      });
  },

  addInstitute: function(name, password, field, callback) {
    var self = this;
    Block.setProvider(self.web3.currentProvider);

    var meta;
    Block.deployed()
      .then(function(instance) {
        meta = instance;
        console.log(self.web3.eth.accounts[0]);
        return meta
          .addInstitute(name, password, field, {
            from: self.web3.eth.accounts[0],
            gas: 1000000
          })
          .catch(err => console.log(err));
      })
      .then(function(value) {
        callback(value.valueOf());
      })
      .catch(function(e) {
        console.log(e);
        callback("Error 404");
      });
  }
};
