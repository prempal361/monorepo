# Prudential Agent Portal - Micro Frontend Architecture

Enterprise frontend monorepo for the **Prudential Agent Portal**, built with **Webpack 5 Module Federation**, **React JS**, and **Nx Monorepo**.

---

## 🏛️ Architecture Overview & Tech Stack

- **Monorepo Management:** Nx Workspace (`nx.json`, `package.json`)
- **Microfrontends (MFEs):** Webpack 5 Module Federation (`ModuleFederationPlugin`)
- **UI Framework:** React JS (`.jsx` / `.js` - Pure JavaScript)
- **State Management:** Redux Toolkit (`@reduxjs/toolkit`, `react-redux`)
- **Routing:** React Router v6 (`react-router-dom`)
- **Styling:** Plain CSS (`.css`)
- **Shared Library:** `libs/api-client` (Common HTTP handling)
- **Unit Testing:** Jest & React Testing Library

---

## 📱 Monorepo Applications Structure

```
prudential-agent-portal/
├── apps/
│   ├── agent-shell/          # Host application (Port 3000)
│   ├── payment-mfe/          # Remote MFE: Payment Module (Port 3003)
│   ├── customer-mfe/         # Remote MFE: Customer Module (Port 3001)
│   ├── product-mfe/          # Remote MFE: Product Catalog Module (Port 3002)
│   └── policy-mfe/           # Remote MFE: Policy Administration (Port 3004)
└── libs/
    └── api-client/           # Shared HTTP Client & Error Handling
```

---

## 📂 Simplified Microfrontend Folder Layout

Each business Microfrontend (`customer-mfe`, `product-mfe`, `payment-mfe`, `policy-mfe`) uses a clean 3-folder structure:

```
src/modules/<module-name>/
├── components/          # React UI Pages, Cards, Forms, and Styles
├── services/            # Backend Java/Kotlin REST API Integration
├── rules/               # Simple Business Rules & Validation Checks
└── store/               # Redux Toolkit UI State
```

---

## 🚀 Getting Started

### Run All Microfrontends Concurrently:
```bash
npm start
```

Open your browser at: **`http://localhost:3000`**

### Run Unit Tests:
```bash
npm test
```

### Build Production Bundles:
```bash
npm run build
```
