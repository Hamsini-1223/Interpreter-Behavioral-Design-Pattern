// MusicCombinations.ts
// Non-Terminal Expressions - combinations of other music elements

import { MusicExpression } from "./MusicExpression";

// Play multiple notes one after another
export class Sequence implements MusicExpression {
  private notes: MusicExpression[];

  constructor(notes: MusicExpression[]) {
    this.notes = notes;
  }

  play(): string {
    const results = this.notes.map((note) => note.play());
    return results.join(" -> ");
  }
}

// Play multiple notes at the same time
export class Chord implements MusicExpression {
  private notes: MusicExpression[];

  constructor(notes: MusicExpression[]) {
    this.notes = notes;
  }

  play(): string {
    const results = this.notes.map((note) => note.play());
    return `[${results.join(" + ")}]`;
  }
}

// Repeat a music pattern
export class Repeat implements MusicExpression {
  private pattern: MusicExpression;
  private times: number;

  constructor(pattern: MusicExpression, times: number) {
    this.pattern = pattern;
    this.times = times;
  }

  play(): string {
    const result = this.pattern.play();
    const repeated = [];
    for (let i = 0; i < this.times; i++) {
      repeated.push(result);
    }
    return `Repeat ${this.times}x: (${repeated.join(", ")})`;
  }
}
