/**
 * 1. webpack 加载 webpack.config.js中所有的配置, 此时就会new Plugin(), 执行插件的 constructor
 * 2. webpack 创建 compiler 对象
 * 3. 遍历所有 plugins, 并调用其中的 apply 方法
 * 4. 执行剩下编译流程 (触发各个hooks事件)
 */
class TestPlugin {
  constructor() {
    console.log("我执行了constructor进行初始化插件");
  }
  apply(compiler) {
    debugger;
    console.log(compiler);

    console.log("我打印了compiler");
    // 由文档知,environment是同步钩子,因此使用tap方法注册
    compiler.hooks.environment.tap("TestPlugin", () => {
      console.log("我执行了environment钩子");
    });

    // emit 是异步钩子, 可以使用多种方式注册
    // 1. 使用tap注册 接受compliation作为回调函数参数
    compiler.hooks.emit.tap("TestPlugin", (compilation) => {
      console.log(compilation);
      console.log("我执行了emit(tap)钩子");
    });
    // 2. 使用tapAsync注册 接受compliation和callback作为回调函数参数
    compiler.hooks.emit.tapAsync("TestPlugin", (compilation, callback) => {
      setTimeout(() => {
        console.log("我执行了emit(tapAsync)钩子");
        callback();
      }, 1000);
    });
    // 3. 使用tapPromise注册 接受compliation作为回调函数参数, 并返回一个promise
    compiler.hooks.emit.tapPromise("TestPlugin", (compilation) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log("我执行了emit(tapPromise)钩子");
          resolve();
        }, 1000);
      });
    });

    // 由文档可知, make 是异步并行钩子
    compiler.hooks.make.tapAsync("TestPlugin", (compilation, callback) => {
      compilation.hooks.seal.tap("TestPlugin", () => {
        console.log("我执行了seal钩子");
      });
      setTimeout(() => {
        console.log("我执行了make钩子1");
        callback();
      }, 3000);
    });
    compiler.hooks.make.tapAsync("TestPlugin", (compilation, callback) => {
      setTimeout(() => {
        console.log("我执行了make钩子2");
        callback();
      }, 1000);
    });
    compiler.hooks.make.tapAsync("TestPlugin", (compilation, callback) => {
      setTimeout(() => {
        console.log("我执行了make钩子3");
        callback();
      }, 2000);
    });
  }
}

module.exports = TestPlugin;
