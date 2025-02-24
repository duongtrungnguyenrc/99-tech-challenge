# React.js + Vite

![Vite](https://vitejs.dev/logo.svg)

## Introduction

This project is built using [Vite](https://vitejs.dev/) and [React.js](https://react.dev/). Vite is an extremely fast build tool for modern web applications.

## Installation

First, make sure you have [Node.js](https://nodejs.org/) installed (version 20 or later).

Clone the repository and install dependencies:

```sh
# Clone repo
git clone https://github.com/duongtrungnguyenrc/99-tech-challenge.git
cd 99-tech-challenge

# Install dependencies
npm install
```

## ▶️ Run the project

After installing dependencies, start the server with:

```sh
npm run dev
```

Then, open your browser and go to `http://localhost:5173/`.

## Build the project

To build the project for production:

```sh
npm run build
```

The output will be located in the `dist/` directory.

## Project Structure

```plaintext
📦 your-repo
├── 📂 src             # Main source code
│   ├── 📂 components  # Reusable components
│   ├── 📂 lib         # common library
│   ├── 📂 pages       # Main application pages
│   ├── 📂 assets      # Images, CSS, static files
│   ├── App.tsx       # Application entry point
│   ├── main.tsx      # Main React file
├── 📂 public          # Contains favicon, manifest.json, etc.
├── 📜 .gitignore      # List of ignored files/folders for Git
├── 📜 package.json    # Dependencies and scripts
├── 📜 vite.config.js  # Vite configuration
└── 📜 README.md       # This file
```
