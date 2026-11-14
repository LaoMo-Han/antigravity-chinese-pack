# Antigravity 简体中文深度语言包 (Chinese Language Pack)

欢迎使用 **Antigravity 简体中文深度语言包**！本插件专为 Google Antigravity 打造，提供全方位的本地化开发环境支持，覆盖 AI Agent 中文深度交互、系统设置全模块汉化、原生顶部功能栏汉化与动态 DOM 实时监听。

---

## 🌟 汉化深度与特性

1. **系统设置 (Settings) 100% 全面深度汉化**
   - **通用设置 (General)**：界面布局模式（知识工作 / 软件工程）、全局安全权限、权限预设、工具权限、网络访问规则、消息排队策略、回车发送、工作区外文件访问、终端沙箱、执行策略等。
   - **账户与订阅 (Account)**：订阅方案 (Google AI Pro/Ultra)、配额与升级、遥测数据收集、动态邮件、退出登录、服务条款。
   - **语音交互 (Voice mode)**：音色选择 (Gemini Live)、麦克风输入设备、系统音量调节。
   - **外观与主题 (Appearance)**：思考步骤展开/折叠、主题切换（浅色/深色/跟随系统）、视觉对比度、字体与字号、会话最大宽度（窄屏/宽屏/占满全屏）、终端停靠位置、制品呈现宽度、无障碍屏幕朗读。
   - **通知与声音 (Notifications)**：系统通知推送、操作提示音与音量调节。
   - **自定义配置 (Customizations)**：Token 用量详细拆解、规则、技能与 MCP 扩展生态。
   - **浏览器设置 (Browser)**：内置浏览器偏好、链接默认打开位置、下载保存路径、缓存清理、浏览器子智能体自动化规则。
   - **应用设置 (Application)**：阻止休眠、常驻托盘、跨设备远程控制、系统通知跳转、WSL 关联与发行版无缝切换、版本信息、自动更新。
   - **快捷键 (Shortcuts)**：全局导航快捷键、会话与提问快捷键、布局与缩放快捷键。
   - **意见反馈 (Give Feedback)**：反馈分类、问题详述、复现步骤、截图与服务端调试日志附件。

2. **顶部功能栏 (Top Bar & Native Menu)**
   - 原生系统菜单：文件 (File)、编辑 (Edit)、视图 (View)、窗口 (Window)、帮助 (Help) 全面中文化。
   - 顶部快捷按钮与下拉项：工作区 (Workspace)、新建窗口、连接至 WSL、在本地重新打开、退出、创建新项目、命令面板 (Command Palette)、放大、缩小、重置缩放、最大化/最小化、关闭等。

3. **对话画布与交互控制**
   - 包含输入框占位符、添加上下文 (@)、语音模式、权限模式（Turbo / 沙箱 / 逐项确认）、模型选择、撤销、代码隔离保护等。

4. **原生持久化与热更新双引擎**
   - **即时生效**：无需重启客户端，执行脚本即可通过 DevTools CDP 即刻汉化当前所有打开的窗口。
   - **常驻生效**：内置底层预加载与原生菜单补丁，下次打开应用依旧保持完整中文。
   - **安全无损**：自动备份原版文件 `app.asar.bak`，支持一键无损还原回官方原版英文。

---

## 🚀 常用操作脚本

### 重新注入或更新汉化

```powershell
node "$env:USERPROFILE\.gemini\config\plugins\chinese-pack\scripts\apply_full_localization.js"
```

### 一键恢复官方原版英文

```powershell
node "$env:USERPROFILE\.gemini\config\plugins\chinese-pack\scripts\restore_original.js"
```

---

## 🛠️ 管理与配置

您可以通过 [chinese-pack](customization://chinese-pack) 在「自定义配置与插件」页面中随时管理、启用或停用此语言包。
