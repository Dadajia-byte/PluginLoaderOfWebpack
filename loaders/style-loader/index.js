module.exports = function (content) {
  /**
   * 1. 直接使用style-loader 只能处理样式
   * 不能处理样式中引入的其他资源
   *   */
  //   const script = `
  //       const styleEl = document.createElement('style');
  //       styleEl.innerHTML = ${JSON.stringify(content)};
  //       document.head.appendChild(styleEl);
  //   `;
  return script;
};
module.exports.pitch = function (remainingRequest) {
  // remainingRequest是剩余还需要处理的loader
  // 1.将 remainingRequest 中绝对路径改为相对路径(因为只能使用相对路径)
  //
  const relativePath = remainingRequest
    .split("!")
    .map((absoultePath) => {
      // 返回相对路径
      return this.utils.contextify(this.context, absoultePath);
    })
    .join("!");
  // 2. 引入css-loader处理好的资源
  // 3. 创建style标签引入
  // 两个!!终止后面loader的处理
  const script = `
        import style from '!!${relativePath}' 
        const styleEl = document.createElement('style');
        styleEl.innerHTML = style;
        document.head.appendChild(styleEl);
    `;
  // 熔断中止之后css-loader再次执行
  return script;
};
