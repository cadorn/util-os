
var ASSERT = require("test/assert");
var UTIL = require("util");

var KEYCHAIN = require("keychain");


exports.testKeychain = function () {

    var account = "test-account";
    var item = "test-item"
    
    var password = KEYCHAIN.getPassword(account, item);
    
    ASSERT.eq("ThisIsTheTestPassword", password);    

};


if (require.main === module.id)
    require("os").exit(require("test/runner").run(exports));
