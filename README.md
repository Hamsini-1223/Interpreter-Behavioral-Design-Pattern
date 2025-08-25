# Music Interpreter Pattern

TypeScript implementation of the Interpreter Design Pattern using musical notation as a domain-specific language.

## Overview

This project demonstrates the Interpreter behavioral design pattern by creating a simple musical language where users can build and play musical expressions through an interactive console interface.

## Installation

```bash
git clone https://github.com/yourusername/music-interpreter-pattern.git
cd music-interpreter-pattern
npm install
```

### Prerequisites

- Node.js (v14+)
- TypeScript (v4.0+)

## Usage

```bash
npm start
```

This launches an interactive console where you can:

- Create musical notes (C, D, E, F, G, A, B)
- Build sequences (notes in order)
- Create chords (notes together)
- Add repetition patterns
- Save and play compositions

## Project Structure

```
├── MusicExpression.ts      # Core interface
├── SimpleNotes.ts          # Basic elements (Note, Rest)
├── MusicCombinations.ts    # Composite elements (Sequence, Chord, Repeat)
├── InteractiveDemo.ts      # Console interface
└── package.json           # Configuration
```

## Pattern Implementation

**AbstractExpression**: `MusicExpression` interface defines `play()` method

**Terminal Expressions**:

- `Note` - single musical note
- `Rest` - silence/pause

**Non-Terminal Expressions**:

- `Sequence` - plays expressions in order
- `Chord` - plays expressions simultaneously
- `Repeat` - repeats expression multiple times

**Client**: `InteractiveMusicBuilder` manages expression creation and interpretation

## Example

```typescript
import { Note, Chord, Sequence } from "./SimpleNotes";

const c = new Note("C");
const e = new Note("E");
const g = new Note("G");

const chord = new Chord([c, e, g]);
console.log(chord.play()); // [Play note: C + Play note: E + Play note: G]

const melody = new Sequence([c, e, g]);
console.log(melody.play()); // Play note: C -> Play note: E -> Play note: G
```

## Output

Sample console interaction:

```
==================================================
MUSIC INTERPRETER PATTERN - INTERACTIVE DEMO
==================================================
1. Create a single note
2. Create a rest (silence)
3. Create a sequence (notes in order)
4. Create a chord (notes together)
5. Create a repeat pattern
6. Play a saved expression
7. Show all saved expressions
8. Show pattern explanation
9. Exit
==================================================
Choose an option (1-9): 1

Enter note name (like C, D, E, F, G, A, B): C
Give this note a name to save it as: c_note
Created note: Play note: C
Saved as: c_note

Choose an option (1-9): 4
Available expressions:
Available: c_note

Enter expression names separated by commas for chord: c_note, c_note
Give this chord a name: c_chord
Created chord: [Play note: C + Play note: C]
Saved as: c_chord

Choose an option (1-9): 6
Available expressions:
Available: c_note, c_chord

Enter expression name to play: c_chord

Playing 'c_chord':
Output: [Play note: C + Play note: C]
(This is how the Interpreter Pattern works - each object interprets itself!)
```

## Building

```bash
# Compile TypeScript files
npm run build

# Run compiled demo
node InteractiveDemo.js
```

## Extending

Add new musical elements by implementing `MusicExpression`:

```typescript
export class Loud implements MusicExpression {
  constructor(private expression: MusicExpression) {}

  play(): string {
    return `LOUD: ${this.expression.play()}`;
  }
}
```

## Built by

Ms Hamsini S
