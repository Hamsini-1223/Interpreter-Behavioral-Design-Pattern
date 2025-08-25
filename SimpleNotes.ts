// SimpleNotes.ts
// Terminal Expressions - the basic building blocks

import { MusicExpression } from "./MusicExpression";

// A single note - this is a Terminal Expression
export class Note implements MusicExpression {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  play(): string {
    return `Play note: ${this.name}`;
  }
}

// A rest (silence) - also a Terminal Expression
export class Rest implements MusicExpression {
  play(): string {
    return "Rest (silence)";
  }
}
