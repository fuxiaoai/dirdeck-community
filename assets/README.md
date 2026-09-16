# 产品图片与内容来源

本次主页以官网仓库 `dirdeck-web` 的提交 `77d66153ac969e61095b50a81840ce2e23afaf25` 为内容和截图基准。

- 产品结构：`src/components/ProductStory.astro`。
- 中文叙事：`src/content/story.ts` 的 `zh` 内容。
- 原始截图：该提交的 `assets-orig/screenshots-v2/zh/<功能 ID>.png`。
- 图片生成规则：对应提交的 `scripts/build-images.mjs` 按功能 ID 读取原图；不要使用截图清单中的历史中文文件名或未经核对的本地缓存产物。

本仓库选用该次官网更新的 14 张新版截图，直接从 Git 提交提取原图，等比缩小至最长宽度 1800 像素并转换为 WebP（quality 82）；不裁切、不重绘界面。主图采用 `workspaces`，文件浮窗采用 `floating-window`。原图中的标注与遮盖按官网素材保留。

`sources.json` 记录固定提交、原始路径、原图及输出文件的 SHA-256，便于追溯和核验。更新素材时同步更新该清单，并核对新版页面实际引用的功能，而非仅检查文件是否存在。

README 使用仓库内相对路径。图标来自 DirDeck 官网品牌素材。DirDeck 名称、图标与截图的相关权利归其权利人所有；本仓库公开展示不代表应用或素材以开源许可授权。
