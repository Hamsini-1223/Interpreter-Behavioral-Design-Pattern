export interface MusicExpression {
  play(): string;
}

export class MusicContext {
  public currentBeat: number = 0;

  constructor() {
    this.currentBeat = 0;
  }

  nextBeat(): void {
    this.currentBeat++;
  }
}
