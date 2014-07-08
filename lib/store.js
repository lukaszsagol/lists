function Store(opts) {
  var data = opts.initialData;

  return {
    getData: function() {
      return data;
    },
  }
}

module.exports = Store
