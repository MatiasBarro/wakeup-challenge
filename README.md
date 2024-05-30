# Wakeup Labs Technical Challenge

This repository contains all the necessary resources for running a restaurant platform application to accomplish the Wakeup Labs Technical Challenge.

## Project Structure

The project structure consists of a Mono Repository created using [Turborepo](https://turbo.build/repo) and using **npm workspaces**. This simplifies the development of both frontend and backend applications.

These are the subprojects created for this application:

-   **apps/restaurant-app:** React Frontend application for restaurant management.
-   **apps/restaurant-api:** NestJS Backend API used by frontend aplication for fetching restaurants and creating orders.
-   **packages/restaurant-app-types:** Project that contains all types and DTOs shared between the frontend and backend applications.

## Installation

Both frontend and backend applications uses Node version **v20.11.1**. If you have [nvm](https://github.com/nvm-sh/nvm/blob/master/README.md) installed in your computer run `nvm use` in the project's root to set the proper node version.

-   Install all project dependecies by running the following command in the project's root.

```bash
  npm install
```

-   Create a `.env` file in **apps/restaurant-api** using `.env.example` file as template. You can use the default `PORT=3000` variable as application port or any other you have available.

-   Create a `.env.local` file in **apps/restaurant-app** using `.env.example` file as template. `VITE_RESTAURANT_API_URL` value must match backend application's url and port. By default frontend application will run in port 4000. If you need to change it override the port property of the server configuration in `vite.config.js`.

-   Finally run the next command (in project' root) to start both the frontend and backend applications simultaneously.

```bash
  npm run dev
```

Frontend application will available on http://localhost:4000 and backend application on http://localhost:3000 (or the ports you've chosen)

## Libraries

#### Common

-   [ESlint](https://eslint.org/)
-   [Prettier](https://prettier.io/)

#### Frontend

-   [React](https://react.dev)
-   [Vite](https://vitejs.dev)
-   [Tastack Router](https://tanstack.com/router): For handling application Router
-   [Zustand](https://zustand-demo.pmnd.rs/): For handling application state
-   [Axios](https://axios-http.com/): For backend requests
-   [shadcn/ui](https://ui.shadcn.com/): UI Components library
-   [TailwindCSS](https://tailwindcss.com/): For application styling.

### Backend

-   [NestJS](https://nestjs.com/): Backend API framework
-   [Jest](https://jestjs.io/): Unit testing

## Production Urls

#### Frontend

https://wakeup-challenge-restaurant-app.vercel.app

#### Backend

https://wakeup-challenge-production.up.railway.app/swagger

## Author

Matias Barro Beotegui

matias.barro@gmail.com - [LinkedIn](https://www.linkedin.com/in/matiasbarro)
