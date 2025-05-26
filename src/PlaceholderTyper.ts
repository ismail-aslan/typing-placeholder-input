export interface PlaceholderTyperOptions {
  strings: string[];
  speed?: number;
  delayBetween?: number;
  deleteSpeed?: number;
  loop?: boolean;
  startDelay?: number;
  cursor?: string;
}

export default class PlaceholderTyper {
  private el: HTMLInputElement | HTMLTextAreaElement;
  private options: Required<PlaceholderTyperOptions>;
  private index = 0;
  private charIndex = 0;

  constructor(
    selector: string | HTMLInputElement | HTMLTextAreaElement,
    options: PlaceholderTyperOptions
  ) {
    const el =
      typeof selector === "string"
        ? document.querySelector(selector)
        : selector;
    if (
      !el ||
      !(el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement)
    ) {
      throw new Error("Invalid input element");
    }
    this.el = el;

    this.options = {
      speed: 70,
      delayBetween: 1500,
      deleteSpeed: 40,
      loop: true,
      startDelay: 0,
      cursor: "",
      ...options,
    };

    if (this.options.startDelay) {
      setTimeout(() => this.startTyping(), this.options.startDelay);
    } else {
      this.startTyping();
    }
  }

  private async startTyping() {
    const { strings, loop } = this.options;
    while (loop || this.index < strings.length) {
      const text = strings[this.index % strings.length];
      await this.typePhrase(text);
      await this.delay(this.options.delayBetween);
      await this.deletePhrase();
      this.index++;
    }
  }

  private async typePhrase(text: string) {
    this.charIndex = 0;
    while (this.charIndex <= text.length) {
      this.el.placeholder = text.slice(0, this.charIndex) + this.options.cursor;
      await this.delay(this.options.speed);
      this.charIndex++;
    }
  }

  private async deletePhrase() {
    while (this.charIndex > 0) {
      this.charIndex--;
      this.el.placeholder =
        this.el.placeholder.slice(0, this.charIndex) + this.options.cursor;
      await this.delay(this.options.deleteSpeed);
    }
  }

  private delay(ms: number) {
    return new Promise((res) => setTimeout(res, ms));
  }
}
