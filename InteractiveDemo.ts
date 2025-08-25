// InteractiveDemo.ts
// Interactive console demo for the Music Interpreter Pattern

import * as readline from "readline";
import { MusicExpression } from "./MusicExpression";
import { Note, Rest } from "./SimpleNotes";
import { Sequence, Chord, Repeat } from "./MusicCombinations";

class InteractiveMusicBuilder {
  private rl: readline.Interface;
  private savedExpressions: Map<string, MusicExpression> = new Map();

  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  showMenu(): void {
    console.log("\n" + "=".repeat(50));
    console.log("MUSIC INTERPRETER PATTERN - INTERACTIVE DEMO");
    console.log("=".repeat(50));
    console.log("1. Create a single note");
    console.log("2. Create a rest (silence)");
    console.log("3. Create a sequence (notes in order)");
    console.log("4. Create a chord (notes together)");
    console.log("5. Create a repeat pattern");
    console.log("6. Play a saved expression");
    console.log("7. Show all saved expressions");
    console.log("8. Show pattern explanation");
    console.log("9. Exit");
    console.log("=".repeat(50));

    this.rl.question("Choose an option (1-9): ", (answer) => {
      this.handleMenuChoice(answer.trim());
    });
  }

  handleMenuChoice(choice: string): void {
    switch (choice) {
      case "1":
        this.createNote();
        break;
      case "2":
        this.createRest();
        break;
      case "3":
        this.createSequence();
        break;
      case "4":
        this.createChord();
        break;
      case "5":
        this.createRepeat();
        break;
      case "6":
        this.playExpression();
        break;
      case "7":
        this.showSavedExpressions();
        break;
      case "8":
        this.showPatternExplanation();
        break;
      case "9":
        console.log("Thanks for exploring the Interpreter Pattern!");
        this.rl.close();
        return;
      default:
        console.log("Invalid choice. Please try again.");
        this.showMenu();
    }
  }

  createNote(): void {
    this.rl.question(
      "Enter note name (like C, D, E, F, G, A, B): ",
      (noteName) => {
        if (noteName.trim()) {
          const note = new Note(noteName.trim().toUpperCase());
          this.rl.question(
            "Give this note a name to save it as: ",
            (saveName) => {
              this.savedExpressions.set(saveName.trim(), note);
              console.log(`Created note: ${note.play()}`);
              console.log(`Saved as: ${saveName.trim()}`);
              this.showMenu();
            }
          );
        } else {
          console.log("Please enter a valid note name.");
          this.createNote();
        }
      }
    );
  }

  createRest(): void {
    const rest = new Rest();
    this.rl.question("Give this rest a name to save it as: ", (saveName) => {
      this.savedExpressions.set(saveName.trim(), rest);
      console.log(`Created: ${rest.play()}`);
      console.log(`Saved as: ${saveName.trim()}`);
      this.showMenu();
    });
  }

  createSequence(): void {
    console.log("Available expressions:");
    this.listExpressions();

    this.rl.question(
      "Enter expression names separated by commas (e.g., note1, note2, rest1): ",
      (input) => {
        const names = input.split(",").map((name) => name.trim());
        const expressions: MusicExpression[] = [];

        for (const name of names) {
          const expr = this.savedExpressions.get(name);
          if (expr) {
            expressions.push(expr);
          } else {
            console.log(`Warning: '${name}' not found, skipping.`);
          }
        }

        if (expressions.length > 0) {
          const sequence = new Sequence(expressions);
          this.rl.question("Give this sequence a name: ", (saveName) => {
            this.savedExpressions.set(saveName.trim(), sequence);
            console.log(`Created sequence: ${sequence.play()}`);
            console.log(`Saved as: ${saveName.trim()}`);
            this.showMenu();
          });
        } else {
          console.log(
            "No valid expressions found. Try creating some notes first."
          );
          this.showMenu();
        }
      }
    );
  }

  createChord(): void {
    console.log("Available expressions:");
    this.listExpressions();

    this.rl.question(
      "Enter expression names separated by commas for chord: ",
      (input) => {
        const names = input.split(",").map((name) => name.trim());
        const expressions: MusicExpression[] = [];

        for (const name of names) {
          const expr = this.savedExpressions.get(name);
          if (expr) {
            expressions.push(expr);
          } else {
            console.log(`Warning: '${name}' not found, skipping.`);
          }
        }

        if (expressions.length > 0) {
          const chord = new Chord(expressions);
          this.rl.question("Give this chord a name: ", (saveName) => {
            this.savedExpressions.set(saveName.trim(), chord);
            console.log(`Created chord: ${chord.play()}`);
            console.log(`Saved as: ${saveName.trim()}`);
            this.showMenu();
          });
        } else {
          console.log(
            "No valid expressions found. Try creating some notes first."
          );
          this.showMenu();
        }
      }
    );
  }

  createRepeat(): void {
    console.log("Available expressions:");
    this.listExpressions();

    this.rl.question("Enter expression name to repeat: ", (name) => {
      const expr = this.savedExpressions.get(name.trim());
      if (expr) {
        this.rl.question("How many times to repeat? ", (timesStr) => {
          const times = parseInt(timesStr.trim());
          if (times > 0) {
            const repeat = new Repeat(expr, times);
            this.rl.question(
              "Give this repeat pattern a name: ",
              (saveName) => {
                this.savedExpressions.set(saveName.trim(), repeat);
                console.log(`Created repeat: ${repeat.play()}`);
                console.log(`Saved as: ${saveName.trim()}`);
                this.showMenu();
              }
            );
          } else {
            console.log("Please enter a valid number greater than 0.");
            this.createRepeat();
          }
        });
      } else {
        console.log(`Expression '${name.trim()}' not found.`);
        this.showMenu();
      }
    });
  }

  playExpression(): void {
    console.log("Available expressions:");
    this.listExpressions();

    this.rl.question("Enter expression name to play: ", (name) => {
      const expr = this.savedExpressions.get(name.trim());
      if (expr) {
        console.log(`\nPlaying '${name.trim()}':`);
        console.log(`Output: ${expr.play()}`);
        console.log(
          "(This is how the Interpreter Pattern works - each object interprets itself!)"
        );
      } else {
        console.log(`Expression '${name.trim()}' not found.`);
      }
      this.showMenu();
    });
  }

  showSavedExpressions(): void {
    console.log("\nAll saved expressions:");
    console.log("-".repeat(30));
    if (this.savedExpressions.size === 0) {
      console.log("No expressions saved yet.");
    } else {
      for (const [name, expr] of this.savedExpressions) {
        console.log(`${name}: ${expr.play()}`);
      }
    }
    this.showMenu();
  }

  listExpressions(): void {
    if (this.savedExpressions.size === 0) {
      console.log("(No expressions saved yet)");
    } else {
      const names = Array.from(this.savedExpressions.keys());
      console.log(`Available: ${names.join(", ")}`);
    }
  }

  showPatternExplanation(): void {
    console.log("\n" + "=".repeat(60));
    console.log("INTERPRETER PATTERN EXPLANATION");
    console.log("=".repeat(60));
    console.log(
      "Real-world analogy: Musicians reading and playing sheet music"
    );
    console.log("");
    console.log("Pattern Components:");
    console.log("1. AbstractExpression (MusicExpression interface)");
    console.log("   - Defines play() method that all music elements must have");
    console.log("");
    console.log("2. Terminal Expressions (Note, Rest classes)");
    console.log("   - Basic building blocks (leaf nodes)");
    console.log("   - Directly interpret themselves");
    console.log("");
    console.log("3. Non-Terminal Expressions (Sequence, Chord, Repeat)");
    console.log("   - Composite expressions (branch nodes)");
    console.log("   - Contain other expressions and combine their results");
    console.log("");
    console.log("4. Client (This interactive program)");
    console.log("   - Builds the Abstract Syntax Tree");
    console.log("   - Calls interpret methods to get results");
    console.log("");
    console.log("How it works:");
    console.log("- You build musical expressions like building blocks");
    console.log("- Each expression knows how to 'interpret' itself");
    console.log("- Complex music is made by combining simple pieces");
    console.log(
      "- When you play something, it recursively interprets the tree"
    );
    console.log("=".repeat(60));
    this.showMenu();
  }

  start(): void {
    console.log("Welcome to the Interactive Music Interpreter Pattern Demo!");
    console.log(
      "This shows how the Interpreter Pattern works using music as an example."
    );
    console.log(
      "You'll build musical expressions step by step and see how they interpret themselves."
    );
    this.showMenu();
  }
}

const demo = new InteractiveMusicBuilder();
demo.start();
