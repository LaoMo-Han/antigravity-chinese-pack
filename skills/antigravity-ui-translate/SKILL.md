---
name: antigravity-ui-translate
description: Antigravity 界面 (UI) 汉化工具与管理技能。提供对 Antigravity 桌面端界面的实时热汉化注入、动态 DOM 监听、系统设置与顶部功能栏深度汉化以及一键无损还原。
---

# Antigravity 界面深度汉化管理技能 (UI Translator)

本技能为 Antigravity 桌面端提供全方位界面汉化、系统设置深度汉化与原生顶部功能栏本地化支持。

---

## 1. 汉化覆盖范围

- **顶部功能栏 (Top Bar & Native Menu)**：
  - 原生主菜单：文件 (File)、编辑 (Edit)、视图 (View)、窗口 (Window)、帮助 (Help)
  - 下拉子菜单：新建窗口、连接至 WSL、在本地重新打开、退出、撤销、重做、剪切、复制、粘贴、全选、放大、缩小、切换全屏、开发者工具、调试控制台、检查更新、官方文档、关于 Antigravity 等
  - 界面顶栏按钮：工作区 (Workspace)、视图、窗口、创建新项目、命令面板 (Command Palette)、搜索历史会话、通知中心、显示设置、概览切换等
- **系统设置全部内容 (All Settings)**：
  - **通用设置 (General)**：界面布局（知识工作模式 / 软件工程模式）、全局安全权限、权限预设、工具细粒度权限、网络访问规则、执行策略、排队消息发送、回车直接发送、工作区外文件访问、命令预处理脚本、终端安全沙箱、自动执行策略等。
  - **账户与方案 (Account)**：订阅方案 (Google AI Pro/Ultra)、配额上限、升级、使用情况匿名遥测、营销动态邮件、退出登录、服务条款。
  - **语音交互 (Voice mode)**：音色选择 (Gemini Live)、麦克风输入设备切换、系统默认设备、音量调节。
  - **外观与主题 (Appearance)**：会话思考过程展开 (默认折叠/详细展开)、主题模式 (浅色/深色/跟随系统)、视觉对比度、字体与字号、浅色/深色主题预设、代码语法高亮预览、会话最大宽度 (窄屏/宽屏/占满全屏)、终端停靠位置、制品呈现宽度、无障碍屏幕朗读器模式。
  - **通知与声音 (Notifications)**：系统通知推送、智能体操作提示音、音量控制。
  - **扩展与插件 (Customizations)**：Token 用量深度拆解、规则、技能、MCP 插件生态。
  - **浏览器 (Browser)**：内置浏览器偏好、默认链接打开方式（内置/外部/侧边面板）、下载保存目录、浏览历史与缓存清理、浏览器子智能体自动化规则。
  - **应用程序 (Application)**：运行时阻止电脑休眠、关闭窗口后常驻托盘、跨设备远程控制、系统通知权限跳转、WSL (Windows 适用于 Linux 的子系统) 发行版连接与切换、版本信息、自动检查更新。
  - **意见反馈 (Give Feedback)**：反馈类型、问题详细描述、操作复现步骤、截图与服务端调试日志附件。
  - **快捷键一览 (Shortcuts)**：全局导航快捷键、会话与提问快捷键、布局与缩放快捷键。
- **对话交互区与侧边栏**：
  - 输入框占位符、添加上下文 (@)、语音录制、停止生成、滚动到底部、撤销节点、复制、模型选择器、权限模式切换、子智能体与后台任务面板等。

---

## 2. 常用管理指令

### 重新应用或更新全量汉化

```powershell
node "$env:USERPROFILE\.gemini\config\plugins\chinese-pack\scripts\apply_full_localization.js"
```

### 一键无损还原为官方英文原版

```powershell
node "$env:USERPROFILE\.gemini\config\plugins\chinese-pack\scripts\restore_original.js"
```
（脚本会自动还原自动创建的 `app.asar.bak` 原始备份）
