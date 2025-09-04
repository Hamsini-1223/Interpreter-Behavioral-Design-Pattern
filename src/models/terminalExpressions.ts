import { MusicExpression } from "./musicExpression";

export class Note implements MusicExpression {
  private name: string;

  constructor(name: string) {
    if (!name || typeof name !== "string") {
      throw new Error("Note name must be a non-empty string");
    }

    const validNotes = ["C", "D", "E", "F", "G", "A", "B"];
    const upperName = name.toUpperCase();

    if (!validNotes.includes(upperName)) {
      throw new Error(
        `Invalid note: ${name}. Valid notes are: ${validNotes.join(", ")}`
      );
    }

    this.name = upperName;
  }

  play(): string {
    return `Play note: ${this.name}`;
  }
}

export class Rest implements MusicExpression {
  play(): string {
    return "Rest (silence)";
  }
}
