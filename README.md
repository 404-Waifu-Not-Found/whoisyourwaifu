# LPTI：谁是你的二次元老婆？

[English](./docs/README.en.md) | [中文](./docs/README.zh-CN.md)

LPTI 是一个静态双语二次元老婆偏好测试，使用 Vue 3、TypeScript 和 Vite 构建。项目适合部署到 GitHub Pages，也可以用仓库里的 PowerShell 脚本在本机运行。

> NEED TRANSLATION INPUTS, welcome issues + PRs

## 功能

- 英文/中文界面，并会保存语言偏好。
- 类 MBTI 的偏好轴，但测的是二次元老婆 XP。
- 48 道题题库，每次动态抽取 32 道，且四个轴保持平衡。
- 48 位角色结果池，覆盖 16 个类型桶。
- 使用 MyAnimeList 外部角色立绘链接。
- 确定性评分，包含匹配度、匹配信心、轴向条和接近结果。
- Windows PowerShell 本地部署/预览脚本。

## 本地运行

安装依赖、构建并在本机预览：

```powershell
.\deploy-local.ps1
```

跳过依赖安装：

```powershell
.\deploy-local.ps1 -SkipInstall
```

默认本地地址：

```text
http://127.0.0.1:4173/
```

## 开发命令

```bash
npm install
npm run dev
npm run build
npm run evaluate
```

`npm run evaluate` 会生成假的答题输入，并对评分结果做基础对比检查。

## 算法说明

评分算法文档见：[docs/ALGORITHM.md](./docs/ALGORITHM.md)

## GitHub Pages

`.github/workflows/deploy.yml` 会构建 `dist/` 并通过 GitHub Pages Actions 部署。仓库设置里需要把 Pages 来源设置为 **GitHub Actions**。

## 翻译贡献

欢迎提交 issue 或 PR 帮忙改翻译。尤其欢迎：

- 更自然的中文或英文表达。
- 更准确的二次元/社区用语。
- 角色名修正。
- 题目翻译修正。

完整中文文档见：[docs/README.zh-CN.md](./docs/README.zh-CN.md)
