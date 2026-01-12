# Copilot Instructions for Three.js Portfolio

## Project Overview
Interactive 3D portfolio built with **Three.js**, **TypeScript**, and **Vite**. Uses orthographic camera with a custom scene management system and UI framework.

## Architecture

### Core Systems
- **Engine** ([src/core/Engine.ts](src/core/Engine.ts)): Main loop, renderer, and system initialization. Orchestrates Time, Input, and SceneManager.
- **SceneManager** ([src/scene/SceneManager.ts](src/scene/SceneManager.ts)): Manages scene lifecycle via `Scene` interface. Only one scene is active (`enabled`) at a time.
- **Camera** ([src/scene/Camera.ts](src/scene/Camera.ts)): Orthographic camera with fixed 500x500 base viewport. Use `Camera.size`, `Camera.bounds`, `Camera.getMouseWorldPosition()` for positioning.

### Scene Pattern
Scenes implement `Scene` interface with required methods:
```typescript
interface Scene {
  enabled: boolean; mother: THREE.Scene; self: THREE.Object3D;
  run(): void; refresh(): void; update(dt: number): void; finish(): void; resize(): void;
}
```
Scene transitions use callbacks: `onFinished`, `onReturned`.

### Object Hierarchy
- `SceneObject` → Base class extending `THREE.Object3D` with `update(dt)`, hover/press callbacks
- `UIObject` → Extends SceneObject with bounds, size, geometry helpers (`roundedPlaneGeometry`, `roundedLineGeometry`, `roundedTriangleGeometry`)
- UI components: `UIView`, `UIText`, `UIButton`, `UIScrollView`, `UIStackView`, `UIImageView`

### Data Singletons (use `.helper`)
- `Color.helper.get('text.primary')` / `.getHex()` — typed color tokens
- `Language.helper.get('main.headline')` — i18n strings (en/kr)
- `Time.self.deltaTime`, `Time.coroutine()`, `Time.coroutineSec()` — frame-based async
- `EventManager.self.addPointerDownListener()` — global input events

## Path Aliases
Configured in both `tsconfig.json` and `vite.config.ts`:
| Alias | Path |
|-------|------|
| `@ui/*` | `src/ui/*` |
| `@objects/*` | `src/objects/*` |
| `@styles/*` | `src/ui/styles/*` |
| `@data/*` | `src/data/*` |

## Key Conventions

### UI Components
- Pass bounds/size as `{ width, height }` or `{ x, y, width, height }`
- Use `setOpacity()`, `setSize()` for modifications
- `UIText` wraps `troika-three-text` via `TextMesh`
- Button states: `'hover' | 'press' | 'blur'`, controlled via `eventEnabled`

### Animations
Use `Time.coroutineSec(duration, updateFn, completeFn)` for timed animations:
```typescript
Time.coroutineSec(1.0, () => {
  opacity += Time.self!.deltaTime / 1.0;
  element.setOpacity(opacity);
}, () => { /* complete */ });
```

### Colors
Use semantic tokens: `'text.primary'`, `'background.primary'`, `'accent.primary'`, `'button.hover'`, etc.

## Commands
```bash
npm run dev      # Start dev server
npm run build    # TypeScript check + production build
npm run preview  # Preview production build
```

## Assets
- Fonts: `public/fonts/` (NotoSansCJKkr)
- 3D models: `public/resources/meshes/` (GLB format, load via `FileManager.loadGLB()`)
