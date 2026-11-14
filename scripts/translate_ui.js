/**
 * Antigravity 深度全量汉化引擎 (Full Localization Engine - Comprehensive Edition)
 * 覆盖：
 * 1. 左上/右上全部菜单、分屏、快捷键、侧边栏、系统设置、搜索框
 * 2. 复制子菜单 (Conversation Name, Conversation ID, Project Name, Workspace Name 等)
 * 3. 自动化任务页面 (Create with Prompt, New, No automations yet, 描述段落等)
 * 4. 碎片化 React 节点与 Radix 弹窗 DOM 捕获
 */

const fs = require('fs');
const path = require('path');
const http = require('http');
const asar = require('@electron/asar');

const TRANSLATIONS = {
  // ================= 左上菜单栏与下拉菜单 =================
  "Workspace": "工作区",
  "View": "视图",
  "Window": "窗口",
  "Sidebar": "侧边栏",
  "Help": "帮助",
  "File": "文件",
  "Edit": "编辑",
  "Terminal": "终端",
  "Create Project": "创建新项目",
  "Create New Project": "创建新项目",
  "Command Palette": "命令面板",
  "Open Command Palette": "打开命令面板",
  "New Window": "新建窗口",
  "New Conversation": "新建对话",
  "Connect to WSL": "连接至 WSL",
  "Reopen Locally": "在本地重新打开",
  "Close Window": "关闭窗口",
  "Close": "关闭",
  "Exit": "退出",
  "Minimize": "最小化",
  "Maximize": "最大化",
  "Restore": "还原",
  "Undo": "撤销",
  "Redo": "重做",
  "Cut": "剪切",
  "Copy": "复制",
  "Paste": "粘贴",
  "Select All": "全选",
  "Actual Size": "实际大小",
  "Zoom In": "放大",
  "Zoom Out": "缩小",
  "Reset Zoom": "重置缩放",
  "Toggle Full Screen": "切换全屏",
  "Toggle Developer Tools": "切换开发者工具",
  "Debug Console": "调试控制台",
  "Docs": "官方文档",
  "Learn More": "了解更多",
  "Learn more": "了解详情",
  "About Antigravity": "关于 Antigravity",
  "Check for Updates": "检查软件更新",

  // ================= 右上操作与分屏菜单 =================
  "Rename": "重命名",
  "Pin": "置顶",
  "Unpin": "取消置顶",
  "Archive": "归档",
  "Split": "分屏",
  "Split Right": "向右分屏",
  "Split Down": "向下分屏",
  "Replace with New": "替换为新会话",
  "Remove from Split": "从分屏中移除",
  "More actions": "更多操作",
  "Conversation Log": "对话日志",
  "Review": "审查变更",

  // ================= 复制子菜单 (用户反馈截屏 1) =================
  "Conversation Name": "会话名称",
  "Conversation ID": "会话 ID",
  "Workspace Name": "工作区名称",
  "Worktree Name": "工作区名称",
  "Project Name": "项目名称",
  "Trajectory ID": "会话轨迹 ID",
  "Copy Conversation Markdown": "复制对话 Markdown",
  "Copy Conversation ID": "复制会话 ID",
  "Copy Trajectory ID": "复制轨迹 ID",

  // ================= 自动化任务页面 (用户反馈截屏 2) =================
  "Create with Prompt": "使用提示词创建",
  "New": "新建",
  "+ New": "+ 新建",
  "No automations yet": "暂无自动化任务",
  "No tasks yet": "暂无任务",
  "No automations configured.": "尚未配置自动化任务。",
  "No tasks configured.": "尚未配置任务。",
  "Run a prompt on a schedule, like a morning summary of yesterday's changes. Runs show up here.": "按预设时间表自动运行提示词（例如在每天早晨汇总昨日代码变更）。运行记录将在此显示。",
  "Refresh all credentials": "刷新全部凭据",
  "Creates a local automation that runs on this computer": "创建在此计算机上本地运行的自动化任务",
  "No automations matching your search": "未找到匹配搜索的自动化任务",
  "Uses your local files and tools. Schedules only.": "使用本地文件与工具，仅支持按预设计划定时运行。",
  "Runs even when your computer is off. Schedules and events.": "即使电脑关闭也能在云端运行，支持计划任务与事件触发。",
  "Runs even when your computer is off. Schedules only.": "即使电脑关闭也能在云端运行，仅支持计划任务。",
  "Task": "任务",
  "Where": "运行环境",
  "When": "触发时机",

  // ================= 右上概览与侧边辅助面板 =================
  "概览": "概览",
  "Overview": "概览",
  "审查变更": "审查变更",
  "Files": "文件",
  "终端": "终端",
  "Extensions": "扩展插件",
  "No extensions available": "暂无可用扩展",
  "Subagents": "子智能体",
  "Background Tasks": "后台任务",
  "Artifacts": "生成制品",
  "Files Changed": "文件变更",
  "Terminals": "终端会话",
  "Swarm": "蜂群协作",

  // ================= 顶部快速搜索与右上面板 =================
  "Search or enter a URL": "搜索或输入网址...",
  "Search tabs, files and more": "搜索标签页、文件或输入指令...",
  "Search for content to open": "搜索要打开的内容",
  "Open File": "打开本地文件",
  "Open File Search": "全局快速打开文件",
  "浏览器设置": "浏览器设置",
  "Side Question": "侧边提问",
  "Side Questions": "侧边提问",

  // ================= 侧边栏主导航 =================
  "Automations": "自动化任务",
  "Customizations": "自定义配置与插件",
  "Projects": "项目管理",
  "Settings": "系统设置",
  "Open Folder": "打开本地文件夹",
  "Recent Projects": "最近项目",
  "All Conversations": "全部会话",
  "Archived": "已归档会话",
  "Local Checkout": "本地工作区",
  "Search Conversations": "搜索历史会话",
  "Toggle Sidebar": "切换侧边栏",
  "Toggle Side Panel": "切换侧边面板",
  "Toggle Overview Panel": "切换概览面板",
  "Notifications": "通知中心",
  "Display Options": "显示设置",

  // ================= 系统设置：左侧分类列表 =================
  "General": "通用设置",
  "Appearance": "外观设置",
  "Shortcuts": "快捷键一览",
  "Models": "模型与配额",
  "Browser": "浏览器设置",
  "Application": "应用程序设置",
  "Account": "账户与方案",
  "Give Feedback": "提供意见反馈",
  "Developer": "开发者选项",
  "Not in Project": "全局设置 (未关联项目)",
  "Conversations": "会话管理",

  // ================= 系统设置：通用设置 (General) =================
  "Configure agent execution, queued message delivery, and permissions.": "配置智能体执行策略、排队消息发送时机与安全权限预设。",
  "Interface Layout": "界面布局模式",
  "Knowledge Work": "知识工作模式",
  "Simplified interface for research, writing, and everyday tasks.": "适合调研、写作、规划和日常任务的轻量精简界面。",
  "Software Engineering": "软件工程模式",
  "Full interface for coding, developer tools, and managing agents.": "包含代码编辑、开发者工具和智能体编排的完整开发界面。",
  "Global Permissions": "全局安全权限",
  "Configure global allowed and denied resource permissions.": "配置全局允许与拒绝访问的系统资源与文件权限。",
  "Permission Preset": "权限预设模式",
  "Controls the actions the agent can take.": "控制智能体在当前环境下可自动执行的操作范围。",
  "Tool Permissions": "工具细粒度权限",
  "Modify permissions for file, terminal, and MCP tools.": "自定义文件读写、终端指令和 MCP 扩展工具的授权策略。",
  "Open": "打开配置",
  "Network Access Rules": "网络访问规则",
  "Configure allowed and denied URLs for reading.": "配置允许读取与禁止访问的网页与 API 域名列表。",
  "Execution": "执行策略",
  "Queued Messages": "排队消息发送策略",
  "Configure when follow-up messages are sent.": "配置当智能体正在运行时代办追加消息的发送时机。",
  "Queue": "排队等待",
  "Send Immediately": "立即发送并打断",
  "Interrupt the agent and send immediately.": "打断当前智能体运行并立即发送新消息。",
  "Queue until after the current turn.": "排队等待，直到当前轮次任务完全结束后再发送。",
  "Enter to Send": "回车键直接发送",
  "Send messages with the keyboard's Enter key instead of starting a new line.": "使用键盘 Enter 键直接发送消息，而非换行（换行使用 Shift+Enter）。",
  "Agent Non-Workspace File Access": "工作区外文件访问权限",
  "Allow the agent to automatically view and edit files outside the current workspace. Use with caution: this gives the agent access to additional potentially-relevant information, but also allows the agent to access credential files, secrets, and other files outside of the workspace that could be targeted in prompt injection attacks or other exploits by malicious actors.": "允许智能体自动读取和编辑当前工作区之外的文件。请谨慎开启：这赋予了智能体更广的上下文视野，但也使其有权限触及工作区之外的敏感凭证与密钥。",
  "Command Setup Script": "命令预处理脚本",
  "A shell setup script run before every command the agent executes.": "在智能体执行每条终端指令前默认运行的 Shell 环境初始化脚本。",
  "Enable Terminal Sandbox": "启用终端安全沙箱",
  "Run terminal commands with sandbox restrictions.": "在安全沙箱隔离限制下运行终端命令，防止未经授权的系统级修改。",
  "Sandbox Allow Network": "沙箱允许网络访问",
  "Allow sandboxed commands to make network requests.": "允许沙箱内的指令向外部网络发起连接请求。",
  "Terminal Command Auto Execution": "终端命令自动执行策略",
  "Controls whether terminal commands require your approval before running.": "控制终端指令在执行前是否需要您手动点击确认。",

  // ================= 系统设置：账户与方案 (Account) =================
  "Manage your plan, credentials, and general preferences.": "管理您的方案订阅、身份凭证与基础偏好。",
  "Enable Telemetry": "启用匿名遥测数据收集",
  "When toggled on, Antigravity collects usage data to help Google enhance performance and features.": "开启后，Antigravity 将收集匿名使用数据以帮助 Google 持续优化性能与功能体验。",
  "Marketing Emails": "营销与产品动态邮件",
  "Receive product updates, tips, and promotions from Google Antigravity via email.": "通过电子邮件接收来自 Google Antigravity 的新功能发布、技巧指南与重要通知。",
  "Your Plan: Google AI Pro": "当前订阅方案：Google AI Pro",
  "You can upgrade to a Google AI Ultra plan to receive higher rate limits.": "您可以升级到 Google AI Ultra 方案以获得更高的请求速率与模型配额上限。",
  "Upgrade": "升级方案",
  "Sign Out": "退出登录",
  "By using this app, you agree to its": "使用本软件即表示您已知晓并同意其",
  "Terms of Service": "服务条款",
  "Email": "电子邮箱",

  // ================= 系统设置：语音模式 (Voice mode) =================
  "Keyboard shortcuts": "键盘快捷键一览",
  "Voice mode": "语音交互模式",
  "Voice": "回复音色",
  "The voice used in Voice mode. Powered by Gemini Live.": "Voice 语音交互模式下智能体使用的发声音色，由 Gemini Live 驱动。",
  "Not set": "未设置",
  "Change": "更改设置",
  "Microphone": "麦克风输入设备",
  "Input device for voice mode and dictation.": "用于实时语音对话与听写输入的音频设备。",
  "System default": "系统默认设备",
  "Volume": "语音回复音量",
  "How loud Antigravity's voice is.": "Antigravity 朗读与语音回复的发声音量大小。",

  // ================= 系统设置：外观与主题 (Appearance) =================
  "Configure the agent's visual theme and display preferences.": "配置智能体的视觉主题风格、字体与界面显示选项。",
  "Chat": "对话设置",
  "Conversation Steps": "会话思考过程展开",
  "Choose how much detail is shown during a conversation.": "选择会话进行过程中各项操作与思考细节的展示详略程度。",
  "Default": "默认折叠",
  "Verbose": "详细展开",
  "Theme": "界面主题",
  "Light": "浅色模式",
  "Dark": "深色模式",
  "System": "跟随系统",
  "Contrast": "视觉对比度",
  "Strong": "高对比度",
  "Font": "界面字体",
  "Font Size": "字体大小",
  "Light Theme": "浅色主题样式",
  "Dark Theme": "深色主题样式",
  "Preset": "预设配色方案",
  "Default Light": "默认浅色 (Default Light)",
  "Default Dark": "默认深色 (Default Dark)",
  "Background": "背景颜色",
  "Foreground": "前景色",
  "Accent": "强调高亮色",
  "Code Preview": "代码语法高亮预览",
  "Advanced Settings": "高级外观设置",
  "Chat Layout": "对话画布布局",
  "Conversation Width": "会话内容最大宽度",
  "Configure the maximum width of the conversation panel.": "配置对话面板居中显示的最大宽度范围。",
  "Narrow": "窄屏居中 (Narrow)",
  "Wide": "宽屏居中 (Wide)",
  "Fill": "占满全屏 (Fill)",
  "Accessibility": "辅助功能 / 无障碍",
  "Screen Reader Mode": "屏幕朗读器模式",
  "Optimize the interface and terminal output for screen readers.": "针对屏幕朗读器辅助工具深度优化无障碍标签与终端输出格式。",
  "Terminal Placement": "终端停靠位置",
  "Markdown Artifact Width": "制品 (Artifacts) 呈现宽度",
  "Context and Quota Indicator": "上下文与配额占用指示条",

  // ================= 系统设置：通知与声音 (Notifications) =================
  "Manage your notification preferences.": "管理系统通知推送与声音提醒偏好。",
  "Enable Notifications for Agent": "启用智能体系统通知",
  "Show system notifications when your action is needed or the agent finishes.": "当智能体需要您审批操作或任务圆满完成时，弹出系统通知提醒。",
  "Sound": "提示声音",
  "Enable Sounds for Agent": "启用智能体提示音",
  "Play a sound when your action is needed or the agent finishes.": "当智能体需要您审批操作或任务结束时，播放提示音效。",
  "Set the volume of agent sounds.": "调整智能体提示音效的音量大小。",

  // ================= 系统设置：自定义扩展 (Customizations) =================
  "Configure default behaviors, skills, and MCP servers.": "配置智能体默认行为规则、扩展技能与 MCP 工具服务。",
  "Token Usage": "Token 用量分析",
  "The breakdown below shows token usage from customizations like rules, skills, and MCP. If a budget is exceeded, large rules are demoted to path pointers and large customizations are excluded automatically.": "下方展示了规则 (Rules)、技能 (Skills) 与 MCP 扩展在上下文中的 Token 消耗明细。如果超出预算，大型规则将自动降级为路径指针以节省空间。",
  "Rules": "规则准则 (Rules)",
  "Other Customizations": "其他自定义项",
  "Skills": "能力技能 (Skills)",
  "Plugins": "插件扩展 (Plugins)",
  "Build With Google Plugins": "Google 官方扩展生态",
  "Browse and enable plugins from the Build With Google catalog.": "浏览并启用来自 Google 官方目录的扩展套件与能力包。",
  "Customize": "自定义配置",
  "Customize Global Skills": "自定义全局技能",
  "Custom Agents": "自定义子智能体",
  "MCP Servers": "MCP 服务器集成",
  "Global": "全局",
  "Show 1 breakdown": "展开用量明细",
  "Show 2 breakdowns": "展开用量明细",

  // ================= 系统设置：浏览器 (Browser) =================
  "Configure built-in browser, link opening, and browser subagent preferences.": "配置内置浏览器、外部链接跳转规则与浏览器子智能体偏好。",
  "Built-in Browser": "内置浏览器",
  "Open Links In": "默认链接打开方式",
  "Choose where links open by default when clicked.": "选择点击界面超链接时，默认是在内置浏览器还是外部系统浏览器中打开。",
  "External Browser": "外部系统浏览器",
  "Side Panel": "侧边面板 (Side Panel)",
  "Download Location": "下载文件保存路径",
  "Folder where files downloaded in the built-in browser are saved.": "在内置浏览器中下载文件时默认保存的本地磁盘目录。",
  "Browsing History": "浏览历史与缓存",
  "Clear visited URLs and autocomplete suggestions from the built-in browser.": "清除内置浏览器中记录的访问历史与输入自动补全建议。",
  "Clear": "立即清空",
  "Browser Subagent": "浏览器子智能体",
  "Browser Actuation Rules": "浏览器自动化执行规则",
  "Configure allowed and denied URLs for the browser subagent. It runs in the built-in browser, so no separate browser install is needed.": "配置浏览器子智能体允许与禁止访问的目标 URL。智能体在内置浏览器内安全运行，无需单独安装第三方浏览器。",
  "Browser Javascript Execution Policy": "浏览器脚本执行安全策略",

  // ================= 系统设置：应用程序 (Application) =================
  "Manage Antigravity app settings.": "管理 Antigravity 桌面客户端偏好与操作系统集成。",
  "Prevent Sleep": "运行时阻止电脑休眠",
  "Prevent the computer from sleeping while the app is running.": "在任务运行过程中阻止计算机自动进入睡眠或休眠状态。",
  "Keep In Menu Bar": "关闭窗口后常驻托盘",
  "Keep the app accessible from the menu bar and running in the background when all windows are closed.": "当所有应用窗口关闭时，保持软件在后台常驻运行，并可通过系统托盘/菜单栏快速呼出。",
  "Remote Control": "跨设备远程控制",
  "Enable Remote Control": "启用远程控制模式",
  "Work with local agents from another device.": "允许通过授权网络从手机、平板或其他电脑远程连接并操控本地智能体。",
  "Notification Settings": "操作系统通知权限",
  "To modify notification settings, open your operating system's system preferences.": "如需调整系统级通知横幅与静音权限，请前往操作系统的系统设置。",
  "Open System Preferences": "打开系统设置",
  "Windows Subsystem for Linux": "WSL (Windows 适用于 Linux 的子系统)",
  "Run the app against a Linux environment. Connecting relaunches the app into the selected WSL distro.": "在 Linux 环境下运行本客户端。连接后应用将自动重启并切换至选中的 WSL 发行版。",
  "Connect": "立即连接",
  "Version": "客户端版本",
  "App version": "应用软件版本",
  "Automatic Check for Updates": "自动检查软件更新",

  // ================= 系统设置：模型与配额 (Models & Usage) =================
  "Models & Usage": "模型与配额管理",
  "Manage your model quota and credits.": "查看并管理您的模型每日配额、计费状态与 AI 额度点数。",
  "Plan": "当前方案",
  "Your Plan:": "当前方案：",
  "Google AI Pro": "Google AI 专业版 (Pro)",
  "Model Credits": "模型抵扣点数",
  "Enable AI Credit Overages": "启用 AI 点数超额抵扣",
  "When toggled on, Antigravity will use your AI credits to fulfill model requests once you're out of model quota. Antigravity will always use your model quota first before using AI credits.": "开启后，当今日免费模型配额用尽时，Antigravity 将自动使用您的 AI 点数继续响应开发请求。系统将始终优先消耗免费额度。",
  "Model Quota": "模型配额余量",

  // ================= 系统设置：意见反馈 (Give Feedback) =================
  "Feedback Type": "反馈类型",
  "Bug Report": "问题缺陷报告 (Bug Report)",
  "Feature Request": "新功能与优化建议 (Feature Request)",
  "Auth and Billing": "账号登录与计费问题",
  "Remote Control Issue": "远程连接相关故障",
  "General Feedback": "常规产品体验与建议",
  "Description": "问题详细描述",
  "Please describe the issue in detail. The more actionable your feedback, the quicker our team can address your request. Some helpful information includes:": "请详细描述您遇到的问题。提供的信息越清晰完整，团队就能越快进行排查与修复：",
  "Steps to reproduce the issue": "重现该问题的操作步骤",
  "Expected behavior": "符合预期的正确表现",
  "Actual behavior": "实际出现的异常现象",
  "Any error messages": "收到的任何报错提示文本",
  "Any relevant information": "其他相关的日志或上下文",
  "Steps to Reproduce": "复现步骤",
  "Attach a screenshot (optional)": "附带屏幕截图（可选）",
  "Attach Antigravity server logs": "附带 Antigravity 本地调试日志",
  "Submit": "确认提交反馈",
  "Visit": "访问",
  "Legal Help": "法律帮助中心",
  "to ask for content changes for legal reasons.": "以出于法律原因申请内容调整。",

  // ================= 系统设置：快捷键一览 (Shortcuts) =================
  "Keyboard shortcuts for quick navigation and control.": "常用键盘快捷键速查表，助您极速导航与掌控智能体。",
  "Navigation": "全局导航快捷键",
  "Open Conversation Picker": "打开历史会话选择器",
  "New Tab": "新建标签页",
  "Reopen Closed Tab": "重新打开已关闭的标签页",
  "Select Previous Conversation": "切换至上一个会话",
  "Select Next Conversation": "切换至下一个会话",
  "Move Conversation Up": "将会话顺序上移",
  "Move Conversation Down": "将会话顺序下移",
  "Previous Side Panel Tab": "切换至上一个侧边面板标签",
  "Next Side Panel Tab": "切换至下一个侧边面板标签",
  "Open Settings": "打开系统设置",
  "Conversation": "对话与输入快捷键",
  "Focus Input": "光标快速聚焦到输入框",
  "Submit Prompt (Alternate to Enter)": "提交消息（Enter 的备用快捷键）",
  "Enter always submits. This adds a second shortcut.": "Enter 键默认会发送消息。此处可额外绑定第二组快捷键。",
  "Jump to Previous Prompt": "跳转到上一条提问",
  "Jump to Next Prompt": "跳转到下一条提问",
  "Toggle Model Selector": "打开模型选择菜单",
  "Toggle Voice Recording": "开始 / 结束语音录制",
  "Mute Voice Mic": "静音麦克风",
  "Mute Voice Speaker": "静音语音播报",
  "Find in Pane": "在当前面板中查找",
  "Add to Chat/Quote": "引用内容至对话输入框",
  "Pin / Unpin Conversation": "置顶 / 取消置顶当前会话",
  "Archive This Conversation": "归档当前会话",
  "Layout Controls": "界面布局与缩放快捷键",
  "Toggle Maximize Side Panel": "最大化 / 还原侧边面板",
  "Toggle Terminal": "呼出 / 隐藏内置终端",

  // ================= 系统设置：开发者选项 (Developer) =================
  "Developer-only tools. These settings do not affect other users.": "仅限开发者调试工具，这些选项不会影响正常功能。",
  "Whatever the voice-engine-addr flag serves you.": "根据 voice-engine-addr 启动参数提供的语音服务服务。",
  "Default (Mendel)": "默认语音引擎 (Mendel)",
  "Voice engine": "语音合成引擎",
  "Voice Mode": "语音模式设置",

  // ================= 对话交互与通用按钮 =================
  "Ask anything, @ to mention, / for actions": "输入任何问题，输入 @ 引用上下文，输入 / 调出快捷操作...",
  "Message input": "输入消息或指令...",
  "Type a message...": "输入消息或指令...",
  "Add context": "添加上下文 (@)",
  "Record voice memo": "录制语音备忘",
  "Start Voice mode": "开启语音模式",
  "Cancel (Ctrl+D)": "取消当前任务 (Ctrl+D)",
  "Cancel": "取消",
  "Stop generating": "停止生成",
  "Scroll to Bottom": "滚动到底部",
  "Undo to this point": "撤销到此节点",
  "Fork from here": "从此处分叉对话",
  "Delete Conversation": "删除会话",
  "Rename Conversation": "重命名会话",
  "Export Conversation": "导出完整会话",
  "Typeahead menu": "快捷菜单",
  "Turbo": "Turbo 极速",
  "Medium": "中等规模",
  "Large": "大规模",
  "Proceed in Sandbox": "沙箱安全运行",
  "Request Review": "逐项人工确认",
  "Strict": "严格审批模式",
  "Approve": "允许执行",
  "Reject": "拒绝执行",
  "Always Allow": "始终允许",
  "Proceed": "确认继续",
  "Save": "保存",
  "Apply": "应用",
  "Refresh": "刷新",
  "Installed": "已安装",
  "Enabled": "已启用",
  "Disabled": "已停用",
  "Enable": "启用",
  "Disable": "停用",
  "Uninstall": "卸载",
  "Install": "安装",
  "Change…": "更改路径…",
  "Change": "更改"
};

// 获取 DevToolsActivePort
function getDevToolsPort() {
  const possiblePaths = [
    path.join(process.env.APPDATA || '', 'Antigravity', 'DevToolsActivePort'),
    path.join(process.env.LOCALAPPDATA || '', 'Antigravity', 'DevToolsActivePort')
  ];

  for (const p of possiblePaths) {
    if (fs.existsSync(p)) {
      try {
        const content = fs.readFileSync(p, 'utf8').trim();
        const port = parseInt(content.split('\n')[0].trim());
        if (port && !isNaN(port)) return port;
      } catch (e) {}
    }
  }
  return null;
}

function fetchJson(port, pathStr) {
  return new Promise((resolve, reject) => {
    http.get(`http://127.0.0.1:${port}${pathStr}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

function generateInjectionScript() {
  return `
    (() => {
      const dict = ${JSON.stringify(TRANSLATIONS)};
      window.__AGY_TRANSLATION_DICT__ = dict;

      function translateText(text) {
        if (!text) return text;
        const trimmed = text.trim();
        if (dict[trimmed]) {
          return text.replace(trimmed, dict[trimmed]);
        }

        // 动态前缀/模板匹配
        if (trimmed.startsWith("No ") && trimmed.endsWith(" yet")) {
          const middle = trimmed.slice(3, -4).trim();
          if (middle === "automations") return "暂无自动化任务";
          if (middle === "tasks") return "暂无任务";
          return "暂无" + (dict[middle] || middle);
        }
        if (trimmed.startsWith("Select model, current:")) {
          return trimmed.replace("Select model, current:", "选择模型（当前：") + "）";
        }
        if (trimmed.startsWith("Agent permissions preset selector, current:")) {
          return trimmed.replace("Agent permissions preset selector, current:", "权限预设选择（当前：") + "）";
        }
        if (trimmed.startsWith("Send feedback as ")) {
          return trimmed.replace("Send feedback as ", "以该身份发送反馈：");
        }
        if (trimmed.startsWith("Your Plan: ")) {
          return trimmed.replace("Your Plan: ", "当前方案：");
        }
        if (trimmed.startsWith("Plugin: ")) {
          return trimmed.replace("Plugin: ", "插件：");
        }
        if (trimmed.startsWith("Version ")) {
          return trimmed.replace("Version ", "版本 ");
        }
        return text;
      }

      function translateNode(node) {
        if (!node) return;
        if (node.nodeType === Node.TEXT_NODE) {
          const val = node.nodeValue;
          const translated = translateText(val);
          if (translated !== val) {
            node.nodeValue = translated;
          }
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          const tag = node.tagName;
          if (tag === 'CODE' || tag === 'PRE' || (node.classList && node.classList.contains('monaco-editor'))) {
            return;
          }

          // 解决 React 碎片化文本节点 (如 <h2>No automations yet</h2>)
          if (node.children.length === 0 && node.childNodes.length > 0 && node.innerText) {
            const raw = node.innerText.trim();
            const tr = translateText(raw);
            if (tr !== raw) {
              node.textContent = tr;
              return;
            }
          }

          if (node.placeholder) {
            const tr = translateText(node.placeholder);
            if (tr !== node.placeholder) node.placeholder = tr;
          }
          if (node.title) {
            const tr = translateText(node.title);
            if (tr !== node.title) node.title = tr;
          }
          if (node.getAttribute) {
            const aria = node.getAttribute('aria-label');
            if (aria) {
              const tr = translateText(aria);
              if (tr !== aria) node.setAttribute('aria-label', tr);
            }
            const tooltip = node.getAttribute('data-tooltip');
            if (tooltip) {
              const tr = translateText(tooltip);
              if (tr !== tooltip) node.setAttribute('data-tooltip', tr);
            }
          }
        }
      }

      function walkAndTranslate(root) {
        if (!root) return;
        translateNode(root);

        const walker = document.createTreeWalker(
          root,
          NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT,
          {
            acceptNode: function(n) {
              if (n.nodeType === Node.ELEMENT_NODE) {
                if (n.tagName === 'SCRIPT' || n.tagName === 'STYLE') return NodeFilter.FILTER_REJECT;
                if (n.tagName === 'CODE' || n.tagName === 'PRE' || (n.classList && n.classList.contains('monaco-editor'))) {
                  return NodeFilter.FILTER_REJECT;
                }
              }
              return NodeFilter.FILTER_ACCEPT;
            }
          }
        );

        let n;
        while (n = walker.nextNode()) {
          translateNode(n);
        }
      }

      window.__AGY_TRANSLATOR_RUN__ = () => walkAndTranslate(document.body);

      // 立即对已有 DOM 进行全量翻译
      walkAndTranslate(document.body);

      // 清除旧的 Observer (避免使用旧闭包)
      if (window.__AGY_OBSERVER__) {
        try { window.__AGY_OBSERVER__.disconnect(); } catch (e) {}
      }

      // 创建新的 MutationObserver
      window.__AGY_OBSERVER__ = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
          if (mutation.type === 'childList') {
            for (const addedNode of mutation.addedNodes) {
              walkAndTranslate(addedNode);
            }
          } else if (mutation.type === 'characterData') {
            translateNode(mutation.target);
          }
        }
      });

      window.__AGY_OBSERVER__.observe(document.body, {
        childList: true,
        subtree: true,
        characterData: true
      });

      // 捕获式 Click / MouseOver 监听：任何菜单展开即时翻译
      if (!window.__AGY_CLICK_BOUND__) {
        window.__AGY_CLICK_BOUND__ = true;
        document.addEventListener('click', () => {
          requestAnimationFrame(() => walkAndTranslate(document.body));
          setTimeout(() => walkAndTranslate(document.body), 40);
          setTimeout(() => walkAndTranslate(document.body), 120);
          setTimeout(() => walkAndTranslate(document.body), 250);
        }, true);

        document.addEventListener('mouseover', (e) => {
          if (e.target && (e.target.getAttribute?.('role') === 'menuitem' || e.target.closest?.('[role=\"menu\"], [class*=\"popover\"], [class*=\"dropdown\"]'))) {
            setTimeout(() => walkAndTranslate(document.body), 40);
            setTimeout(() => walkAndTranslate(document.body), 100);
          }
        }, true);
      }

      console.log('[Antigravity 汉化] 极速捕获与全量深度 DOM 监听已更新生效！');
      return 'SUCCESS';
    })()
  `;
}

async function injectTranslationToLiveWindow(wsUrl) {
  return new Promise((resolve) => {
    const ws = new WebSocket(wsUrl);
    ws.onopen = () => {
      ws.send(JSON.stringify({
        id: 600,
        method: 'Runtime.evaluate',
        params: { expression: generateInjectionScript(), returnByValue: true }
      }));
    };

    ws.onmessage = (e) => {
      try {
        const resp = JSON.parse(e.data);
        if (resp.id === 600) {
          resolve(resp.result?.result?.value || 'OK');
          ws.close();
        }
      } catch (err) {
        resolve('ERROR');
        ws.close();
      }
    };

    ws.onerror = () => resolve('FAILED');
  });
}

// 深度修补 app.asar
async function patchAsarPermanently() {
  const asarPath = 'C:\\Users\\GAIL\\AppData\\Local\\Programs\\antigravity\\resources\\app.asar';
  const asarBakPath = 'C:\\Users\\GAIL\\AppData\\Local\\Programs\\antigravity\\resources\\app.asar.bak';
  const tempExtractDir = path.join(__dirname, '..', '.temp_asar_extract');

  if (!fs.existsSync(asarPath)) return;

  if (!fs.existsSync(asarBakPath)) {
    console.log('正在备份原版: app.asar.bak ...');
    fs.copyFileSync(asarPath, asarBakPath);
  }

  console.log('正在更新 app.asar 汉化底层补丁...');
  if (fs.existsSync(tempExtractDir)) {
    fs.rmSync(tempExtractDir, { recursive: true, force: true });
  }
  asar.extractAll(asarPath, tempExtractDir);

  // 1. 修补 dist/menu.js
  const menuPath = path.join(tempExtractDir, 'dist', 'menu.js');
  if (fs.existsSync(menuPath)) {
    let menuContent = fs.readFileSync(menuPath, 'utf8');
    const menuPatch = `
      // --- Antigravity 中文顶部菜单补丁 ---
      const AGY_MENU_DICT = {
        'File': '文件 (&F)',
        'Edit': '编辑 (&E)',
        'View': '视图 (&V)',
        'Window': '窗口 (&W)',
        'Help': '帮助 (&H)',
        'New Window': '新建窗口',
        'Connect to WSL': '连接至 WSL',
        'Reopen Locally': '在本地重新打开',
        'Close Window': '关闭窗口',
        'Exit': '退出',
        'Undo': '撤销',
        'Redo': '重做',
        'Cut': '剪切',
        'Copy': '复制',
        'Paste': '粘贴',
        'Select All': '全选',
        'Actual Size': '实际大小',
        'Zoom In': '放大',
        'Zoom Out': '缩小',
        'Toggle Full Screen': '切换全屏',
        'Toggle Developer Tools': '切换开发者工具',
        'Debug Console': '调试控制台',
        'Minimize': '最小化',
        'Maximize': '最大化',
        'Close': '关闭',
        'Docs': '官方文档',
        'Check for Updates': '检查更新',
        'About Antigravity': '关于 Antigravity'
      };
      function localizeMenuTree(m) {
        if (!m || !m.items) return;
        m.items.forEach(it => {
          if (it.label && AGY_MENU_DICT[it.label]) {
            it.label = AGY_MENU_DICT[it.label];
          }
          if (it.submenu) localizeMenuTree(it.submenu);
        });
      }
    `;

    if (!menuContent.includes('AGY_MENU_DICT')) {
      menuContent = menuPatch + '\n' + menuContent;
      menuContent = menuContent.replace(
        'electron_1.Menu.setApplicationMenu(menu);',
        'localizeMenuTree(menu);\n    electron_1.Menu.setApplicationMenu(menu);'
      );
      fs.writeFileSync(menuPath, menuContent, 'utf8');
    }
  }

  // 2. 修补 dist/preload.js
  const preloadPath = path.join(tempExtractDir, 'dist', 'preload.js');
  if (fs.existsSync(preloadPath)) {
    let preloadContent = fs.readFileSync(preloadPath, 'utf8');
    const preloadPatch = `
      // --- Antigravity 界面自动深度汉化引擎 ---
      window.addEventListener('DOMContentLoaded', () => {
        try {
          ${generateInjectionScript()}
        } catch (e) {
          console.error('[Antigravity 汉化] 启动注入失败:', e);
        }
      });
    `;

    if (preloadContent.includes('// --- Antigravity 界面自动深度汉化引擎 ---')) {
      const startIdx = preloadContent.indexOf('// --- Antigravity 界面自动深度汉化引擎 ---');
      preloadContent = preloadContent.slice(0, startIdx) + preloadPatch;
    } else {
      preloadContent = preloadContent + '\n' + preloadPatch;
    }
    fs.writeFileSync(preloadPath, preloadContent, 'utf8');
  }

  // 3. 重新打包
  await asar.createPackage(tempExtractDir, asarPath);
  fs.rmSync(tempExtractDir, { recursive: true, force: true });
  console.log('底层 app.asar 汉化补丁更新成功！');
}

async function main() {
  console.log('正在执行全方位汉化更新 (复制子菜单 + 自动化任务页面)...');
  const port = getDevToolsPort();
  if (port) {
    try {
      const targets = await fetchJson(port, '/json');
      const validPages = targets.filter(t => t.type === 'page' && t.webSocketDebuggerUrl);
      for (const page of validPages) {
        await injectTranslationToLiveWindow(page.webSocketDebuggerUrl);
      }
      console.log('当前运行窗口的捕获式监听器与全量词典已热更新完毕！');
    } catch (e) {
      console.warn('热注入警告:', e.message);
    }
  }

  await patchAsarPermanently();
  console.log('全方位深度汉化补丁部署完成！');
}

main().catch(console.error);
