
module.exports = baseCmd;

function baseCmd() {
  this.data = null;
  this.error = null;
}

baseCmd.prototype.getData = function() {
  if(this.data == null) {
    this.data = this.getError();
  }  
  return this.data;
};

baseCmd.prototype.getError = function() {
  return this.error;
};

baseCmd.prototype.setData = function(data) {
  return this.data = data;
}

baseCmd.prototype.setError = function(error) {
  return this.error = error;
};


baseCmd.prototype.getString = function() {
  return JSON.stringify(this.getData());
};
