# typing-placeholder-input

> A small library to animate placeholder text with a typing effect for input and textarea elements. Works with both **Vanilla JS** and **React**.

![npm](https://img.shields.io/npm/v/typing-placeholder-input)
![License](https://img.shields.io/npm/l/typing-placeholder-input)
![TypeScript](https://img.shields.io/badge/TypeScript-yes-blue)

---

## ✨ Features

- Animate placeholder text in `input` or `textarea`
- Smooth typing and deleting
- Looping support
- Custom cursor character
- Works with **React** or plain **JavaScript**
- Written in **TypeScript**

---

## 📦 Installation

```bash
npm install typing-placeholder-input
# or
yarn add typing-placeholder-input
```

---

## 🚀 Quick Start

### ✅ Vanilla JavaScript

```html
<input id="typer" />
<textarea id="typer-textarea"></textarea>

<script type="module">
  import { PlaceholderTyper } from "typing-placeholder-input";

  new PlaceholderTyper("#typer", {
    strings: [
      "Looking for inspiration?",
      "Type a keyword: AI, nature, dreams...",
      "Start typing to unlock ideas ✨",
    ],
    speed: 100,
    delayBetween: 1000,
    deleteSpeed: 60,
    loop: true,
    cursor: "|",
  });

  new PlaceholderTyper("#typer-textarea", {
    strings: [
      "Start typing your thoughts here...",
      "A poem, an idea, or just a random note.\nNo pressure, just flow.",
    ],
    speed: 100,
    delayBetween: 1000,
    deleteSpeed: 60,
    loop: true,
    cursor: "|",
  });
</script>
```

### ✅ React

```tsx
import TypingInput from "typing-placeholder-input/react";

function App() {
  return (
    <div
      style={{
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <TypingInput
        as="input"
        strings={[
          "Looking for inspiration?",
          "Type a keyword: AI, nature, dreams...",
          "Start typing to unlock ideas ✨",
        ]}
        loop
        style={{ width: "300px" }}
      />
      <TypingInput
        as="textarea"
        strings={[
          "Write your thoughts here...",
          "This is your space to be creative.",
        ]}
        loop
        speed={100}
        delayBetween={1000}
        cursor="|"
        style={{ width: "300px", height: "150px" }}
      />
    </div>
  );
}
```

---

## 📘 API Reference

### PlaceholderTyper (Vanilla JS)

```ts
new PlaceholderTyper(
  selector: string | HTMLInputElement | HTMLTextAreaElement,
  options: PlaceholderTyperOptions
)
```

#### PlaceholderTyperOptions

| Name           | Type       | Default | Description                     |
| -------------- | ---------- | ------- | ------------------------------- |
| `strings`      | `string[]` | —       | Strings to type                 |
| `speed`        | `number`   | 70      | Typing speed in ms              |
| `delayBetween` | `number`   | 1500    | Delay between phrases in ms     |
| `deleteSpeed`  | `number`   | 40      | Deletion speed in ms            |
| `loop`         | `boolean`  | true    | Loop back to first string       |
| `cursor`       | `string`   | `""`    | Character appended while typing |

#### Methods

- `stop(): void` — Immediately stops the typing loop.

---

### React Component: `TypingInput`

Props include all `PlaceholderTyperOptions` plus:

| Prop        | Type                      | Description             |
| ----------- | ------------------------- | ----------------------- |
| `as`        | `"input"` or `"textarea"` | Which element to render |
| `className` | `string`                  | Optional class name     |
| `style`     | `React.CSSProperties`     | Optional inline styles  |
| `name`      | `string`                  | Input name              |

---

## 📁 Project Structure

```
typing-placeholder-input/
├── dist/                   # Compiled output
│   ├── index.js
│   ├── index.d.ts
│   └── react/
├── src/                    # Source files
│   ├── PlaceholderTyper.ts
│   └── react/TypingInput.tsx
├── example/                # Demos
│   ├── vanilla/
│   └── react/
├── package.json
├── vite.config.ts
└── README.md
```

---

## 🧪 Examples

### Vanilla Demo

Open `example/vanilla/index.html` in a browser or run:

```bash
npm run example:vanilla
```

### React Demo

Located in `example/react/`, run:

```bash
cd example/react
npm install
npm run dev
```

---

## 🛠 Development

```bash
# Build library
npm run build
```

Uses `vite-plugin-dts` to bundle type declarations.

---

## 🧾 License

MIT © [Ismail Aslan](mailto:ismailaslan1097@gmail.com)

---

## 🙌 Feedback / Contributions

PRs and issues welcome. If you use this in your project, I’d love to hear about it!
