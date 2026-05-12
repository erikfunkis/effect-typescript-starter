# Effect Devtools / LSP Setup (Required)

This starter requires Effect LSP setup to keep agent iteration loops fast and reliable.

Primary reference:

- https://effect.website/docs/getting-started/devtools/

## 1) Install language service at repo root

Use your normal Vite+ workflow:

```bash
vp add -D @effect/language-service
```

## 2) Configure tsconfig plugin (beta-adapted)

Use the plugin shape aligned with `effect-smol`:

```json
{
  "compilerOptions": {
    "plugins": [
      {
        "name": "@effect/language-service",
        "transform": "@effect/language-service/transform",
        "namespaceImportPackages": ["effect", "@effect/*"]
      }
    ]
  }
}
```

## 3) Use workspace TypeScript in editor

In VS Code / Cursor, switch TypeScript to "Use Workspace Version".

## 4) Enable build-time diagnostics

Add prepare script so local TypeScript is patched automatically:

```json
{
  "scripts": {
    "prepare": "effect-language-service patch"
  }
}
```

## 5) Effect v4 beta note

Because this template targets Effect v4 beta, plugin defaults may evolve quickly.
When in doubt, prefer the current setup patterns in:

- `repos/effect-smol/tsconfig.base.json`
- `repos/effect-smol/tsconfig.json`
