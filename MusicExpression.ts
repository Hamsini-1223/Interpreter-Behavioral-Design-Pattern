// MusicExpression.ts
// The AbstractExpression interface - defines what all music elements must do

export interface MusicExpression {
  // Every music element must know how to "play" itself
  play(): string;
}

// Simple context to hold current state
export class MusicContext {
  public currentBeat: number = 0;

  constructor() {
    this.currentBeat = 0;
  }

  nextBeat(): void {
    this.currentBeat++;
  }
}
