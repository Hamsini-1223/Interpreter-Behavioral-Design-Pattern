import { MusicExpression } from "./musicExpression";
import { getErrorMessage } from "../utils/errorUtils";

export class Sequence implements MusicExpression {
  private notes: MusicExpression[];

  constructor(notes: MusicExpression[]) {
    if (!Array.isArray(notes) || notes.length === 0) {
      throw new Error("Sequence must contain at least one expression");
    }

    if (notes.some((note) => !note || typeof note.play !== "function")) {
      throw new Error("All elements must be valid MusicExpression objects");
    }

    this.notes = notes;
  }

  play(): string {
    try {
      const results = this.notes.map((note) => note.play());
      return results.join(" -> ");
    } catch (error) {
      throw new Error(`Error playing sequence: ${getErrorMessage(error)}`);
    }
  }
}

export class Chord implements MusicExpression {
  private notes: MusicExpression[];

  constructor(notes: MusicExpression[]) {
    if (!Array.isArray(notes) || notes.length === 0) {
      throw new Error("Chord must contain at least one expression");
    }

    if (notes.some((note) => !note || typeof note.play !== "function")) {
      throw new Error("All elements must be valid MusicExpression objects");
    }

    this.notes = notes;
  }

  play(): string {
    try {
      const results = this.notes.map((note) => note.play());
      return `[${results.join(" + ")}]`;
    } catch (error) {
      throw new Error(`Error playing chord: ${getErrorMessage(error)}`);
    }
  }
}

export class Repeat implements MusicExpression {
  private pattern: MusicExpression;
  private times: number;

  constructor(pattern: MusicExpression, times: number) {
    if (!pattern || typeof pattern.play !== "function") {
      throw new Error("Pattern must be a valid MusicExpression object");
    }

    if (!Number.isInteger(times) || times <= 0) {
      throw new Error("Repeat times must be a positive integer");
    }

    if (times > 100) {
      throw new Error("Repeat times cannot exceed 100");
    }

    this.pattern = pattern;
    this.times = times;
  }

  play(): string {
    try {
      const result = this.pattern.play();
      const repeated = Array(this.times).fill(result);
      return `Repeat ${this.times}x: (${repeated.join(", ")})`;
    } catch (error) {
      throw new Error(`Error playing repeat: ${getErrorMessage(error)}`);
    }
  }
}
