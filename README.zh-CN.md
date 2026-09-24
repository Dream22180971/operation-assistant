<div align="center">

# 运营 AI 内容助手

**输入一个选题，生成适配小红书、抖音和公众号的不同版本。**

[English](./README.md) | [简体中文](./README.zh-CN.md)

[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)
[![Local Storage](https://img.shields.io/badge/STORAGE-localStorage-111827?style=for-the-badge)](#隐私)
[![License](https://img.shields.io/badge/LICENSE-MIT-10B981?style=for-the-badge)](./LICENSE)

</div>

---

## 🎯 它是什么

一个面向内容创作者的本地 AI 写作工作台。核心不是“再做一个聊天框”，而是把同一个选题在不同平台的写法固定成可重复使用的流程。

---

## 🎬 演示

<div align="center">

<img width="92%" alt="运营助手聊天界面" src="https://github.com/user-attachments/assets/016db503-0482-4a43-bffa-12cc414d6aaf" />

<img width="92%" alt="运营助手内容生成" src="https://github.com/user-attachments/assets/1a81b155-ec13-42ff-b2da-eeb782f64105" />

</div>

---

## ⚡ 5 分钟快速开始

```bash
git clone https://github.com/Dream22180971/operation-assistant.git
cd operation-assistant

npm install
npm run dev
```

访问 `http://localhost:5173`。

生成内容前，请在设置中配置至少一个可用模型/API Key。

---

## ✨ 核心流程

| 流程 | 作用 |
|---|---|
| 账号定位 | 分析赛道、人设和差异化 |
| 小红书 | 生成短段落、平台化图文初稿 |
| 抖音 | 生成更口语化的脚本内容 |
| 公众号 | 生成长文初稿 |
| AI 对话 | 选题、Hook、改写、定位讨论 |
| 草稿历史 | 在本地保留最近生成内容 |

---

## 🧠 模型层

项目使用 OpenAI-compatible 的客户端思路，让多个供应商尽量复用同一套接入方式。

具体可用模型取决于用户配置的 Endpoint 和 Key。

---

## 🔐 隐私

- 草稿和对话保存在浏览器本地
- API Key 在客户端侧使用
- 当前没有内置云端账号体系

因为 Key 位于客户端侧，这个版本更适合个人本地使用；如果用于多人或生产环境，建议增加安全的后端代理层。

---

## 🧩 技术架构

```text
React 18 + Vite
      │
      ├── 多平台 Prompt 工作流
      ├── OpenAI-compatible 模型适配
      ├── Zustand 状态管理
      └── localStorage 草稿 / 设置
```

---

## 🗺 路线图

- [x] AI 对话
- [x] 账号定位
- [x] 小红书 / 抖音 / 公众号生成
- [x] 多模型接入
- [x] 草稿历史
- [ ] 安全后端 API Proxy
- [ ] 更多平台
- [ ] 数据辅助改写
- [ ] 内容日历
- [ ] 团队工作流

---

## 📄 License

[MIT](./LICENSE)

<div align="center">

**一个选题，不应该从三张空白页重新开始。**

</div>
