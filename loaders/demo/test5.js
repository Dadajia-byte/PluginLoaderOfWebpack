module.exports = function (content) {
  console.log("normal loader2");

  return content;
};

// 如果normalloader中的pitch方法存在返回值,那么在执行pitch链时,后续的pitchloader都不会执行,直接回到上一个loader中执行还没执行的normalloader,执行完毕后,剩余的normalloader都不会执行
/* 
  normal loader1 <- normal loader2 <- normal loader3
                                           ⬆
  pitch loader1  -> pitch loader2 -> pitch loader3
  上述为正常顺序(从pitch loader1开始)
  
  normal loader1 x normal loader2 x normal loader3
    ⬆
    ---------------------                        
                        |
  pitch loader1  -> pitch loader2 x pitch loader3
*/

module.exports.pitch = function () {
  console.log("pitch loader2");
  return "result";
};
