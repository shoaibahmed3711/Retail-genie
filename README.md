# Retail Genie

Retail Genie is a comprehensive retail management application built with React, Vite, and Tailwind CSS.

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment

### Deploying with Render

This project includes a `render.yaml` file for automatic deployment with Render:

1. Connect your GitLab/GitHub repository to Render
2. Render will automatically detect the configuration
3. Your app will be built and deployed at the URL provided by Render

### Deploying to GitLab Pages

This project is also configured for deployment to GitLab Pages:

1. Push your changes to the main branch
2. GitLab CI/CD will automatically build and deploy your application
3. Access your deployed application at https://[your-gitlab-username].gitlab.io/[your-repository-name]

## Project Structure

- `/src` - Application source code
- `/public` - Static assets
- `/dist` - Production build (generated)

## Technology Stack

- React
- Vite
- Tailwind CSS
- React Router DOM

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
