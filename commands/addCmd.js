

module.exports addCmd;


function addCmd() {
  this.data = "";
};

addCmd.prototype.run(data) {
  return this;
};

addCmd.prototype.getResult() {
  if(!this->data) {
    
  }  
  return data;
};

addCmd.prototype.getString() {
  return JSON.stringify(this.getResult());
};
