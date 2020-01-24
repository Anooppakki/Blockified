const contract = require("truffle-contract");

const electCandidate = require("../build/contracts/Election.json");
var Elect = contract(electCandidate);

module.exports = {
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
    }
};
