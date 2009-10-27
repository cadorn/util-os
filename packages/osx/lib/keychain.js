
function dump(obj) { print(require('test/jsdump').jsDump.parse(obj)) };


var OS = require("os");

exports.getPassword = function(account, item) {
    
    var command = ["/usr/bin/security 2>&1 >/dev/null find-generic-password"];
    command.push("-ga " + OS.enquote(account));
    command.push("-s " + OS.enquote(item));
    command = command.join(" ");
    
    var result = runCommand(command);
    if(result.status!=0) {
        throw "No password found for item '"+item+"' in account '"+account+"'.";
    }
    
    var match = result.stdout.match(/^password: "(.*)"\n$/);
    if(!match) {
        throw "Error parsing password from result";
    }
    
    return match[1];
}


function runCommand(command) {
    var process = OS.popen(command);
    var result = process.communicate();
    return {
        status: result.status,
        stdout: result.stdout.read(),
        stderr: result.stderr.read()
    }
};