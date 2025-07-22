# 🎰 Lucky Coin Casino

一个现代科技风格的在线赌场应用，采用全栈TypeScript开发，具有霓虹科技UI设计和手机风格布局。

## ✨ 项目特色

### 🎮 游戏功能
- **🎰 老虎机游戏** - 经典三轮老虎机，50%胜率，2倍奖励
- **🪙 抛硬币游戏** - 猜测正反面，50%胜率，2倍奖励  
- **🎲 掷骰子游戏** - 预测数字(1-6)，16.7%胜率，5倍奖励

### 🔐 用户系统
- 用户注册和登录
- JWT身份验证
- 虚拟金币钱包系统
- 安全的密码加密

### 🎨 现代UI设计
- **科技霓虹风格** - 蓝、紫、青霓虹色彩主题
- **手机应用布局** - 320x700px垂直长方形设计
- **动态效果** - 浮动粒子、发光边框、图标动画
- **毛玻璃效果** - 现代backdrop-blur设计

## 🛠️ 技术栈

### 后端
- **框架**: NestJS + TypeScript
- **数据库**: SQLite (开发) / PostgreSQL (生产)
- **ORM**: Prisma
- **认证**: JWT + bcrypt
- **验证**: class-validator + class-transformer

### 前端
- **框架**: React 19 + TypeScript
- **构建工具**: Vite
- **样式**: Tailwind CSS + 自定义霓虹主题
- **路由**: React Router DOM
- **HTTP客户端**: Axios

### 开发工具
- **包管理**: pnpm workspaces (monorepo)
- **代码规范**: ESLint + Prettier
- **字体**: Inter (现代无衬线字体)

## 🚀 快速开始

### 环境要求
- Node.js 18+ 
- pnpm 8+

### 安装依赖
```bash
# 克隆项目
git clone <your-repo-url>
cd lucky-coin-casino

# 安装所有依赖
pnpm install
```

### 启动开发服务器

#### 1. 启动后端服务器
```bash
cd apps/server
pnpm start:dev
```
后端将运行在 http://localhost:3000

#### 2. 启动前端开发服务器
```bash
cd apps/client  
pnpm dev
```
前端将运行在 http://localhost:5173

### 数据库设置
```bash
cd apps/server

# 生成Prisma客户端
npx prisma generate

# 运行数据库迁移
npx prisma migrate dev
```

## 📱 项目截图

### 🎯 登录页面
- 现代科技风格的登录界面
- 霓虹蓝色主题
- 手机应用布局

### 🎮 游戏选择页面
- 三个游戏卡片，每个都有独特的霓虹色彩
- 显示胜率和奖励倍数
- 动态图标效果

### 🎰 游戏界面
- 统一的手机风格布局
- 科技感游戏面板
- 实时余额更新

## 🎨 设计系统

### 🌈 霓虹色彩主题
```css
/* 主要霓虹色彩 */
蓝色霓虹: #00D4FF, #06B6D4
紫色霓虹: #8B5CF6, #F472B6  
青色霓虹: #06B6D4
绿色霓虹: #10B981 (成功)
橙色霓虹: #F59E0B (高倍率)
```

### 📐 布局规范
- **应用容器**: 320px × 700px (手机比例)
- **标题区域**: p-6 (24px内边距)
- **内容区域**: p-6 + flex-1 (自适应高度)
- **底部区域**: p-4 (16px内边距)

## 🎯 游戏规则

### 🎰 老虎机
- 下注任意金额
- 50%概率获胜
- 获胜时获得2倍下注金额

### 🪙 抛硬币  
- 选择正面或反面
- 50%概率获胜
- 获胜时获得2倍下注金额

### 🎲 掷骰子
- 预测骰子结果(1-6)
- 16.7%概率获胜 
- 获胜时获得5倍下注金额

## 📁 项目结构

```
lucky-coin-casino/
├── apps/
│   ├── client/          # React前端应用
│   │   ├── src/
│   │   │   ├── pages/   # 页面组件
│   │   │   ├── api.ts   # API服务
│   │   │   └── ...
│   │   └── package.json
│   └── server/          # NestJS后端应用
│       ├── src/
│       │   ├── auth/    # 认证模块
│       │   ├── games/   # 游戏模块
│       │   └── ...
│       ├── prisma/      # 数据库模式
│       └── package.json
├── package.json         # 根package.json
├── pnpm-workspace.yaml  # pnpm工作区配置
└── README.md
```

## 🔧 开发脚本

### 后端 (apps/server)
```bash
pnpm start:dev    # 开发模式启动
pnpm start:prod   # 生产模式启动
pnpm build        # 构建项目
pnpm test         # 运行测试
```

### 前端 (apps/client)
```bash
pnpm dev          # 开发服务器
pnpm build        # 构建生产版本
pnpm preview      # 预览生产构建
pnpm lint         # 代码检查
```

## 🚀 部署

### 生产环境配置
1. 设置环境变量:
   ```env
   DATABASE_URL="your-postgresql-url"
   JWT_SECRET="your-super-secret-jwt-key"
   ```

2. 构建应用:
   ```bash
   pnpm build
   ```

3. 运行数据库迁移:
   ```bash
   npx prisma migrate deploy
   ```

## 🤝 贡献

欢迎提交Issue和Pull Request来改进这个项目！

## 📄 许可证

MIT License

## 👨‍💻 作者

开发者: [billyz]

---

email:kaicheng0906@gmail.com
