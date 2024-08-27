class AnalyzeWebpackPlugin {
  apply(compiler) {
    compiler.hooks.emit.tap("AnalyzeWebpackPlugin", (compilation) => {
      // 1. 遍历所有即将输出的文件, 得到其大小
      const assets = Object.entries(compilation.assets);
      let content = `| 资源名称 | 资源大小 |
| --- | --- |`;
      assets.forEach(([filename, file]) => {
        content += `\n| ${filename} | ${(file.size() / 1024).toFixed(2)}kb |`;
      });
      // 2. 生成一个 md 文件
      compilation.assets["analyze.md"] = {
        source() {
          return content;
        },
        size() {
          return content.length;
        },
      };
    });
  }
}
module.exports = AnalyzeWebpackPlugin;
