# Antigravity 简体中文语言包 · 深度使用指南与进阶手册

本手册详细介绍了 **Antigravity 简体中文深度语言包 (`antigravity-chinese-pack`)** 的安装、配置、架构原理、更新维护及故障排查方法。

---

## 目录

1. [快速上手与安装方式](#1-快速上手与安装方式)
   - [一键脚本自动安装 (推荐)](#11-一键脚本自动安装-推荐)
   - [手动安装与配置](#12-手动安装与配置)
2. [核心功能与覆盖范围](#2-核心功能与覆盖范围)
   - [AI 智能体规范与专业术语](#21-ai-智能体规范与专业术语)
   - [UI 界面深度全量汉化](#22-ui-界面深度全量汉化)
   - [原生级右键上下文菜单拦截](#23-原生级右键上下文菜单拦截)
3. [三层架构与技术实现原理](#3-三层架构与技术实现原理)
4. [日常维护与管理指令](#4-日常维护与管理指令)
   - [随时手动刷新/重新注入](#41-随时手动刷新重新注入)
   - [应用升级后的重新适配](#42-应用升级后的重新适配)
   - [一键无损还原为英文原版](#43-一键无损还原为英文原版)
5. [常见问题解答 (FAQ)](#5-常见问题解答-faq)

---

## 1. 快速上手与安装方式

### 1.1 一键脚本自动安装 (推荐)

无论您是刚安装 Antigravity，还是想要将本插件分享给团队朋友，使用一键安装脚本是最简单可靠的方式。

#### 前置要求
- Windows 10 / 11 操作系统；
- 已安装 [Google Antigravity](https://antigravity.google/) 桌面客户端；
- 系统中已安装 [Node.js](https://nodejs.org/)（建议 Node.js 18+ 或最新 LTS 版本）。

#### 安装步骤
1. 打开 Windows PowerShell（建议以当前常用用户身份打开即可，无需管理员提权）：
2. 克隆本仓库到本地任意目录（例如 `C:\code\antigravity-chinese-pack`）：
   ```powershell
   git clone https://github.com/LaoMo-Han/antigravity-chinese-pack.git
   cd antigravity-chinese-pack
   ```
3. 运行一键安装脚本：
   ```powershell
   powershell -ExecutionPolicy Bypass -File .\install.ps1
   ```
4. 脚本将自动：
   - 将插件分发至 Antigravity 用户插件目录 (`$env:USERPROFILE\.gemini\config\plugins\chinese-pack`)；
   - 自动安装轻量依赖；
   - 自动备份原始 `app.asar` 为 `app.asar.bak`；
   - 注入主进程与预加载层补丁，并对当前已打开的 Antigravity 窗口执行热刷新。

---

### 1.2 手动安装与配置

如果您希望手动把控文件放置与步骤：

1. **创建插件目录**：
   在终端中创建 Antigravity 插件根路径：
   ```powershell
   New-Item -ItemType Directory -Force -Path "$env:USERPROFILE\.gemini\config\plugins\chinese-pack"
   ```
2. **复制仓库文件**：
   将本仓库中的全部内容复制到上述目录中。
3. **安装依赖并注入**：
   ```powershell
   cd "$env:USERPROFILE\.gemini\config\plugins\chinese-pack"
   npm install @electron/asar --no-audit --no-fund --silent
   node "scripts\apply_full_localization.js"
   ```

---

## 2. 核心功能与覆盖范围

### 2.1 AI 智能体规范与专业术语

本插件包含全局生效的 AI 规范规则文件 `rules/AGENTS.md`：
- **母语级简体中文交互**：模型在回答、规划、排错、执行代码和生成文档时，默认遵循中文表述习惯；
- **技术术语标准化**：统一了专业术语对照，例如：
  - `Workspace` $\rightarrow$ 工作区
  - `Artifact / Artifacts` $\rightarrow$ 制品 / 成果物
  - `Subagent` $\rightarrow$ 子智能体
  - `Customizations` $\rightarrow$ 自定义配置与插件
  - `Terminal Sandbox` $\rightarrow$ 终端安全沙箱
  - `Swarm` $\rightarrow$ 多智能体蜂群协作
- **中英文规范混排**：中文字符与英文字母、数字、代码标签之间保持空格，排版专业清晰。

### 2.2 UI 界面深度全量汉化

不仅翻译静态文本，更覆盖深层二级弹窗与动态生成的 DOM 节点：
- **系统设置 (Settings)**：
  - **通用设置**：知识工作模式、软件工程模式、全局安全权限、权限预设、工具细粒度权限、网络访问规则、消息排队、终端沙箱、语音模式音色等；
  - **账户与方案**：Google AI Pro / Ultra 方案管理、额度状态、遥测开关、营销邮件；
  - **外观设置**：浅色/深色主题、色彩对比度、字号、浅色预设、会话最大宽度（窄屏/宽屏/占满全屏）、无障碍屏幕朗读；
  - **快捷键一览**：全局导航快捷键、会话交互快捷键、布局快捷键、分屏与切换面板；
  - **通知中心**：系统通知、智能体操作提示音、音量控制；
  - **模型与用量**：Models & Usage、模型额外额度、Gemini 与 Claude/GPT 模型的周度/5小时动态倒计时重置；
  - **浏览器设置**：内置浏览器、默认打开方式、下载路径、历史记录、子智能体执行规则；
  - **应用程序设置**：开机自启、阻止休眠、常驻系统托盘、跨设备远程控制、WSL 发行版一键关联、客户端版本与自动更新。
- **顶部系统菜单与操作栏**：文件、编辑、视图、窗口、帮助、工作区下拉全菜单；
- **自动化任务 (Automations)**：创建任务、提示词创建、预设计划运行说明；
- **会话画布与工具栏**：输入框占位符、添加上下文 (@)、语音录制、代码审查变更等。

### 2.3 原生级右键上下文菜单拦截

在 Antigravity 中，会话项与项目项的右键菜单是通过 Electron 主进程的 `window:show-context-menu` 调用操作系统原生组件弹出的（非网页 DOM 渲染）。本插件独创了**底层双保险拦截机制**：
- **会话项右键菜单**：重命名、置顶/取消置顶 (`Alt+Shift+P`)、标记为未读/已读、复制（会话名称、会话 ID、项目名称等）、分屏（向右分屏、向下分屏、替换为新会话）、停止、删除/永久删除、还原、归档等；
- **项目项右键菜单**：复制项目名称、项目设置、在文件资源管理器中显示；
- **项目筛选排序菜单**：分组方式（按项目/不分组）、会话排序（最近更新/最新提示词/自定义顺序）、项目排序、自动置顶、仅显示已归档、全部标记为已读。

---

## 3. 三层架构与技术实现原理

为了达成“既能随开随用热更新，又能关机重启常驻有效，且绝不损坏官方原版程序”的目标，本插件采用了三层协同架构：

```
                      ┌───────────────────────────────────────────────┐
                      │          用户界面 (Main World DOM)            │
                      │  动态 MutationObserver + 全事件监听 (毫秒级)  │
                      └──────────────────────▲────────────────────────┘
                                             │ <script> 同步直注入
                      ┌──────────────────────┴────────────────────────┐
                      │          预加载层 (dist/preload.js)           │
                      │  生命周期钩子 + 拦截 window.electronNative    │
                      └──────────────────────▲────────────────────────┘
                                             │ IPC (window:show-context-menu)
                      ┌──────────────────────┴────────────────────────┐
                      │          主进程层 (dist/ipcHandlers.js)       │
                      │  拦截原生右键菜单模板 + 原生顶部菜单 menu.js  │
                      └───────────────────────────────────────────────┘
```

1. **主进程层 (`dist/ipcHandlers.js` & `dist/menu.js`)**：
   在系统构造原生 Context Menu 模板时注入字典拦截，解决普通 DOM 脚本永远无法触及操作系统原生窗口的硬伤。
2. **预加载层 (`dist/preload.js`)**：
   在 Electron 启动初始化阶段，向主世界（Main World）安全注入包含完整词典和动态正则匹配的脚本，无缝兼容沙箱隔离（Context Isolation）。
3. **主世界 DOM 层**：
   结合 `MutationObserver` 与 `click`、`contextmenu`、`pointerdown`、`focusin`、`mouseover` 复合事件监听，实现新节点渲染后 15~50 毫秒内的闪电汉化。

---

## 4. 日常维护与管理指令

### 4.1 随时手动刷新/重新注入

如果您在运行过程中发现某些热加载模块未及时展示中文，或者您临时手动编辑了新词条：

```powershell
node "$env:USERPROFILE\.gemini\config\plugins\chinese-pack\scripts\apply_full_localization.js"
```

该脚本将自动完成底层修补，并通过 Chrome DevTools 协议对当前所有打开的 Antigravity 窗口发起热重载与实时扫面。

### 4.2 应用升级后的重新适配

当 Google 官方推送了 Antigravity 新版本并更新了主程序后，官方的 `app.asar` 可能会被官方覆盖重置。此时您无需重新下载插件，只需再次运行：

```powershell
powershell -ExecutionPolicy Bypass -File .\install.ps1
```

脚本会自动为您重新备份官方新版文件，并无缝写入汉化引擎。

### 4.3 一键无损还原为英文原版

插件在初次运行汉化时，已自动为您的系统原始程序生成了安全备份副本：
`%LOCALAPPDATA%\Programs\antigravity\resources\app.asar.bak`

如果您因为任何原因需要切回官方原版英文环境，只需运行还原脚本：

```powershell
node "$env:USERPROFILE\.gemini\config\plugins\chinese-pack\scripts\restore_original.js"
```

执行后完全重启 Antigravity，即可百分之百恢复官方初始状态，零残留、零风险。

---

## 5. 常见问题解答 (FAQ)

### Q1: 运行脚本时提示 `ExecutionPolicy` 受限？
**A**: 这是 Windows 默认的安全策略。请在执行命令时加入 `-ExecutionPolicy Bypass` 参数，例如：
```powershell
powershell -ExecutionPolicy Bypass -File .\install.ps1
```

### Q2: 为什么右键菜单需要重启客户端才能完全生效？
**A**: 因为右键菜单是通过 Electron 主进程加载的底层 C++/原生模块。虽然网页界面的文本可以实时热更新，但主进程在内存中的事件监听器需要在应用重启（关闭进程后重新打开）时重新加载 `ipcHandlers.js` 补丁。

### Q3: 插件会影响 Antigravity 的性能或网络安全吗？
**A**: 完全不会。
- **纯本地运算**：汉化词典完全内嵌在本地 JavaScript 数组与对象中，没有任何外部网络请求；
- **极低开销**：DOM 监听器只在发生节点增删时触发微任务，对编辑器敲代码、终端运行完全无感知；
- **安全沙箱**：严格遵守 Antigravity 安全边界与权限机制，不触碰任何用户敏感密钥与会话隐私。
