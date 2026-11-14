/**
 * Antigravity 深度全量汉化引擎 (Full Localization Engine - Comprehensive Edition v3.5)
 * 覆盖：
 * 1. 深度修补 Electron 主进程 dist/ipcHandlers.js，原生级汉化会话右键上下文菜单 (window:show-context-menu)
 * 2. 深度修补 Electron 预加载层 dist/preload.js，在 IPC 发送前拦截并汉化菜单项，并向主世界注入 DOM 汉化引擎
 * 3. 深度修补 Electron 原生顶部菜单 dist/menu.js
 * 4. 毫秒级 DOM 变动与全事件捕获引擎，覆盖所有设置、弹窗、级联子菜单、快捷键与页面元素
 */

const fs = require('fs');
const path = require('path');
const http = require('http');

let asar;
try {
  asar = require('@electron/asar');
} catch (e) {
  asar = require(path.join(__dirname, '..', 'node_modules', '@electron', 'asar'));
}

const TRANSLATIONS = {
  // ================= 会话右键原生上下文菜单 (用户反馈重点) =================
  "Rename": "重命名",
  "Pin": "置顶",
  "Unpin": "取消置顶",
  "Mark Unread": "标记为未读",
  "Mark as Unread": "标记为未读",
  "Mark Read": "标记为已读",
  "Mark as Read": "标记为已读",
  "Copy": "复制",
  "Split": "分屏",
  "Stop": "停止",
  "Delete": "删除",
  "Delete Permanently": "永久删除",
  "Restore": "还原",
  "Archive": "归档",
  "Unarchive": "取消归档",
  "Share": "分享",
  "Fork": "分叉对话",
  "Telemetry": "遥测数据",
  "View Debug": "查看调试信息",
  "Delete Conversation": "删除会话",
  "Delete Project": "删除项目",
  "Delete Task": "删除任务",
  "Remove": "移除",

  // ================= 复制子菜单 =================
  "Conversation Name": "会话名称",
  "Conversation ID": "会话 ID",
  "Workspace Name": "工作区名称",
  "Worktree Name": "工作区名称",
  "Project Name": "项目名称",
  "Trajectory ID": "会话轨迹 ID",
  "Copy Conversation Markdown": "复制对话 Markdown",
  "Copy Conversation ID": "复制会话 ID",
  "Copy Trajectory ID": "复制轨迹 ID",
  "Copy Link": "复制链接",
  "Copy Markdown": "复制 Markdown",
  "Copy Path": "复制文件路径",
  "Copy Relative Path": "复制相对路径",

  // ================= 分屏子菜单 =================
  "Split Right": "向右分屏",
  "Split Down": "向下分屏",
  "Replace with New": "替换为新会话",
  "Remove from Split": "从分屏中移除",
  "More actions": "更多操作",
  "Conversation Log": "对话日志",
  "Review": "审查变更",

  // ================= 左上菜单栏与下拉菜单 =================
  "Workspace": "工作区",
  "View": "视图",
  "Window": "窗口",
  "Sidebar": "侧边栏",
  "Help": "帮助",
  "File": "文件",
  "Edit": "编辑",
  "Terminal": "终端",
  "Create Project": "创建项目",
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

  // ================= 自动化任务页面 =================
  "Create with Prompt": "使用提示词创建",
  "+ Create with Prompt": "+ 使用提示词创建",
  "New": "新建",
  "+ New": "+ 新建",
  "No automations yet": "暂无自动化任务",
  "No tasks yet": "暂无任务",
  "No automations configured.": "尚未配置自动化任务。",
  "No tasks configured.": "尚未配置任务。",
  "Run a prompt on a schedule, like a morning summary of yesterday's changes. Runs show up here.": "按计划定期运行提示词，例如每天早晨汇总昨天的变更。运行记录将显示在此处。",
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
  "Extensions": "扩展",
  "No extensions available": "暂无可用扩展",
  "Subagents": "子智能体",
  "Background Tasks": "后台任务",
  "Artifacts": "生成制品",
  "Files Changed": "文件变更",
  "Terminals": "终端会话",
  "Swarm": "蜂群协作",

  // ================= 顶部快速搜索与右上面板 =================
  "Search or enter a URL": "搜索或输入网址",
  "Search tabs, files and more": "搜索标签页、文件或输入指令...",
  "Search for content to open": "搜索要打开的内容",
  "Open File": "打开文件",
  "Open File Search": "全局快速打开文件",
  "Browser Settings": "浏览器设置",
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
  "Manage Subscription": "管理订阅",
  "Sign Out": "退出登录",

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
  "Change": "更改",
  "Recent": "最近",
  "Today": "今天",
  "Yesterday": "昨天",
  "Previous 7 days": "过去 7 天",
  "Previous 30 days": "过去 30 天",
  "Older": "更早",
  "Clear": "清除",
  "Clear All": "全部清除",
  "Filter": "筛选",
  "Search": "搜索",
  "Sort by": "排序方式",
  "Name": "名称",
  "Date": "日期",
  "Status": "状态",
  "Actions": "操作",
  "Loading...": "加载中...",
  "No results found": "未找到结果",
  "None": "无"
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
          if (!val) return;
          const trimmed = val.trim();
          if (!trimmed) return;
          const translated = translateText(trimmed);
          if (translated !== trimmed) {
            node.nodeValue = val.replace(trimmed, translated);
          }
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          const tag = node.tagName;
          if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'CODE' || tag === 'PRE' || (node.classList && node.classList.contains('monaco-editor'))) {
            return;
          }

          if (node.childNodes.length === 1 && node.childNodes[0].nodeType === Node.TEXT_NODE) {
            const raw = node.childNodes[0].nodeValue;
            if (raw) {
              const trimmed = raw.trim();
              const tr = translateText(trimmed);
              if (tr !== trimmed) {
                node.childNodes[0].nodeValue = raw.replace(trimmed, tr);
              }
            }
          }

          if (node.placeholder) {
            const tr = translateText(node.placeholder.trim());
            if (tr !== node.placeholder.trim()) {
              node.placeholder = tr;
              node.setAttribute('placeholder', tr);
            }
          }
          if (node.title) {
            const tr = translateText(node.title.trim());
            if (tr !== node.title.trim()) {
              node.title = tr;
              node.setAttribute('title', tr);
            }
          }
          if (node.getAttribute) {
            const aria = node.getAttribute('aria-label');
            if (aria) {
              const tr = translateText(aria.trim());
              if (tr !== aria.trim()) node.setAttribute('aria-label', tr);
            }
            const tooltip = node.getAttribute('data-tooltip');
            if (tooltip) {
              const tr = translateText(tooltip.trim());
              if (tr !== tooltip.trim()) node.setAttribute('data-tooltip', tr);
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
      walkAndTranslate(document.body);

      if (window.__AGY_OBSERVER__) {
        try { window.__AGY_OBSERVER__.disconnect(); } catch (e) {}
      }

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

      function scheduleBurstWalk() {
        requestAnimationFrame(() => walkAndTranslate(document.body));
        setTimeout(() => walkAndTranslate(document.body), 20);
        setTimeout(() => walkAndTranslate(document.body), 60);
        setTimeout(() => walkAndTranslate(document.body), 150);
        setTimeout(() => walkAndTranslate(document.body), 300);
      }

      if (!window.__AGY_EVENTS_BOUND__) {
        window.__AGY_EVENTS_BOUND__ = true;
        document.addEventListener('click', scheduleBurstWalk, true);
        document.addEventListener('contextmenu', scheduleBurstWalk, true);
        document.addEventListener('pointerdown', scheduleBurstWalk, true);
        document.addEventListener('focusin', scheduleBurstWalk, true);
        document.addEventListener('mouseover', (e) => {
          if (e.target && (e.target.getAttribute?.('role') === 'menuitem' || e.target.closest?.('[role="menu"], [role="menubar"], [class*="popover"], [class*="dropdown"], [data-radix-popper-content-wrapper]'))) {
            setTimeout(() => walkAndTranslate(document.body), 30);
            setTimeout(() => walkAndTranslate(document.body), 100);
          }
        }, true);
      }

      console.log('[Antigravity 汉化] 极速全事件捕获与全量深度 DOM 监听已更新生效！');
      return 'SUCCESS';
    })()
  `;
}

async function injectTranslationToLiveWindow(wsUrl) {
  return new Promise((resolve) => {
    const ws = new WebSocket(wsUrl);
    ws.onopen = () => {
      ws.send(JSON.stringify({
        id: 700,
        method: 'Runtime.evaluate',
        params: { expression: generateInjectionScript(), returnByValue: true }
      }));
    };

    ws.onmessage = (e) => {
      try {
        const resp = JSON.parse(e.data);
        if (resp.id === 700) {
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

// 深度修补 app.asar (三层深度原生级拦截：menu.js + ipcHandlers.js + preload.js)
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

  const dictJson = JSON.stringify(TRANSLATIONS);

  // 1. 修补 dist/menu.js (顶部窗口原生菜单)
  const menuPath = path.join(tempExtractDir, 'dist', 'menu.js');
  if (fs.existsSync(menuPath)) {
    let menuContent = fs.readFileSync(menuPath, 'utf8');
    const menuPatch = `
      // --- Antigravity 中文顶部菜单补丁 ---
      const AGY_MENU_DICT = ${dictJson};
      function localizeMenuTree(m) {
        if (!m || !m.items) return;
        m.items.forEach(it => {
          if (it.label && AGY_MENU_DICT[it.label.trim()]) {
            it.label = AGY_MENU_DICT[it.label.trim()];
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

  // 2. 修补 dist/ipcHandlers.js (主进程原生上下文右键菜单)
  const ipcPath = path.join(tempExtractDir, 'dist', 'ipcHandlers.js');
  if (fs.existsSync(ipcPath)) {
    let ipcContent = fs.readFileSync(ipcPath, 'utf8');
    const ipcPatch = `
      // --- Antigravity 原生上下文右键菜单汉化补丁 ---
      const AGY_CONTEXT_DICT = ${dictJson};
      function localizeNativeContextItems(items) {
        if (!Array.isArray(items)) return;
        items.forEach(it => {
          if (it && it.label && AGY_CONTEXT_DICT[it.label.trim()]) {
            it.label = AGY_CONTEXT_DICT[it.label.trim()];
          }
          if (it && it.submenu) localizeNativeContextItems(it.submenu);
          if (it && it.items) localizeNativeContextItems(it.items);
        });
      }
    `;

    if (!ipcContent.includes('AGY_CONTEXT_DICT')) {
      ipcContent = ipcPatch + '\n' + ipcContent;
      ipcContent = ipcContent.replace(
        'function buildContextMenuTemplate(items, onSelect) {',
        'function buildContextMenuTemplate(items, onSelect) {\n    localizeNativeContextItems(items);'
      );
      fs.writeFileSync(ipcPath, ipcContent, 'utf8');
    }
  }

  // 3. 修补 dist/preload.js (预加载层：前端 IPC 发送拦截 + 网页 DOM 注入)
  const preloadPath = path.join(tempExtractDir, 'dist', 'preload.js');
  if (fs.existsSync(preloadPath)) {
    let preloadContent = fs.readFileSync(preloadPath, 'utf8');

    if (!preloadContent.includes('AGY_PRELOAD_CONTEXT_DICT')) {
      const preloadCtxPatch = `
        const AGY_PRELOAD_CONTEXT_DICT = ${dictJson};
        function localizePreloadContextItems(items) {
          if (!Array.isArray(items)) return;
          items.forEach(it => {
            if (it && it.label && AGY_PRELOAD_CONTEXT_DICT[it.label.trim()]) {
              it.label = AGY_PRELOAD_CONTEXT_DICT[it.label.trim()];
            }
            if (it && it.submenu) localizePreloadContextItems(it.submenu);
            if (it && it.items) localizePreloadContextItems(it.items);
          });
        }
      `;
      preloadContent = preloadCtxPatch + '\n' + preloadContent;
      preloadContent = preloadContent.replace(
        "showContextMenu: (items) => electron_1.ipcRenderer.invoke('window:show-context-menu', items),",
        "showContextMenu: (items) => { try { localizePreloadContextItems(items); } catch(e){} return electron_1.ipcRenderer.invoke('window:show-context-menu', items); },"
      );
    }

    const domPatch = `
      // --- Antigravity 界面自动深度汉化引擎 ---
      window.addEventListener('DOMContentLoaded', () => {
        try {
          if (electron_1 && electron_1.webFrame) {
            electron_1.webFrame.executeJavaScript(\`(\${${JSON.stringify(generateInjectionScript())}})()\`);
          }
        } catch (e) {
          console.error('[Antigravity 汉化] 启动注入失败:', e);
        }
      });
    `;

    if (preloadContent.includes('// --- Antigravity 界面自动深度汉化引擎 ---')) {
      const startIdx = preloadContent.indexOf('// --- Antigravity 界面自动深度汉化引擎 ---');
      preloadContent = preloadContent.slice(0, startIdx) + domPatch;
    } else {
      preloadContent = preloadContent + '\n' + domPatch;
    }
    fs.writeFileSync(preloadPath, preloadContent, 'utf8');
  }

  // 4. 重新打包
  await asar.createPackage(tempExtractDir, asarPath);
  fs.rmSync(tempExtractDir, { recursive: true, force: true });
  console.log('底层 app.asar 汉化补丁 (主进程 + 预加载 + 菜单) 更新成功！');
}

async function main() {
  console.log('正在执行原生上下文右键菜单与全量汉化更新...');
  
  // 1. 修补并打包底层 app.asar
  await patchAsarPermanently();

  // 2. 对当前 live 窗口热注入 DOM 汉化
  const port = getDevToolsPort();
  if (port) {
    try {
      const targets = await fetchJson(port, '/json');
      const validPages = targets.filter(t => t.type === 'page' && t.url.startsWith('https://127.0.0.1'));
      for (const page of validPages) {
        await injectTranslationToLiveWindow(page.webSocketDebuggerUrl);
      }
      console.log('当前运行窗口的极速全事件捕获监听器与全量词典已热更新完毕！');
    } catch (e) {
      console.warn('窗口操作警告:', e.message);
    }
  }

  console.log('全方位深度汉化（含会话原生右键菜单）部署完成！');
  process.exit(0);
}

main().catch(err => {
  console.error('运行出错:', err);
  process.exit(1);
});
