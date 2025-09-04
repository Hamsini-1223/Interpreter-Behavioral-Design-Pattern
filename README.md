# Music Interpreter Pattern

A TypeScript implementation of the Interpreter Design Pattern using musical notation and expressions.

## Overview

This project demonstrates the Interpreter Pattern through a musical expression system where users can create, combine, and play musical elements like notes, chords, sequences, and repeating patterns.

## Installation

```bash
npm install
```

## Usage

```bash
npm start
```

## Project Structure

```
├── src/
│   ├── models/
│   │   ├── musicExpression.ts        # Core interface + context for interpretation
│   │   ├── terminalExpressions.ts    # Terminal expressions (Note, Rest)
│   │   └── compositeExpressions.ts   # Non-terminal expressions (Sequence, Chord, Repeat)
│   │
│   ├── services/
│   │   └── musicBuilder.ts           # Builds music via interactive CLI (Interpreter usage)
│   │
│   ├── utils/
│   │   └── errorUtils.ts             # Utility for error handling
│   │
│   └── interactiveDemo.ts            # Entry point: runs the interactive demo
│
├── README.md                         # Documentation
├── tsconfig.json                      # TypeScript configuration
└── package.json                       # Project dependencies & scripts
```

## Features

- **Terminal Expressions**: Create individual notes (C, D, E, F, G, A, B) and rests
- **Composite Expressions**: Build sequences, chords, and repeating patterns
- **Interactive Interface**: Menu-driven console application
- **Expression Management**: Save, list, and play musical expressions
- **Type Safety**: Full TypeScript implementation with strict error handling

## Design Pattern Implementation

- **Abstract Expression**: `MusicExpression` interface
- **Terminal Expressions**: `Note` and `Rest` classes
- **Non-terminal Expressions**: `Sequence`, `Chord`, and `Repeat` classes
- **Context**: `MusicContext` for maintaining state
- **Client**: `MusicBuilder` for expression creation and interpretation

## Code Examples

### Creating Basic Elements

```typescript
import { Note, Rest } from "./models/terminalExpressions";

// Create individual notes
const c = new Note("C");
const d = new Note("D");
const e = new Note("E");

console.log(c.play()); // Output: Play note: C

// Create a rest (silence)
const rest = new Rest();
console.log(rest.play()); // Output: Rest (silence)
```

### Building Composite Expressions

```typescript
import { Sequence, Chord, Repeat } from "./models/compositeExpressions";

// Create a sequence (notes played one after another)
const melody = new Sequence([c, d, e]);
console.log(melody.play());
// Output: Play note: C -> Play note: D -> Play note: E

// Create a chord (notes played simultaneously)
const cMajorChord = new Chord([c, e, new Note("G")]);
console.log(cMajorChord.play());
// Output: [Play note: C + Play note: E + Play note: G]

// Create a repeating pattern
const repeatedChord = new Repeat(cMajorChord, 3);
console.log(repeatedChord.play());
// Output: Repeat 3x: ([Play note: C + Play note: E + Play note: G], [Play note: C + Play note: E + Play note: G], [Play note: C + Play note: E + Play note: G])
```

### Complex Nested Expressions

```typescript
// Combine different expression types
const verse = new Sequence([
  cMajorChord,
  rest,
  new Chord([new Note("F"), new Note("A")]),
  melody,
]);

console.log(verse.play());
// Output: [Play note: C + Play note: E + Play note: G] -> Rest (silence) -> [Play note: F + Play note: A] -> Play note: C -> Play note: D -> Play note: E
```

## Interactive Demo Output

When you run `npm start`, you'll see:

```
========================================
MUSIC INTERPRETER PATTERN
========================================
1. Create note
2. Create rest
3. Create sequence
4. Create chord
5. Create repeat
6. Play expression
7. List expressions
8. Exit
========================================
Select option (1-8): 1
Enter note (C, D, E, F, G, A, B): C
Save as: middle_c
Created: Play note: C
Saved as: middle_c

Select option (1-8): 4
Available expressions:
middle_c
Enter names (comma-separated): middle_c,middle_c,middle_c
Save as: c_chord
Created: [Play note: C + Play note: C + Play note: C]
Saved as: c_chord
```

## Requirements

- Node.js 14+
- TypeScript 4.9+

## Built By

Ms Hamsini S
