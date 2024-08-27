class BannerWebpackPlugin {
  constructor(options = {}) {
    this.options = options;
  }
  apply(compiler) {
    compiler.hooks.emit.tapAsync(
      "BannerWebpackPlugin",
      (compilation, callback) => {
        debugger;
        // 1. 获取即将输出的资源文件, compliation.assets
        // 2. 过滤只保留js和css资源
        const extensions = ["js", "css"]; // 保留的拓展资源后缀
        const assets = Object.keys(compilation.assets).filter((assetPath) => {
          // 将文件名切割
          const splitted = assetPath.split(".");
          // 获取最后一个文件拓展名
          const extension = splitted[splitted.length - 1];
          // 判断是否保护
          return extensions.includes(extension);
        });
        console.log(assets);
        const prefix = `
        /**
         * Author:${this.options.author}
         */
        `;

        // 3. 遍历剩余资源添加上注释
        assets.forEach((asset) => {
          // 调用原先的source方法获取原来的内容
          const source = compilation.assets[asset].source();
          // 拼上注释
          const content = prefix + source;
          // 重新定义source和size方法
          compilation.assets[asset] = {
            // 最终资源输出时, 调用source方法, source方法的返回值就是资源的具体内容
            source() {
              return content;
            },
            // 资源大小
            size() {
              return content.length;
            },
          };
        });

        callback();
      }
    );
  }
}

module.exports = BannerWebpackPlugin;
