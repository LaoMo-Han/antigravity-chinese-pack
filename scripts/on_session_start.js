const { spawn } = require('child_process');
const path = require('path');

// 后台异步触发一次 UI 界面汉化刷新
try {
  const child = spawn(process.execPath, [path.join(__dirname, 'translate_ui.js')], {
    detached: true,
    stdio: 'ignore'
  });
  child.unref();
} catch (e) {}

// 后台异步注入 Token 实时配额监控组件
try {
  const quotaChild = spawn(process.execPath, [path.join(__dirname, 'inject_token_monitor.js')], {
    detached: true,
    stdio: 'ignore'
  });
  quotaChild.unref();
} catch (e) {}

// 输出 SessionStart 规范响应
const output = {
  injectSteps: [
    {
      systemMessage: {
        systemMessage: "[Antigravity 简体中文语言包] 插件已就绪。所有回复、思考、解释和注释均强制使用规范的简体中文。"
      }
    }
  ]
};

console.log(JSON.stringify(output));
