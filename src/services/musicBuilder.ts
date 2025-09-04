import * as readline from "readline";
import { MusicExpression } from "../models/musicExpression";
import { Note, Rest } from "../models/terminalExpressions";
import { Sequence, Chord, Repeat } from "../models/compositeExpressions";
import { getErrorMessage } from "../utils/errorUtils";

export class MusicBuilder {
  private rl: readline.Interface;
  private savedExpressions: Map<string, MusicExpression> = new Map();

  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  showMenu(): void {
    console.log("\n" + "=".repeat(40));
    console.log("MUSIC INTERPRETER PATTERN");
    console.log("=".repeat(40));
    console.log("1. Create note");
    console.log("2. Create rest");
    console.log("3. Create sequence");
    console.log("4. Create chord");
    console.log("5. Create repeat");
    console.log("6. Play expression");
    console.log("7. List expressions");
    console.log("8. Exit");
    console.log("=".repeat(40));

    this.rl.question("Select option (1-8): ", (answer) => {
      this.handleChoice(answer.trim());
    });
  }

  private handleChoice(choice: string): void {
    try {
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
          this.listExpressions();
          break;
        case "8":
          console.log("Goodbye!");
          this.rl.close();
          return;
        default:
          console.log("Invalid option. Please try again.");
          this.showMenu();
      }
    } catch (error) {
      console.error(`Error: ${getErrorMessage(error)}`);
      this.showMenu();
    }
  }

  private createNote(): void {
    this.rl.question("Enter note (C, D, E, F, G, A, B): ", (noteName) => {
      try {
        if (!noteName.trim()) {
          throw new Error("Note name cannot be empty");
        }

        const note = new Note(noteName.trim());
        this.rl.question("Save as: ", (saveName) => {
          const name = saveName.trim();
          if (!name) {
            throw new Error("Save name cannot be empty");
          }

          this.savedExpressions.set(name, note);
          console.log(`Created: ${note.play()}`);
          console.log(`Saved as: ${name}`);
          this.showMenu();
        });
      } catch (error) {
        console.error(`Error: ${getErrorMessage(error)}`);
        this.createNote();
      }
    });
  }

  private createRest(): void {
    try {
      const rest = new Rest();
      this.rl.question("Save as: ", (saveName) => {
        const name = saveName.trim();
        if (!name) {
          console.error("Save name cannot be empty");
          this.createRest();
          return;
        }

        this.savedExpressions.set(name, rest);
        console.log(`Created: ${rest.play()}`);
        console.log(`Saved as: ${name}`);
        this.showMenu();
      });
    } catch (error) {
      console.error(`Error: ${getErrorMessage(error)}`);
      this.showMenu();
    }
  }

  private createSequence(): void {
    if (this.savedExpressions.size === 0) {
      console.log("No expressions available. Create some notes first.");
      this.showMenu();
      return;
    }

    console.log("Available expressions:");
    this.displayExpressions();

    this.rl.question("Enter names (comma-separated): ", (input) => {
      try {
        const names = input
          .split(",")
          .map((name) => name.trim())
          .filter((name) => name);

        if (names.length === 0) {
          throw new Error("At least one expression name is required");
        }

        const expressions = this.getExpressions(names);
        const sequence = new Sequence(expressions);

        this.rl.question("Save as: ", (saveName) => {
          const name = saveName.trim();
          if (!name) {
            throw new Error("Save name cannot be empty");
          }

          this.savedExpressions.set(name, sequence);
          console.log(`Created: ${sequence.play()}`);
          console.log(`Saved as: ${name}`);
          this.showMenu();
        });
      } catch (error) {
        console.error(`Error: ${getErrorMessage(error)}`);
        this.showMenu();
      }
    });
  }

  private createChord(): void {
    if (this.savedExpressions.size === 0) {
      console.log("No expressions available. Create some notes first.");
      this.showMenu();
      return;
    }

    console.log("Available expressions:");
    this.displayExpressions();

    this.rl.question("Enter names (comma-separated): ", (input) => {
      try {
        const names = input
          .split(",")
          .map((name) => name.trim())
          .filter((name) => name);

        if (names.length === 0) {
          throw new Error("At least one expression name is required");
        }

        const expressions = this.getExpressions(names);
        const chord = new Chord(expressions);

        this.rl.question("Save as: ", (saveName) => {
          const name = saveName.trim();
          if (!name) {
            throw new Error("Save name cannot be empty");
          }

          this.savedExpressions.set(name, chord);
          console.log(`Created: ${chord.play()}`);
          console.log(`Saved as: ${name}`);
          this.showMenu();
        });
      } catch (error) {
        console.error(`Error: ${getErrorMessage(error)}`);
        this.showMenu();
      }
    });
  }

  private createRepeat(): void {
    if (this.savedExpressions.size === 0) {
      console.log("No expressions available. Create some first.");
      this.showMenu();
      return;
    }

    console.log("Available expressions:");
    this.displayExpressions();

    this.rl.question("Enter expression name: ", (name) => {
      try {
        const expr = this.savedExpressions.get(name.trim());
        if (!expr) {
          throw new Error(`Expression '${name.trim()}' not found`);
        }

        this.rl.question("Repeat count: ", (timesStr) => {
          try {
            const times = parseInt(timesStr.trim());
            if (isNaN(times) || times <= 0) {
              throw new Error("Repeat count must be a positive number");
            }

            const repeat = new Repeat(expr, times);

            this.rl.question("Save as: ", (saveName) => {
              const saveNameTrimmed = saveName.trim();
              if (!saveNameTrimmed) {
                throw new Error("Save name cannot be empty");
              }

              this.savedExpressions.set(saveNameTrimmed, repeat);
              console.log(`Created: ${repeat.play()}`);
              console.log(`Saved as: ${saveNameTrimmed}`);
              this.showMenu();
            });
          } catch (error) {
            console.error(`Error: ${getErrorMessage(error)}`);
            this.createRepeat();
          }
        });
      } catch (error) {
        console.error(`Error: ${getErrorMessage(error)}`);
        this.showMenu();
      }
    });
  }

  private playExpression(): void {
    if (this.savedExpressions.size === 0) {
      console.log("No expressions available.");
      this.showMenu();
      return;
    }

    console.log("Available expressions:");
    this.displayExpressions();

    this.rl.question("Enter expression name: ", (name) => {
      try {
        const expr = this.savedExpressions.get(name.trim());
        if (!expr) {
          throw new Error(`Expression '${name.trim()}' not found`);
        }

        console.log(`\nPlaying '${name.trim()}':`);
        console.log(expr.play());
      } catch (error) {
        console.error(`Error: ${getErrorMessage(error)}`);
      }
      this.showMenu();
    });
  }

  private listExpressions(): void {
    console.log("\nSaved expressions:");
    console.log("-".repeat(30));

    if (this.savedExpressions.size === 0) {
      console.log("None");
    } else {
      try {
        for (const [name, expr] of this.savedExpressions) {
          console.log(`${name}: ${expr.play()}`);
        }
      } catch (error) {
        console.error(
          `Error displaying expressions: ${getErrorMessage(error)}`
        );
      }
    }
    this.showMenu();
  }

  private displayExpressions(): void {
    if (this.savedExpressions.size === 0) {
      console.log("(None)");
    } else {
      const names = Array.from(this.savedExpressions.keys());
      console.log(names.join(", "));
    }
  }

  private getExpressions(names: string[]): MusicExpression[] {
    const expressions: MusicExpression[] = [];
    const notFound: string[] = [];

    for (const name of names) {
      const expr = this.savedExpressions.get(name);
      if (expr) {
        expressions.push(expr);
      } else {
        notFound.push(name);
      }
    }

    if (notFound.length > 0) {
      console.warn(`Warning: Not found: ${notFound.join(", ")}`);
    }

    if (expressions.length === 0) {
      throw new Error("No valid expressions found");
    }

    return expressions;
  }

  start(): void {
    console.log("Music Interpreter Pattern Demo");
    console.log("Build and play musical expressions.");
    this.showMenu();
  }
}
