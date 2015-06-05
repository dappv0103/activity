exports.render = function(docs) {
  var _results = [];
  for(var i = 0; i <= docs.length; i++) {
    _results.push({
      _id: docs[i]._id,
      verb: docs[i].verb,
      actors: docs[i].actors,
      meta: docs[i].meta,
      is_read: docs[i].is_read
    });
  }
  return _results;
}
