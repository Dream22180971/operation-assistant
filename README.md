# 运营 AI 内容助手

一个面向自媒体运营人的 AI 内容生成工具，支持账号定位、多平台内容创作和智能对话。
<img width="1920" height="911" alt="image" src="https://github.com/user-attachments/assets/016db503-0482-4a43-bffa-12cc414d6aaf" />

<img width="1920" height="911" alt="image" src="https://github.com/user-attachments/assets/1a81b155-ec13-42ff-b2da-eeb782f64105" />

## 功能特性

### AI 聊天助手
- 对话式运营问答，支持多轮对话
- 快捷提示词：追踪热点、策划选题、润色文章、分析数据
- 流式输出，实时显示 AI 回复
- Markdown 格式渲染

### 账号定位
- 输入兴趣/擅长领域，AI 分析最佳赛道
- 人设定位建议（专业型/亲和型/搞笑型等）
- 差异化策略和切入点分析
- 第一周起号计划生成

### 多平台内容创作
- **小红书**：种草图文风格，emoji 丰富，短段落
- **抖音**：长文图文脚本，节奏感强，口语化
- **公众号**：长文模式（深度）+ 贴图短文模式（轻量）
- 一键复制生成内容
- 历史草稿管理（最多 50 条）

### 支持的 AI 模型
| 模型 | 提供商 | 特点 |
|------|--------|------|
| 通义千问 | 阿里云 | 中文能力强，性价比高 |
| DeepSeek | 深度求索 | 推理能力强，价格实惠 |
| Kimi | 月之暗面 | 长文本理解能力强 |
| 豆包 | 字节跳动 | 需配置 endpoint ID |
| 文心一言 | 百度 | 国内最早的大模型之一 |

所有模型均使用 OpenAI 兼容 API，统一适配。

### 其他特性
- 浅色/深色主题切换
- 数据持久化（对话、设置、草稿保存到 localStorage）
- 响应式布局

## 技术栈

- **前端框架**：React 18 + TypeScript
- **构建工具**：Vite 5
- **状态管理**：Zustand（带持久化中间件）
- **样式**：Tailwind CSS 3
- **AI SDK**：OpenAI JS SDK（兼容国产模型 API）
- **Markdown**：react-markdown
- **图标**：Lucide React

## 快速开始

### 环境要求
- Node.js 18+
- npm 9+

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

访问 http://localhost:5173/

### 构建生产版本

```bash
npm run build
```

## 使用说明

1. **配置 AI 模型**：进入"设置"页面，选择模型并输入 API Key
2. **智能对话**：在"聊天"页面与 AI 助手对话
3. **账号定位**：在"定位"页面输入信息，获取定位方案
4. **内容创作**：在"内容"页面选择平台和主题，生成适配内容

### 获取 API Key

| 模型 | 获取地址 |
|------|----------|
| 通义千问 | https://dashscope.console.aliyun.com/ |
| DeepSeek | https://platform.deepseek.com/ |
| Kimi | https://platform.kimi.com/ |
| 豆包 | https://console.volcengine.com/ark |
| 文心一言 | https://console.bce.baidu.com/qianfan/ |

## 项目结构

```
src/
├── components/           # UI 组件
│   ├── ChatView.tsx      # 聊天页面
│   ├── PositionView.tsx  # 账号定位页面
│   ├── ContentView.tsx   # 内容创作页面
│   ├── SettingsView.tsx  # 设置页面
│   └── Sidebar.tsx       # 侧边栏导航
├── stores/               # Zustand 状态管理
│   ├── useChatStore.ts   # 对话状态
│   ├── useSettingsStore.ts # 设置状态
│   ├── useDraftStore.ts  # 草稿状态
│   └── useThemeStore.ts  # 主题状态
├── services/             # 服务层
│   ├── ai.ts             # AI 统一适配器
│   └── storage.ts        # localStorage 封装
├── prompts/              # AI 提示词模板
│   ├── chat.ts           # 聊天系统提示词
│   ├── platforms.ts      # 平台内容模板
│   └── positioning.ts    # 定位分析提示词
├── types/                # TypeScript 类型定义
│   └── index.ts
├── App.tsx               # 应用入口
├── main.tsx              # 渲染入口
└── index.css             # 全局样式 + 主题变量
```

## 许可证

MIT License

## 联系

- GitHub: [Dream22180971](https://github.com/Dream22180971)
