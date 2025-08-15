# JSL Portfolio Piece: Kanban App Deployment & Features Implementation

## Overview

This project involves **deploying a Kanban app to Netlify**, ensuring the app's functionality and persistence through local storage, and implementing dynamic features such as task editing, deletion, sidebar interaction, and a theme toggle. The goal is to deliver a fully functional, deployable application that is responsive across devices and maintains data consistency. Students will also focus on **clean, modular code** that is well-documented for future development.

## Netlify and Loom links
https://jsl-portfolio-piece.netlify.app/
https://www.loom.com/share/7f97811035394305bf302f5ea7612536?sid=55c669af-3ca3-48ba-b28c-a71f950f2a59



## Key Objectives

### Deployment & Hosting

- **Prepare the Kanban app files** for deployment, ensuring the project structure aligns with best practices for deployment.
- **Deploy the Kanban app to Netlify**, following the process of uploading your project and setting a custom deployment link.
- Test the deployed app to ensure that all features, including task creation, editing, local storage, and sorting, work as expected in a live environment.

### Initial Data Fetching & Loading State

- **Fetch tasks dynamically** from an API: https://jsl-kanban-api.vercel.app/

- **Replace any hard-coded task data**, to ensure the application receives the most up-to-date tasks.

- **Display a loading message** while the tasks are being fetched so that users are informed the data is loading.
- If fetching fails, **show an error message** to alert users to the issue.

### Data Persistence

- **Store fetched tasks in local storage** to ensure data persists across page reloads.
- On startup, **load tasks from local storage** and display them in their respective columns (To Do, Doing, Done) to maintain an organized task board.

### Task Editing & Deletion

- Allow users to **edit task details** (title, description, status) in a modal. Upon saving, the task should reflect the updated data on the board and in local storage.
- Implement a **delete button** within the modal to allow users to remove tasks. A confirmation message should appear before deleting a task, and if confirmed, the task will be removed from both the task board and local storage.

### Sidebar Interaction
With sidebar implementation I struggled to give the sidebar full functionality limiting it to only hiding when clicked on forcing users to reload the page inorder to view the sidebar

### Mobile Sidebar (Menu) Functionality

Was unable to implement mobile menu

### Theme Toggle (Dark/Light Mode)

- Included a **theme toggle switch** to allow users to switch between dark mode and light mode.
- The toggle should be functional in both the **desktop sidebar** and the **mobile menu** for consistent theme switching across devices.
- Ensure all elements of the **Kanban board** are styled appropriately in dark mode, ensuring good contrast and readability.

### Stretch Goal: Adding Priority (Optional)

Added a priority task setting however was unable to allow tasks to choose priority and set tasks in order or priority.

## Code Quality & Maintainability

- **Broke the code into separate modules** with clear responsibilities (e.g., local storage handling, task rendering, modal management) to improve maintainability and scalability.
- Use **descriptive, meaningful variable and function names** to make the code easy to understand.
- **Document every major function and module** using **JSDoc comments** to explain the purpose, parameters, and return values of each part of the code.

