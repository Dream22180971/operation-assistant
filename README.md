<div align="center">

# Operation Assistant

**Generate platform-specific content for Xiaohongshu, Douyin and WeChat from one topic.**

[English](./README.md) | [简体中文](./README.zh-CN.md)

[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)
[![Local Storage](https://img.shields.io/badge/STORAGE-localStorage-111827?style=for-the-badge)](#privacy)
[![License](https://img.shields.io/badge/LICENSE-MIT-10B981?style=for-the-badge)](./LICENSE)

</div>

---

## What it is

Operation Assistant is a local-first AI writing workspace for creators who publish the same topic across different Chinese content platforms.

Instead of repeatedly prompting a general chatbot, it keeps platform-specific writing flows in one UI.

---

## Demo

<div align="center">

<img width="92%" alt="Operation Assistant chat" src="https://github.com/user-attachments/assets/016db503-0482-4a43-bffa-12cc414d6aaf" />

<img width="92%" alt="Operation Assistant content generation" src="https://github.com/user-attachments/assets/1a81b155-ec13-42ff-b2da-eeb782f64105" />

</div>

---

## Quick Start

```bash
git clone https://github.com/Dream22180971/operation-assistant.git
cd operation-assistant

npm install
npm run dev
```

Open `http://localhost:5173`.

Configure at least one supported model/API key in the app settings before generating content.

---

## Core Workflows

| Workflow | Purpose |
|---|---|
| Account positioning | analyze niche, persona and differentiation |
| Xiaohongshu | generate short, visual, platform-style copy |
| Douyin | generate more conversational script-style content |
| WeChat | generate longer-form article drafts |
| AI chat | brainstorm topics, hooks, rewrites and positioning |
| Draft history | keep recent generated content locally |

---

## Model Layer

The app uses an OpenAI-compatible client pattern so multiple providers can share one integration style.

Provider support depends on the endpoint and key configured by the user.

---

## Privacy

- drafts and conversations are stored locally in the browser
- API keys are handled on the client side
- there is no built-in cloud account system

Because keys are client-side, use this primarily as a personal/local tool unless you add a secure backend proxy.

---

## Architecture

```text
React 18 + Vite
      │
      ├── platform prompt workflows
      ├── OpenAI-compatible model adapters
      ├── Zustand state
      └── localStorage drafts / settings
```

---

## Roadmap

- [x] AI chat
- [x] account positioning
- [x] Xiaohongshu / Douyin / WeChat generation
- [x] multiple model providers
- [x] draft history
- [ ] secure backend API proxy
- [ ] more publishing platforms
- [ ] analytics-assisted rewriting
- [ ] content calendar
- [ ] team workflow

---

## License

[MIT](./LICENSE)

<div align="center">

**One topic should not require three blank pages.**

</div>
