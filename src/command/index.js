var Status = require('./status');

module.exports = {
  
 /**
  * List Command supported
  */
 supportedCommands: [
  'ADD' : "./add",
  'EDIT' : "./edit",
  'DELETE' : "./delete",
  'ACTIVITY' : "./activity"
 ],
 
 /**
  * Execute command to the server
  * 
  * @param string id Command ID
  * @param array args Agruments of the command
  * @param function Callback
  */
 exec : function(id, args, callback) {
  if(this.supportsCommand(id)) {
    var command = this.getCommand(id);
    return command.exec(args, callback);
  }
  return callback(JSON.stringify({
    status: Status.NOT_SUPPORTED_COMMAND;
  }));
 },
 
 /**
  * Get Command
  * 
  * @param string $id Command ID
  */
 getCommand: function(id) {
   return require(this.supportedCommands[id]);
 }
 
 /**
  * Check if support command to the server
  */
 supportsCommand : function(id) {
   return (!!this.supportedCommands[id]);
 }
}
