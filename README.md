# 运营 AI 内容助手

> 自媒体运营人的 AI 写作工具——输入选题，自动适配小红书 / 抖音 / 公众号风格生成内容。
<img width="1920" height="911" alt="image" src="https://github.com/user-attachments/assets/016db503-0482-4a43-bffa-12cc414d6aaf" />

<img width="1920" height="911" alt="image" src="https://github.com/user-attachments/assets/1a81b155-ec13-42ff-b2da-eeb782f64105" />

[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat&logo=vite)](https://vitejs.dev)

---

## 目录

- [截图](#截图)
- [它是什么](#它是什么)
- [为什么做](#为什么做)
- [核心功能](#核心功能)
- [快速开始](#快速开始)
- [使用示例](#使用示例)
- [支持的 AI 模型](#支持的-ai-模型)
- [技术架构](#技术架构)
- [Roadmap](#roadmap)
- [FAQ](#faq)
- [谁适合用](#谁适合用)
- [关于我](#关于我)

---

## 截图

<img width="1920" height="911" alt="聊天界面" src="https://github.com/user-attachments/assets/016db503-0482-4a43-bffa-12cc414d6aaf" />
<img width="1920" height="911" alt="内容创作" src="https://github.com/user-attachments/assets/1a81b155-ec13-42ff-b2da-eeb782f64105" />

---

## 它是什么

一个**自媒体运营人的 AI 写作工具**，帮你做三件事：

1. **账号定位**：告诉它你擅长什么，它帮你分析最佳赛道和人设
2. **内容创作**：输入选题，自动适配小红书种草风、抖音脚本风、公众号深度长文
3. **智能对话**：随时问它运营问题——追热点、策划选题、润色文章、分析数据

所有内容一键复制，直接粘贴到各平台发布。

---

## 为什么做

做自媒体最头疼的不是没灵感，而是**同一个选题要写三个平台的版本**——小红书要短段落 + emoji，抖音要口语化脚本，公众号要深度长文。

手动改写太累，用 ChatGPT 又要反复说"帮我改成小红书风格"。

这个工具的思路：**你只需要给选题，它自动帮你生成三个平台的版本**。省掉 80% 的重复劳动。

---

## 核心功能

| 你能做什么 | 说明 |
|-----------|------|
| **AI 聊天** | 对话式运营问答，支持多轮对话、流式输出 |
| **账号定位** | 输入兴趣领域，AI 分析最佳赛道、人设、差异化策略 |
| **小红书内容** | 种草图文风格，emoji 丰富，短段落 |
| **抖音内容** | 长文脚本，节奏感强，口语化 |
| **公众号内容** | 深度长文 + 贴图短文两种模式 |
| **快捷提示词** | 一键触发：追热点、策划选题、润色文章、分析数据 |
| **草稿管理** | 生成的内容自动保存，最多 50 条历史记录 |
| **主题切换** | 浅色 / 深色模式 |

---

## 快速开始

```bash
# 1. 下载项目
git clone https://github.com/Dream22180971/operation-assistant.git
cd operation-assistant

# 2. 安装依赖
npm install

# 3. 启动
npm run dev
```

打开浏览器访问 `http://localhost:5173`

### 配置 AI 模型

首次使用需要配置 API Key：

1. 进入「设置」页面
2. 选择一个模型（推荐通义千问或 DeepSeek）
3. 输入你的 API Key
4. 保存即可

---

## 使用示例

### 场景 1：生成小红书种草笔记

1. 进入「内容」页面
2. 选择平台：小红书
3. 输入选题："推荐 5 个免费 AI 工具"
4. 点击生成
5. 得到一篇 emoji 丰富、短段落的种草笔记
6. 一键复制，粘贴到小红书发布

### 场景 2：账号定位

1. 进入「定位」页面
2. 输入你的兴趣和擅长领域
3. AI 分析最佳赛道、人设定位、差异化策略
4. 生成第一周起号计划

---

## 支持的 AI 模型

| 模型 | 提供商 | 特点 | 获取地址 |
|------|--------|------|----------|
| 通义千问 | 阿里云 | 中文能力强，性价比高 | [dashscope.console.aliyun.com](https://dashscope.console.aliyun.com/) |
| DeepSeek | 深度求索 | 推理能力强，价格实惠 | [platform.deepseek.com](https://platform.deepseek.com/) |
| Kimi | 月之暗面 | 长文本理解能力强 | [platform.kimi.com](https://platform.kimi.com/) |
| 豆包 | 字节跳动 | 需配置 endpoint ID | [console.volcengine.com](https://console.volcengine.com/ark) |
| 文心一言 | 百度 | 国内最早的大模型之一 | [console.bce.baidu.com](https://console.bce.baidu.com/qianfan/) |

所有模型均使用 OpenAI 兼容 API，统一适配。

---

## 技术架构

```
┌──────────────────────────────────┐
│     Frontend (React 18)          │
│  Vite · Tailwind CSS · Zustand  │
├──────────────────────────────────┤
│     AI Layer                    │
│  OpenAI JS SDK (兼容国产模型)   │
│  统一适配器 · 提示词模板        │
├──────────────────────────────────┤
│     Storage                     │
│  localStorage（对话/设置/草稿） │
└──────────────────────────────────┘
```

---

## Roadmap

- [x] AI 聊天助手（多轮对话 + 流式输出）
- [x] 账号定位（赛道分析 + 人设建议）
- [x] 多平台内容生成（小红书/抖音/公众号）
- [x] 5 种 AI 模型支持
- [x] 草稿管理和历史记录
- [x] 深色/浅色主题
- [ ] 生成内容一键发布到各平台
- [ ] 数据分析功能（阅读量、互动率预测）
- [ ] 更多平台适配（B站、知乎）
- [ ] 团队协作功能

---

## FAQ

**Q: 需要花钱吗？**
A: 工具本身免费。AI 模型需要你自己申请 API Key，各平台都有免费额度（比如通义千问有 100 万 token 免费）。

**Q: 支持哪些平台的内容生成？**
A: 目前支持小红书、抖音、公众号三个平台，每个平台有专门的风格模板。

**Q: 生成的内容能直接用吗？**
A: AI 生成的内容建议你根据实际情况微调——比如加入个人经历、修改具体细节。它帮你搞定框架和风格，你负责真实感。

**Q: 数据安全吗？**
A: 对话和草稿都保存在你的浏览器本地（localStorage），不会上传到任何服务器。API Key 也只存在本地。

**Q: 没有 API Key 能用吗？**
A: 不能。这个工具需要调用 AI 模型的 API，必须配置至少一个模型的 Key 才能使用。

---

## 谁适合用

- **自媒体运营人**：需要频繁在多个平台发布内容
- **内容创作者**：想要 AI 帮忙生成初稿，自己再润色
- **新媒体从业者**：做账号定位、选题策划、内容规划
- **个人 IP 打造者**：需要统一人设、差异化内容

---

## 关于我

我是**肖恩沃尔特**（Sean Walter），一个从测试工程师正在转型为 AI 独立开发者的程序员。

这个工具是我自己做自媒体运营时的痛点产物——同一个选题写三个平台太累了，于是用 AI 帮自己提效。

- GitHub: [Dream22180971](https://github.com/Dream22180971)
- Twitter/X: [@sean_walter0717](https://x.com/sean_walter0717)
- 博客: [seanwalter.top](https://seanwalter.top)

---

## License

[MIT](./LICENSE)
