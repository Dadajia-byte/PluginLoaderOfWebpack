// raw loader接受到的content是Buffer数据(二进制)
// 当处理图片,字体图标,html等操作时,需要使用raw loader
/* module.exports = function (content) {
  console.log(content);

  return content;
};

module.exports.raw = true; */

function loaderRow(content) {
  console.log(content);

  return content;
}

loaderRow.raw = true;

module.exports = loaderRow;
