/* module.exports = function (content) {
  return content;
};
 */
// 同步loader中不可以执行异步操作
module.exports = function (content, map, meta) {
  // 第一个参数是错误原因,
  // 第二个参数是处理后返回的内容
  // 第三个参数是 source-map 继续传递source-mao
  // 第四个参数是传递参数给下一个loader
  console.log("test1");

  this.callback(null, content, map, meta);
};
