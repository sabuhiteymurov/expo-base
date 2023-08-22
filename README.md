<h1 align="center">Expo Base</h1>

<h4 align="center">Expo boilerplate for rapid application development, featuring authentication and more.</h4>

<br>

- [Boilerplate Features](#boilerplate-features)
- [Folder Structure](#folder-structure)
  - [App](#app)
  - [Assets](#assets)
  - [Components](#components)
  - [Constants](#constants)
  - [Context](#context)
  - [E2E](#e2e)
  - [Helpers](#helpers)
  - [Hooks](#hooks)
  - [Screens](#screens)
  - [Services](#services)
  - [Store](#store)
- [Run Expo Dev Build](#run-expo-dev-build)

<br>

<a id="boilerplate-features"></a>

## Boilerplate Features

- File-Based Routing
- Vanilla StyleSheet Kit
- Network Handling
- Local Storage Management
- Dark Theme Support
- Internationalization and Localization
- TypeScript Integration
- Font Management
- Splash Screen Configuration
- Authentication Setup
- End-to-End Testing Support

<br>

<a id="folder-structure"></a>

# Folder Structure

```
src
 ├── app
 ├── assets
     ├── fonts
     ├── images
     ├── svg
 ├── components
     └── UI
 ├── constants
 ├── context
 ├── e2e
 ├── helpers
 ├── hooks
     └── eas
 ├── screens
 ├── services
     ├── api
     ├── i18n
 └── store
     └── slices
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

<a id="helpers"></a>

# Helpers

Reusable helper functions, such as MMKV storage instance.

<a id="hooks"></a>

# Hooks

Base hooks used throughout the project, e.g., useKeyboardVisible.

<a id="screens"></a>

# Screens

Pages of the application, organized in this folder and imported into specific routes in the app directory.

<a id="services"></a>

# Services

Services used in screens, such as API handling and internationalization (i18n). The `api` folder contains routes created
with Axios instances, and the `i18n` folder contains functions for internationalization and localization.

<a id="store"></a>

# Store

RTK-based store with interfaces and slices for state management.

<a id="run-expo-dev-build"></a>

# Run in Expo Dev Build

- Set up the development
  build: [Expo Dev Build Documentation](https://docs.expo.dev/develop/development-builds/create-a-build).
- Install dependencies: `npm install` or `yarn install`.
- Run on both Android & iOS: `npm start` (or `yarn start`).
- Run on Android: `npm run android` (or `yarn android`).
- Run on iOS: `npm run ios` (or `yarn ios`).
- ✨ Don't forget to enable ESLint ✨

```

```
