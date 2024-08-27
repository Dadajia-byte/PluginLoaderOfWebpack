class cleanWebpackPlugin {
  constructor() {}
  apply(compiler) {
    // 2. 获取打包输出的目录
    const output = compiler.options.output.path;
    const fs = compiler.outputFileSystem;
    // 1. 注册钩子 在打包输出前emit
    compiler.hooks.emit.tap("cleanWebpackPlugin", (compilation) => {
      // 3. 通过fs删除打包输出目录下的所有文件
      this.removeFiles(fs, output);
    });
  }

  removeFiles(fs, filePath) {
    // 想要删除打包目录下所有资源, 需要将目录下所有资源先删除, 才能删除目录
    // 1. 读取当前目录下所有文件
    const files = fs.readdirSync(filePath);
    // 2. 遍历所有文件
    // 2.1 判断文件夹还是文件
    files.forEach((file) => {
      const path = `${filePath}/${file}`;
      const fileStat = fs.statSync(path);
      if (fileStat.isDirectory()) {
        // 2.2 如果是文件夹, 递归删除
        this.removeFiles(fs, path);
      } else {
        // 2.3 如果是文件, 删除文件
        fs.unlinkSync(path);
      }
    });
  }
}
module.exports = cleanWebpackPlugin;
