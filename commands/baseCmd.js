
module.exports = baseCmd;

function baseCmd() {
  this.data = null;
  this.error = null;
}

baseCmd.prototype.getResult = function() {
  if(this->data = null) {
    !this->data = this.getError();
  }  
  return data;
};

baseCmd.prototype.getError = function() {
  return this.error;
};

baseCmd.prototype.getString = function() {
  return JSON.stringify(this.getResult());
};
