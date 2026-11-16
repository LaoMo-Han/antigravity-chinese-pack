<div align="center">

# Antigravity 简体中文深度语言包
### 🚀 专为 Google Antigravity 打造的全方位深度中文开发环境

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Platform](https://img.shields.io/badge/Platform-Windows%20%7C%20macOS%20%7C%20Linux-brightgreen.svg)]()
[![Antigravity](https://img.shields.io/badge/Antigravity-v2.0%2B-orange.svg)]()
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)]()

[功能特性](#-功能特性) • [一键安装](#-一键快速安装) • [使用指南](docs/USAGE.md) • [技术原理](#-核心技术实现原理) • [一键还原](#-一键无损还原) • [常见问题](#-常见问题-faq)

</div>

---

## 📖 项目简介

**Antigravity 简体中文深度语言包 (`antigravity-chinese-pack`)** 是一套面向 Google Antigravity 桌面客户端与 IDE 的开源深度本地化方案。

传统的简单汉化通常只能替换浅层的固定文本，而无法处理 Electron 原生弹窗、Radix UI 动态层级以及 AI 智能体的交互规范。本项目通过**三层架构**，实现了从**底层主进程原生右键菜单**、**预加载层注入**到**主世界动态 DOM 监听**的全量覆盖，让中国开发者享受真正母语级的流畅开发体验。

---

## 🌟 功能特性

### 1. 系统设置 (Settings) 100% 全模块深度汉化
- **通用设置 (General)**：界面布局模式（知识工作 / 软件工程）、全局安全权限、权限预设、工具细粒度权限、网络访问规则、消息排队、回车发送、终端安全沙箱、Gemini Live 实时语音音色等。
- **模型与用量 (Models & Usage)**：订阅方案 (Google AI Pro/Ultra)、额外 AI 额度、Gemini 与 Claude/GPT 模型的周度与 5 小时配额动态倒计时刷新。
- **外观与主题 (Appearance)**：浅色/深色主题、色彩对比度、字体字号、浅色配色预设、会话最大宽度（窄屏/宽屏/占满全屏）、无障碍屏幕朗读。
- **快捷键一览 (Shortcuts)**：全局导航快捷键、会话交互快捷键、界面布局快捷键、分屏与多面板调度。
- **应用程序设置 (Application)**：开机自启动、阻止休眠、常驻系统托盘、跨设备远程控制、WSL 发行版一键关联、客户端版本信息与自动更新。
- **浏览器设置 (Browser)**：内置浏览器、默认打开方式、下载保存路径、历史记录清理、浏览器子智能体自动化规则。
- **通知中心 (Notifications)**：系统级通知推送权限、智能体操作提示音及音量控制。
- **会话管理 (Conversations)**：Token 消耗详细拆解、规则、技能与 MCP 扩展预算。

### 2. 操作系统原生级右键上下文菜单拦截
- **会话项操作**：重命名、置顶/取消置顶 (`Alt+Shift+P`)、标记为未读/已读、复制（会话名称、会话 ID、项目名称等）、分屏（向右分屏、向下分屏、替换为新会话）、停止、删除/永久删除、还原、归档。
- **项目项操作**：复制项目名称、项目设置、在文件资源管理器中显示（macOS 访达）。
- **项目筛选与排序**：分组方式（按项目/不分组）、会话排序（最近更新/最新提示词/自定义顺序）、项目排序、自动置顶、仅显示已归档、全部标记为已读。

### 3. 全局 AI 智能体规范与专业术语对齐
- 内置 `rules/AGENTS.md`，约束智能体全局采用标准现代简体中文进行分析、规划与代码编写。
- 规范化核心软件术语（如 `Workspace` $\rightarrow$ 工作区，`Artifact` $\rightarrow$ 制品，`Subagent` $\rightarrow$ 子智能体，`Swarm` $\rightarrow$ 蜂群协作等）。
- 严格遵循中英文混排空格规范。

### 4. 自动化任务与对话交互
- 自动化任务 (Automations) 页面：包含创建任务、通过提示词创建、空状态提示及预设计划运行说明。
- 对话交互区域：输入框占位符、添加上下文 (@)、语音模式、权限模式（Turbo / 沙箱 / 逐项确认）、文件变更提示（`X 个文件已变更` 动态匹配）等。

---

## ⚡ 一键快速安装

### 推荐方式：PowerShell 自动化安装

打开 Windows PowerShell，依次执行以下命令即可：

```powershell
# 1. 克隆代码仓库到本地
git clone https://github.com/LaoMo-Han/antigravity-chinese-pack.git
cd antigravity-chinese-pack

# 2. 运行一键安装脚本
powershell -ExecutionPolicy Bypass -File .\install.ps1
```

脚本会自动完成依赖准备、原始文件安全备份、双层补丁打入与当前运行窗口热注入。

> 💡 **提示**：安装完成后，建议**完全退出并重新启动一次 Antigravity 客户端**，以确保 Electron 主进程的原生右键菜单补丁完全加载。

---

## 🛠️ 常用运维指令

### 重新注入或更新汉化（热更新）

如果您临时修改了词条或更新了插件仓库：

```powershell
node "$env:USERPROFILE\.gemini\config\plugins\chinese-pack\scripts\apply_full_localization.js"
```

### 一键无损还原为英文原版

插件在初次安装时已在本地生成了原版备份副本 `app.asar.bak`。随时可以通过以下命令百分之百无损还原回官方原版：

```powershell
node "$env:USERPROFILE\.gemini\config\plugins\chinese-pack\scripts\restore_original.js"
```

---

## 🔬 核心技术实现原理

Antigravity 采用了先进的混合桌面架构，常规的前端脚本无法完全覆盖其全部界面。本插件独创了**三层深度汉化方案**：

```
┌─────────────────────────────────────────────────────────────┐
│ 1. 主进程层 (dist/ipcHandlers.js & dist/menu.js)            │
│    - 拦截 window:show-context-menu 原生右键菜单模板         │
│    - 翻译 Electron 顶部窗口原生系统菜单                     │
├─────────────────────────────────────────────────────────────┤
│ 2. 预加载层 (dist/preload.js)                               │
│    - 拦截 window.electronNative.showContextMenu 数据流      │
│    - 在 DOMContentLoaded 生命周期使用 <script> 直注入主世界  │
├─────────────────────────────────────────────────────────────┤
│ 3. 主世界 DOM 层 (Main World)                               │
│    - MutationObserver 动态监听异步渲染节点                   │
│    - 绑定 click / contextmenu / pointerdown 全事件毫秒级捕获 │
└─────────────────────────────────────────────────────────────┘
```

更详细的架构分析与进阶指南请参阅：👉 [**深度使用指南 (docs/USAGE.md)**](docs/USAGE.md)

---

## 📂 项目结构

```
antigravity-chinese-pack/
├── assets/                     # 插件图标与视觉资源
├── docs/
│   └── USAGE.md                # 深度使用指南与进阶手册
├── rules/
│   └── AGENTS.md               # Antigravity 全局简体中文交互准则
├── scripts/
│   ├── apply_full_localization.js # 全量汉化引擎（主进程+预加载+DOM注入+热更新）
│   ├── on_session_start.js     # 会话启动自动检查钩子
│   ├── restore_original.js     # 官方英文原版一键无损还原脚本
│   └── translate_ui.js         # UI 本地化引擎
├── skills/                     # 内置中文技能库
│   ├── antigravity-chinese-guide # Antigravity 官方中文速查手册
│   └── antigravity-ui-translate  # UI 汉化管理技能
├── hooks.json                  # 生命周期钩子配置
├── install.ps1                 # Windows PowerShell 一键安装程序
├── package.json                # 项目依赖清单
├── plugin.json                 # Antigravity 插件元数据声明
└── README.md                   # 官方说明文档
```

---

## ❓ 常见问题 (FAQ)

#### Q1: 如何将本插件分享给同事或朋友？
可以直接将 GitHub 仓库链接发送给朋友：  
`https://github.com/LaoMo-Han/antigravity-chinese-pack`  
对方只需要在 PowerShell 运行上述的「[一键快速安装](#-一键快速安装)」指令，耗时不到 30 秒即可全自动完成中文化。

#### Q2: 遇到 Google Antigravity 官方推送升级怎么办？
若应用升级后覆盖了主程序文件，只需重新运行一次 `powershell -ExecutionPolicy Bypass -File .\install.ps1`，脚本会自动检测新版并重新写入汉化，您的配置和会话数据不受任何影响。

#### Q3: 为什么右键菜单刚安装完可能需要重启？
因为会话与项目的右键菜单是由 Electron 主进程直接调用的操作系统原生组件。虽然网页 DOM 文本可以实时热生效，但主进程需要应用重启一次以载入最新的 `ipcHandlers` 补丁。

---

## 🤝 参与贡献与致谢

- 欢迎提交 [Issue](https://github.com/LaoMo-Han/antigravity-chinese-pack/issues) 反馈错译、漏译或提出改进建议；
- 欢迎提交 [Pull Request](https://github.com/LaoMo-Han/antigravity-chinese-pack/pulls) 共同完善 Antigravity 中文生态。

---

## 📄 开源许可证

本项目基于 [MIT 许可证](LICENSE) 开源发布。
