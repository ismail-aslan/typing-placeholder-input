import TypingInput from "typing-placeholder-input/react";

export default function App() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        alignItems: "center",
        padding: "2rem",
      }}
    >
      <TypingInput
        as="input"
        strings={[
          "Looking for inspiration?",
          "Type a keyword: AI, nature, dreams...",
          "What's on your mind today?",
          "Start typing to unlock ideas ✨",
        ]}
        loop
        style={{
          width: "300px",
        }}
      />
      <TypingInput
        as="textarea"
        strings={[
          "Start typing your thoughts here...",
          "It can be a poem, an idea, or just a random note.\n\nDon't worry — no one is judging.",
        ]}
        loop
        speed={100}
        delayBetween={1000}
        cursor="|"
        style={{
          width: "300px",
          height: "180px",
        }}
      />
    </div>
  );
}
