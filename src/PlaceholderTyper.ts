export interface PlaceholderTyperOptions {
  strings: string[];
  speed?: number;
  delayBetween?: number;
  deleteSpeed?: number;
  loop?: boolean;
  cursor?: string;
}

export default class PlaceholderTyper {
  private el: HTMLInputElement | HTMLTextAreaElement;
  private options: Required<PlaceholderTyperOptions>;
  private index = 0;
  private charIndex = 0;
  private isActive = true;
  private timeoutId: number | null = null;

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
      cursor: "",
      ...options,
    };

    this.startTyping();
  }

  private async startTyping() {
    const { strings, loop } = this.options;

    while (this.isActive && (loop || this.index < strings.length)) {
      const text = strings[this.index % strings.length];

      if (!(await this.typePhrase(text))) break;
      if (!(await this.delayIfActive(this.options.delayBetween))) break;
      if (!(await this.deletePhrase())) break;

      this.index++;
    }
  }

  private async typePhrase(text: string): Promise<boolean> {
    if (!this.isActive) return false;
    this.charIndex = 0;

    while (this.charIndex <= text.length) {
      if (!this.isActive) return false;

      this.el.placeholder = text.slice(0, this.charIndex) + this.options.cursor;
      this.charIndex++;

      if (!(await this.delayIfActive(this.options.speed))) return false;
    }
    return true;
  }

  private async deletePhrase(): Promise<boolean> {
    if (!this.isActive) return false;

    while (this.charIndex > 0) {
      if (!this.isActive) return false;

      this.charIndex--;
      this.el.placeholder =
        this.el.placeholder.slice(0, this.charIndex) + this.options.cursor;

      if (!(await this.delayIfActive(this.options.deleteSpeed))) return false;
    }
    return true;
  }

  private delayIfActive(ms: number): Promise<boolean> {
    return new Promise((resolve) => {
      if (!this.isActive) return resolve(false);

      this.timeoutId = window.setTimeout(() => {
        this.timeoutId = null;
        resolve(this.isActive);
      }, ms);
    });
  }

  public stop() {
    this.isActive = false;
    if (this.timeoutId !== null) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  }
}
