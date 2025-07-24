## Project Overview

This is a task manager app (created using next js 15) that allow users add their tasks and due dates. It has all the CRUD functionalities implemented.

## Features

- CRUD features without backend
- Mark task as 'done'
- Filter tasks
- Persisted all states
- Light and Dark mode

## Tools

- Next js 15
- Tailwind Css for styling
- Zustand for state management and storage

To run locally:

1. clone the project

```bash
git clone "https://github.com/adexfit/nexttaskmanager.git"

```

2. Install dependencies

```bash
npm install

```

3. start server

```bash
npm run dev

```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment on Netlify

This is the url to the deployed app on netlify [Live link](https://adextaskmanager.netlify.app/) for more details.

## Design approach

The app was designed using a single blue color. It has a dark mode feature and it is responsive on all screens.

## Techniques

- This app has no backend, all states are stored and persisted in zustand store.
- Conditional rendering is used to swap between components instead of multiple pages. Only the update page has a route.
