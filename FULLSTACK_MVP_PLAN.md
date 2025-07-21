# Full-Stack MVP Development Plan: Lucky Coin Casino
### 全端 MVP 開發計畫：幸運硬幣娛樂城

This document outlines the step-by-step plan for developing a full-stack "Lucky Coin Casino" application. It serves as a single source of truth for the project's architecture, tools, and development phases.
<br>
**中文說明：** 本文件概述了開發全端「幸運硬幣娛樂城」應用程式的詳細步驟計畫。它將作為專案架構、工具和開發階段的唯一參考依據。

---

## **Project Concept: The MVP**
### **專案概念：MVP 版本**

**Core Idea:** A mini online casino website. The MVP will feature a user and wallet system, and one core game: a classic Slot Machine.
<br>
**核心點子：** 一個迷你線上娛樂城網站。MVP 版本將包含一個使用者與錢包系統，以及一個核心遊戲：經典拉霸機。

#### **1. Data Models (Prisma Schema)**
-   **`User` Model:**
    -   `id`: Unique Identifier
    -   `username`: Unique name for login.
    -   `password`: Hashed password for security.
    -   `coinBalance`: The player's virtual currency balance.
    -   `createdAt` / `updatedAt`: Timestamps.

#### **2. Backend API Endpoints (NestJS)**
-   **Authentication (`/api/auth`):**
    -   `POST /register`: Creates a new user with an initial coin balance.
    -   `POST /login`: Authenticates a user and returns a JWT token.
-   **User (`/api/users`):**
    -   `GET /me`: Fetches the current logged-in user's profile, especially the `coinBalance`.
-   **Game (`/api/games`):**
    -   `POST /slot/play`: The core game logic endpoint. Receives a bet amount, processes the game result, updates the user's balance, and returns the outcome.

#### **3. Frontend UI (React)**
-   **`AuthPage.tsx`:** A page with registration and login forms.
-   **`SlotMachineGame.tsx`:** The main game interface, showing the slot reels, player's balance, bet controls, and a "Spin" button.
-   **`Navbar.tsx`:** A persistent navigation bar displaying the user's name, coin balance, and a logout button.

---

## **Core Technical Considerations**
### **核心技術考量**

1.  **Security (安全性):**
    -   **Password Hashing:** Use `bcrypt` for hashing and comparing passwords. Never store plain-text passwords.
        <br> (密碼雜湊：使用 `bcrypt` 進行密碼的雜湊和比對。絕不儲存明文密碼。)
    -   **JWT Secret:** The secret key for JWTs must be stored in `.env` and not be hard-coded. It should be a long, random string.
        <br> (JWT 密鑰：用於簽發 JWT 的密鑰必須存放在 `.env` 檔案中，不可硬編碼。它應該是一個長且隨機的字串。)
    -   **API Protection:** All sensitive endpoints (e.g., `/api/users/me`, `/api/games/slot/play`) must be protected using NestJS's `AuthGuard`.
        <br> (API 保護：所有敏感的端點都必須使用 NestJS 的 `AuthGuard` 進行保護。)

2.  **Input Validation (輸入驗證):**
    -   **Tooling:** Use `class-validator` and `class-transformer` in NestJS DTOs.
        <br> (工具：在 NestJS 的 DTO 中使用 `class-validator` 和 `class-transformer`。)
    -   **Rules:** Define clear validation rules. For example:
        -   `username`: min length 3, max length 20.
        -   `password`: min length 6.
        -   `betAmount`: must be a positive number.
        <br> (規則：定義清晰的驗證規則。例如：username 長度介於 3-20 字元，password 長度至少 6 字元，betAmount 必須是正數。)

3.  **Error Handling (錯誤處理):**
    -   **Standardized Responses:** The API should return clear, standardized error responses.
        <br> (標準化回應：API 應回傳清晰、標準化的錯誤回應。)
    -   **Examples:**
        -   Username already exists: `409 Conflict` with `{ "message": "Username already exists" }`.
        -   Insufficient balance: `400 Bad Request` with `{ "message": "Insufficient balance" }`.
        -   Invalid credentials: `401 Unauthorized`.
    -   **Frontend Display:** The frontend should use these specific errors to show user-friendly messages.
        <br> (前端顯示：前端應根據這些特定的錯誤來顯示對使用者友善的訊息。)

---

## **Technology Stack**
### **技術棧**

-   **Monorepo:** pnpm workspaces
-   **Backend (後端):** Node.js, NestJS, TypeScript
-   **Frontend (前端):** React, TypeScript, Vite
-   **Database (資料庫):** SQLite (for development) -> PostgreSQL (for production)
-   **ORM:** Prisma
-   **Styling (樣式):** Tailwind CSS

---

## **Project Phases**
### **專案階段**

*The development phases below are adapted for the Lucky Coin Casino project.* 
*以下的開發階段已針對「幸運硬幣娛樂城」專案進行調整。*

### **Phase 0: Project Setup & Foundation**
### **階段 0：專案設定與基礎建設**

**Goal:** Establish the monorepo structure, initialize frontend and backend projects, and install all dependencies.
<br>
**目標：** 建立 monorepo 專案結構，初始化前端和後端專案，並安裝所有必要的依賴。

1.  **Environment Setup (環境設定):**
    -   Ensure Node.js (LTS), pnpm, and NestJS CLI are installed.
    -   Install pnpm: `npm install -g pnpm`
    -   Install NestJS CLI: `npm install -g @nestjs/cli`

2.  **Create Monorepo Structure (建立 Monorepo 結構):**
    -   Create the root project folder (e.g., `lucky-coin-casino`).
    -   In the root, create `pnpm-workspace.yaml`:
        ```yaml
        packages:
          - 'apps/*'
        ```
    -   Create the `apps` directory.

3.  **Initialize Backend & Frontend:**
    -   Backend: `nest new server` inside `apps`.
    -   Frontend: `pnpm create vite client --template react-ts` inside `apps`.

4.  **Setup Tailwind CSS & Git** as previously outlined.

---

### **Phase 1: Backend API (User & Wallet System)**
### **階段 1：後端 API 開發 (使用者與錢包系統)**

**Goal:** Build the core authentication and user management API, incorporating security and validation best practices.
<br>
**目標：** 建立核心的驗證和使用者管理 API，並整合安全性與驗證的最佳實踐。

1.  **Integrate Prisma & Define Schema:**
    -   Initialize Prisma in `apps/server`.
    -   Define the `User` model in `schema.prisma`.
    -   Run `npx prisma migrate dev --name init-user`.

2.  **Build Auth Module:**
    -   Create DTOs with `class-validator` rules for registration and login.
    -   Implement registration logic using `bcrypt` for password hashing.
    -   Implement login logic, validating credentials and issuing JWTs using a secret from `.env`.
    -   Implement `AuthGuard` to protect routes.

---

### **Phase 2: Backend API (Game Logic)**
### **階段 2：後端 API 開發 (遊戲邏輯)**

**Goal:** Implement the server-side logic for the slot machine with robust error handling.
<br>
**目標：** 實作具有健全錯誤處理的拉霸機伺服器端邏輯。

1.  **Create Game Module:**
    -   Generate `GamesController` and `GamesService`.
    -   Protect the play endpoint with the `AuthGuard`.

2.  **Implement Play Logic:**
    -   Create a DTO to validate the `betAmount`.
    -   In `GamesService`, create the `playSlotMachine` method.
    -   Implement clear error handling for cases like insufficient balance.
    -   Use Prisma transactions to ensure that deducting the bet and adding winnings are atomic operations.

---

### **Phase 3: Frontend UI & Integration**
### **階段 3：前端 UI 與整合**

**Goal:** Develop the user interface and connect it to the backend API, ensuring it handles API responses gracefully.
<br>
**目標：** 開發使用者介面並與後端 API 串接，確保能優雅地處理各種 API 回應。

1.  **Build UI Components:**
    -   Create the React components (`AuthPage`, `SlotMachineGame`, `Navbar`).

2.  **API Service & State Management:**
    -   Create a service (`api.ts`) to handle all API requests.
    -   Implement logic to handle both successful responses and specific error messages from the API.
    -   Manage application state (user token, coin balance, error messages).

3.  **Connect UI to API:**
    -   Wire up the login/registration forms, displaying validation errors from the server.
    -   Implement the "Spin" button to call the game API and update the UI based on the full response (game result, new balance, or error).

---

### **Phase 4 & 5: Migration & Deployment**
### **階段 4 & 5：資料庫遷移與部署**

These phases remain technically the same. Once the MVP is functional with SQLite, we can migrate to PostgreSQL and deploy the frontend and backend to services like Vercel and Render.
<br>
**中文說明：** 這兩個階段在技術上保持不變。當 MVP 使用 SQLite 功能正常後，我們就可以遷移到 PostgreSQL，並將前端和後端分別部署到 Vercel 和 Render 等服務上。
