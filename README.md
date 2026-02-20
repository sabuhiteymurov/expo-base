<p align="center">
  <img alt="Expo Base" width=600 src="https://raw.githubusercontent.com/sabuhiteymurov/expo-base/main/docs/img/expo-base-logo.png"/>
</p>

![Expo Base Top Language](https://img.shields.io/github/languages/top/sabuhiteymurov/expo-base)
![Expo Base Release Date](https://img.shields.io/github/release-date/sabuhiteymurov/expo-base)
[![CI](https://github.com/sabuhiteymurov/expo-base/actions/workflows/run-linters.yml/badge.svg)](https://github.com/sabuhiteymurov/expo-base/actions/workflows/run-linters.yml)
[![PR's welcome!](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/sabuhiteymurov/expo-base/pulls)

<h1 align="center">Expo Base</h1>

<h4 align="center">Expo boilerplate for rapid application development, featuring authentication and more.</h4>

<br>

- [Quick Start](#quick-start)
- [Boilerplate Features](#boilerplate-features)
- [Optional Features](#optional-features)
- [Folder Structure](#folder-structure)
  - [App](#app)
  - [Assets](#assets)
  - [Components](#components)
  - [Constants](#constants)
  - [Context](#context)
  - [E2E](#e2e)
  - [Hooks](#hooks)
  - [Screens](#screens)
  - [Services](#services)
  - [Store](#store)
  - [Translations](#translations)
- [Run Expo Dev Build](#run-expo-dev-build)

<br>

<a id="quick-start"></a>

## Quick Start

Scaffold a new project with the interactive CLI:

```bash
npx create-expo-base my-app
```

You'll be guided through a few prompts:

```
┌  create-expo-base v1.0.0
│
◇  What will your project be called?
│  my-app
│
◇  Bundle identifier prefix? (e.g., com.company)
│  com.mycompany
│
◆  Which features would you like to include?
│  ◼ State Management (Redux Toolkit + MMKV)
│  ◼ Internationalization (i18next)
│  ◻ E2E Testing (Detox)
│  ...
│
◇  Which package manager?
│  ● yarn  ○ npm  ○ pnpm  ○ bun
│
◇  Initialize a git repository?
│  Yes
│
└  Your project is ready!
```

Then start developing:

```bash
cd my-app
npx expo start
```

You can also pass the project name directly as an argument to skip the first prompt:

```bash
npx create-expo-base my-app
```

<br>

<a id="boilerplate-features"></a>

## Boilerplate Features

Every scaffolded project includes these out of the box:

- File-Based Routing (Expo Router)
- Vanilla StyleSheet Kit
- Dark Theme Support
- TypeScript Integration
- Font Management
- Splash Screen Configuration
- Authentication Setup (Expo Secure Store)

<br>

<a id="optional-features"></a>

## Optional Features

The CLI lets you pick which of these to include. Deselected features are cleanly removed — no leftover imports, deps, or dead code.

| Feature | Libraries |
|---|---|
| **State Management** | Redux Toolkit, MMKV, Redux Persist |
| **Internationalization** | i18next, react-i18next, expo-localization |
| **E2E Testing** | Detox, EAS Build test profiles |
| **HTTP Client** | Axios |
| **Forms & Validation** | react-hook-form, zod |
| **UI Kit** | Bottom Sheet, Flash List, Bottom Tabs, SVG, Size Matters |
| **Animations** | Reanimated, Worklets |
| **Network Info** | NetInfo, UUID |

<br>

<a id="folder-structure"></a>

# Folder Structure

```
e2e
src
 ├── @types
 ├── app
 ├── assets
     ├── fonts
     ├── images
     ├── svg
 ├── components
     └── UI
 ├── constants
 ├── context
 ├── hooks
     └── eas
 ├── screens
 ├── services
     ├── api
 ├── store
     └── slices
 └── translations
     └── locales
```

<a id="app"></a>

# App

Expo router app directory. Contains the application's routes. When a new file is added to this directory, it becomes a
navigable route.

<a id="assets"></a>

# Assets

Project assets such as fonts, images, and SVG files.

<a id="components"></a>

# Components

Base components used throughout the project, e.g., Text, SafeTop.

<a id="constants"></a>

# Constants

Reusable stylesheets and constants for the UI kit, e.g., colors, shadows, typography.

<a id="context"></a>

# Context

Context providers from third-party packages and custom providers, including authorization for routing. Examples include
React Context, Redux Context Provider, and Safe Area Provider.

<a id="e2e"></a>

# E2E

End-to-end tests for the project, structured similarly to screens for better management.

<a id="hooks"></a>

# Hooks

Base hooks used throughout the project, e.g., useKeyboardVisible.

<a id="screens"></a>

# Screens

Pages of the application, organized in this folder and imported into specific routes in the app directory.

<a id="services"></a>

# Services

Services used in screens, such as API handling. The `api` folder contains routes created
with Axios instances.

<a id="store"></a>

# Store

RTK based store, uses MMKV storage and redux-persist for state persistence. The `slices` folder includes reducers used throughout the app.

<a id="translations"></a>

# Translations

The `translations` folder contains functions and locales for internationalization and localization.

<a id="run-expo-dev-build"></a>

# Run in Expo Dev Build

- Set up the development
  build: [Expo Dev Build Documentation](https://docs.expo.dev/develop/development-builds/create-a-build).
- Install dependencies: `npm install` or `yarn install`.
- Run on both Android & iOS: `npm start` (or `yarn start`).
- Run on Android: `npm run android` (or `yarn android`).
- Run on iOS: `npm run ios` (or `yarn ios`).
