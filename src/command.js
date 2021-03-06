var Status = require('./status');

module.exports = {
  
 /**
  * List Command supported
  */
 supportedCommands: [
  'ADD' : "./command/add",
  'EDIT' : "./command/edit",
  'DELETE' : "./command/delete",
  'ACTIVITY' : "./command/activity"
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
  * 
  * @param string id Command ID
  */
 supportsCommand : function(id) {
   return (!!this.supportedCommands[id]);
 }
}
