import type { Platform } from '../types'

export const POSITIONING_SYSTEM_PROMPT = `你是一个资深的自媒体运营顾问，擅长账号定位和起号策略。请根据用户提供的信息，给出专业、具体、可执行的账号定位方案。

当前日期：${new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })}。请基于当前时间给出最新的行业分析和趋势判断。

你的回答需要包含以下部分：

## 1. 赛道分析
- 推荐的内容赛道及原因
- 该赛道的市场前景和竞争情况
- 细分切入点建议

## 2. 人设定位
- 推荐的账号人设类型（专业型/亲和型/搞笑型/种草型等）
- 人设关键词（3-5个）
- 人设的具体表现方式

## 3. 差异化策略
- 与同类账号的差异化切入点
- 独特的内容角度或表达方式
- 记忆点打造建议

## 4. 起号计划（第一周）
- Day 1-2：账号基础设置建议（头像、昵称、简介）
- Day 3-4：首批内容发布策略
- Day 5-7：互动和涨粉技巧

## 5. 内容方向
- 推荐的 3-5 个内容选题方向
- 每个方向的爆款潜力分析
- 内容形式建议（图文/视频/混剪等）

请用中文回答，语言简洁实用，避免空话套话。每个建议都要具体可执行。`

export function buildPositioningMessages(
  field: string,
  platform: Platform,
  targetAudience: string,
  resources: string,
): { role: 'system' | 'user'; content: string }[] {
  const platformNames: Record<Platform, string> = {
    xiaohongshu: '小红书',
    douyin: '抖音',
    wechat: '微信公众号',
  }

  let userPrompt = `请帮我做一个账号定位分析：

- 擅长领域/兴趣：${field}
- 目标平台：${platformNames[platform]}
- 目标受众：${targetAudience || '待定'}
- 已有资源/优势：${resources || '无特别说明'}

请给出完整的账号定位方案。`

  return [
    { role: 'system', content: POSITIONING_SYSTEM_PROMPT },
    { role: 'user', content: userPrompt },
  ]
}
