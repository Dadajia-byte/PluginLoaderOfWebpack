/*
 *异步loader,使用this上的async方法构建callback
 */

module.exports = function (content, map, meta) {
  const callback = this.async();
  setTimeout(() => {
    console.log("test2");

    callback(null, content, map, meta);
  }, 1000);
};
