/**
 * Antigravity 官方原版英文一键无损还原脚本
 */

const fs = require('fs');

const asarPath = 'C:\\Users\\GAIL\\AppData\\Local\\Programs\\antigravity\\resources\\app.asar';
const asarBakPath = 'C:\\Users\\GAIL\\AppData\\Local\\Programs\\antigravity\\resources\\app.asar.bak';

if (!fs.existsSync(asarBakPath)) {
  console.log('未找到原版备份文件 (app.asar.bak)，无需还原。');
  process.exit(0);
}

try {
  fs.copyFileSync(asarBakPath, asarPath);
  console.log('====================================================');
  console.log('已成功还原为官方原版 app.asar！');
  console.log('重启 Antigravity 后将恢复默认英文界面。');
  console.log('====================================================');
} catch (e) {
  console.error('还原失败:', e.message);
}
