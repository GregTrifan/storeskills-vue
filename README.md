# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about the recommended Project Setup and IDE Support in the [Vue Docs TypeScript Guide](https://vuejs.org/guide/typescript/overview.html#project-setup).

## Application Routes

| Route          | Description                                                      |
| -------------- | ---------------------------------------------------------------- |
| `/`            | Home page with welcome message and links to shop or explore.     |
| `/login`       | Login page for user authentication.                              |
| `/products`    | Product listing (requires login): browse, sort, filter products. |
| `/product/:id` | Product detail view (requires login): see and rate a product.    |

## Project Setup and Running

### Prerequisites
- Node.js (v18 or later recommended)
- npm (v10 or later)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd storeskills-vue
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Environment Setup (optional)

1. Create a `.env` file in the root directory:
   ```env
   VITE_API_BASE_URL=https://fakestoreapi.com
   ```

### Running the Development Server

```bash
# Start development server
npm run dev
```

This will start the development server at `http://localhost:5173` by default.

### Building for Production

```bash
# Build for production
npm run build

# Preview the production build locally
npm run preview
```

### Key Scripts

- `dev`: Start development server with hot-reload
- `build`: Build for production
- `preview`: Preview production build locally


### Implementation Notes

- **State Management**: Uses Pinia for centralized state management
- **Routing**: Implements Vue Router for navigation and route-based code splitting
- **HTTP Client**: Utilizes Axios for API requests with a centralized API client
- **Component Design**:
  - Components are usually kept simple and focused on single responsibilities
  - Complex components are only decomposed when it improves readability or reusability
  - Some views contain inline logic when decomposition wouldn't add value to maintainability
  - Composition API is used consistently for better logic organization
- **UI**: Rapidly developed with functionality as the primary focus. Future iterations may enhance the design and user experience.