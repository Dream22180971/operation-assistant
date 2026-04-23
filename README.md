# 运营助手 Agent

一个功能强大的运营助手应用，支持AI对话、数据分析、任务管理和内容创作。

## ✨ 功能特性

### 🤖 AI 对话
- 支持阿里千问大模型
- 多轮对话能力
- 上下文理解
- 针对运营问题的专业回答

### 📊 数据分析
- 运营数据仪表盘
- 关键指标监控
- 趋势分析图表
- 数据洞察建议

### ✅ 任务管理
- 任务创建和跟踪
- 任务状态管理
- 任务优先级设置
- 任务历史记录

### ✍️ 内容创作
- 智能内容优化
- 热点话题分析
- 标题生成建议
- 内容结构优化

## 🛠️ 技术栈

- **前端**: React 18 + TypeScript + Vite
- **状态管理**: Zustand
- **样式**: Tailwind CSS
- **图标**: Lucide React
- **图表**: Recharts
- **AI服务**: 阿里千问 (支持扩展其他模型)

## 🚀 快速开始

### 环境要求
- Node.js 18+
- npm 9+

### 安装依赖

```bash
npm install
```

### 开发模式运行

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

## ⚙️ 配置

### AI 模型配置
1. 打开设置页面
2. 选择默认AI模型 (目前仅支持阿里千问)
3. 输入API密钥
4. 保存设置

### 环境变量

在 `.env` 文件中配置：

```env
# 阿里千问 API 密钥
ALI_API_KEY=your_api_key
```

## 📁 项目结构

```
├── src/
│   ├── components/          # UI组件
│   ├── store/               # 状态管理
│   ├── lib/                 # 工具函数和服务
│   ├── App.tsx              # 主应用
│   └── main.tsx             # 入口文件
├── shared/                  # 共享类型定义
├── api/                     # 后端API
├── public/                  # 静态资源
├── package.json             # 项目配置
└── README.md               # 项目说明
```

## 🌟 核心功能

### AI 对话
- 智能理解运营问题
- 提供专业的运营建议
- 支持多轮对话
- 基于上下文生成回答

### 数据分析
- 实时数据监控
- 趋势分析图表
- 关键指标预警
- 数据驱动的决策建议

### 任务管理
- 创建和跟踪运营任务
- 设置任务优先级
- 任务状态管理
- 任务完成度统计

### 内容创作
- 智能内容优化
- 热点话题分析
- 标题生成和优化
- 内容结构建议

## 📸 功能截图

### 1. 聊天界面
![聊天界面](https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chat%20interface%20of%20operation%20assistant%20with%20orange%20theme%20showing%20AI%20conversation&image_size=landscape_16_9)

### 2. 数据分析仪表盘
![数据分析仪表盘](https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=data%20dashboard%20with%20charts%20and%20metrics%20in%20orange%20theme&image_size=landscape_16_9)

### 3. 任务管理
![任务管理](https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=task%20management%20interface%20with%20task%20cards%20in%20orange%20theme&image_size=landscape_16_9)

### 4. 内容创作
![内容创作](https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=content%20creation%20interface%20with%20editor%20and%20optimization%20tools%20in%20orange%20theme&image_size=landscape_16_9)

### 5. 设置页面
![设置页面](https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=settings%20page%20for%20AI%20model%20configuration%20in%20orange%20theme&image_size=landscape_16_9)

## 🤝 贡献

欢迎贡献代码、报告问题或提出建议！

## 📄 许可证

MIT License

## 📞 联系

- GitHub: [Dream22180971](https://github.com/Dream22180971)

---

**运营助手 Agent** - 您的智能运营伙伴！ 🎯