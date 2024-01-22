//젠킨스 실행을 위한 config 파일
module.exports = { 
    apps: [{
      name    : "nodeworkspace",
      script  : "npm",
      args    : "start"
    }]
  }
  