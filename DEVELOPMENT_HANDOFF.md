# Clawso Labs 官网开发接手说明

## 角色边界

本项目后续建议拆成两个角色：

- 主调度 / 视觉方向：Codex 当前主 session。负责整体审美判断、图片需求、视觉取舍、最终检查。
- 开发实现：新 session 或 Claude。负责 HTML/CSS 结构、响应式、性能、图片接入、浏览器验证。

开发实现不要重新定义官网方向，不要重写视觉概念，不要自行生成图片。所有新增图片需求先交给主调度确认。

## 项目路径

```text
/Users/frank/Documents/clawso-website
```

本地预览：

```text
http://localhost:4173
```

如果服务没开，运行：

```text
npm run dev
```

## 已确认产品方向

Clawso Labs 官网不是传统 AI SaaS 模板站。

目标体验：

```text
登舰确认 -> 系统启动 -> 企业 AI 指挥舱沉浸式单页官网
```

视觉关键词：

```text
未来航空器驾驶舱
企业 AI 指挥舰桥
高级科技控制台
暗色金属
蓝青 HUD
琥珀橙网络光
实体按键
扫描线
模块点亮
电影感 3D 配图
```

避免：

```text
SaaS 模板
廉价赛博朋克
普通数据大屏
游戏抽卡感
大量 SVG 假插画撑场面
```

## 当前页面结构

主要区块：

```text
boarding screen
boot sequence
Command Deck hero
Mission Scan
Capability Console
Architecture Bay
Product Hangar
Scenario Deck
Launch Contact
```

已具备三语切换：中文 / 英文 / 日文。

## 已完成的第一波补图接入

已从桌面原图压缩并接入：

```text
assets/mission-fragments.jpg
assets/architecture-bay.jpg
assets/capability/ai-native.jpg
assets/capability/workflow-core.jpg
assets/capability/agent-fleet.jpg
assets/capability/knowledge-radar.jpg
assets/capability/result-delivery.jpg
```

相关引用位置：

```text
index.html
src/styles.css
```

已验证：

- Mission Scan 背景图正常加载
- Capability Console 五张卡片头图正常加载
- Architecture Bay 大幅图正常加载
- `src/main.js` 语法检查通过

## 开发禁区

除非主调度明确要求，否则开发实现不要做以下事情：

- 不要碰 `src/main.js`
- 不要改 i18n 文案
- 不要新增第三方依赖
- 不要用 SVG illustration 代替真实图片
- 不要替换 boot screen 的 SVG cockpit 线描动画
- 不要移除 hero cockpit / AI core / module bank / console-wing / core-readout
- 不要自行发散成新的设计风格
- 不要大改页面叙事结构

## 第二波补图接入状态

第二波补图已完成接入。

已接入图片：

```text
assets/boarding-deck.jpg
assets/clawso-product.jpg
assets/labs-services.jpg
assets/scenario-map.jpg
assets/launch-ignition.jpg
```

已验证：

```text
boarding screen 背景正常加载
Product Hangar 两张卡片图正常加载
Scenario Deck 背景图正常加载
Launch Contact 右侧控制台图正常加载
```

## 已完成接入说明

### boarding screen

目标：登舰确认页背后有远景企业指挥舰，不抢中央确认框。

CSS 位置：

```text
src/styles.css -> .boarding-screen
```

已预埋 `boarding-deck.jpg` 背景引用，如有图片只需确保路径正确并微调遮罩明暗。

### product hangar

目标：两张产品/服务卡片从纯文字变成机库里的真实产品舱和工程服务工作区。

HTML 位置：

```text
index.html -> .hangar-card
```

CSS 位置：

```text
src/styles.css -> .hangar-card
```

当前已预埋：

```text
--hangar-thumb: url('../assets/clawso-product.jpg')
--hangar-thumb: url('../assets/labs-services.jpg')
```

### scenario deck

目标：用战略星图/任务区地图替代纯 CSS 圆形装饰，让尾段叙事继续。

CSS 位置：

```text
src/styles.css -> .scenario-deck
```

注意：之前的大旋转圆 `.scenario-deck::after` 已删除，不要恢复。

### launch contact

目标：用发射倒计时控制台图作为右侧视觉收束，替代雷达圆。

HTML 位置：

```text
index.html -> .launch-contact / .ignition-art
```

CSS 位置：

```text
src/styles.css -> .launch-contact / .ignition-art
```

注意：之前的 `.launch-contact::before` 雷达圆已删除，不要恢复。

## 验收标准

每次开发完成后至少检查：

```text
node --check src/main.js
```

浏览器验证：

- 登舰页可进入
- boot 动画仍然正常
- 三语切换仍然正常
- Mission / Capability / Architecture / Hangar / Scenario / Launch 都不破版
- 桌面宽屏无明显遮挡
- 手机端不出现文字溢出、图片撑爆、按钮不可点

## 当前审美判断

第一波和第二波接图后，页面已经从 hero 到尾段形成连续的电影感场景。

已完成一轮视觉精修：

```text
boarding screen 背景层次和中心确认框融合增强
Mission Scan 图像遮罩、扫描器和 readout 可读性增强
Capability Console 卡片图文比例和图片叠层增强
Architecture Bay 大图亮度、网格叠层和底部过渡增强
Product Hangar 卡片图片可见度和文字遮罩增强
Scenario Deck 星图背景和任务标签层级增强
Launch Contact 发射控制台、按钮和右侧图关系增强
```

已完成一轮小问题修正：

```text
boarding screen 标题改为舰载终端感字体，并加入克制的信号断续/glitch 效果
boot sequence 去掉低质 cockpit SVG，改为抽象校验脉冲和信号断帧
Command Deck hero 加入轻微前进/航行信号层，不做夸张 warp
HUD cursor 从瞄准镜感改为更轻的信号采样光标
顶部品牌区移除副标题小字，避免语义歧义
```

已完成第二轮小问题修正：

```text
顶部品牌位已替换为 assets/logo.png
boarding screen 标题字体改为更凝练的舰载显示字体，保留并增强信号断续感
boot sequence 行出现节奏放慢，信号断帧更明显
Command Deck hero 航行感增强，但仍保持克制
HUD cursor 放大并改为更清晰的信号采样框
```

已完成第三轮小问题修正：

```text
boot sequence 断帧更明显：启动行增加文字切片撕裂层和更强横向错位
顶部 logo 尺寸放大，并保持琥珀橙发光
HUD cursor 改为品牌三道抓痕形态，使用橙色光标和抓痕拖尾
```

后续重点不是再堆动画，而是让每个区块都有对应电影感场景图，形成连续故事：

```text
远景登舰 -> 驾驶舱 hero -> 断点扫描 -> 能力模块 -> 舱体架构 -> 产品机库 -> 任务星图 -> 发射联系
```

开发实现只负责把这个故事稳定落到页面里。
