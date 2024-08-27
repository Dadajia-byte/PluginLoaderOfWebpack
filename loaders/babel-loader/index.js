const schema = require("./schema");
const babel = require("@babel/core");

module.exports = function (content) {
  // 异步loader
  const callback = this.async();
  const options = this.getOptions(schema);

  // 使用babel进行代码进行编译
  babel.transform(content, options, function (err, result) {
    if (err) callback(err); // result => {code,map,ast}
    else callback(null, result.code);
  });
};
