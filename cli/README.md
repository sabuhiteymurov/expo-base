# create-expo-base

Scaffold a production-ready [Expo](https://expo.dev) app in seconds, powered by the [expo-base](https://github.com/sabuhiteymurov/expo-base) template — Expo SDK 57, Expo Router, TypeScript, and a curated set of optional features you pick during setup.

## Usage

```bash
npx create-expo-base my-app
```

Or with your preferred package manager:

```bash
yarn create expo-base my-app
pnpm create expo-base my-app
bun create expo-base my-app
```

The interactive CLI walks you through the setup:

```
┌  create-expo-base
│
◇  What will your project be called?
│  my-app
│
◇  Bundle identifier prefix? (e.g., com.company)
│  com.mycompany
│
◆  Which features would you like to include?
│  ◼ State Management (Redux Toolkit + MMKV + Persist)
│  ◼ Internationalization (i18next + expo-localization)
│  ◼ E2E Testing (Detox)
│  ◼ HTTP Client (Axios)
│  ◼ Forms & Validation (react-hook-form + zod)
│  ◼ UI Kit (Bottom Sheet (@expo/ui), Flash List, Bottom Tabs, SVG, Size Matters)
│  ◼ Animations (Reanimated + Worklets)
│  ◼ Network Info (NetInfo + UUID)
│
◇  Which package manager?
│  yarn
│
◇  Initialize a git repository?
│  Yes
```

Unselected features are cleanly stripped from the generated project — dependencies, config plugins, scripts, and source files included.

## What you get

- **Expo SDK 57** with React Native 0.86, React 19.2, and TypeScript 6
- **Expo Router** file-based navigation with a ready-made auth flow
- **Continuous Native Generation** — no checked-in `android`/`ios` folders
- **ESLint 9 (flat config) + Prettier**, husky + lint-staged + commitlint pre-wired
- **Jest + Testing Library** unit test setup, optional Detox e2e suite
- **EAS build profiles** for development, preview, and production

See the [expo-base repository](https://github.com/sabuhiteymurov/expo-base) for full documentation of the template, its folder structure, and each optional feature.

## Options

| Argument / flag         | Description                                                        |
| ----------------------- | ------------------------------------------------------------------ |
| `[project-name]`        | Positional; skips the project-name prompt                          |
| `--template-path <dir>` | Scaffold from a local template directory instead of downloading it |

## Requirements

- Node.js 18+

## License

MIT
