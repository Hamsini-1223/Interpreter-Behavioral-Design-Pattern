import { MusicBuilder } from "./services/musicBuilder";
import { getErrorMessage } from "./utils/errorUtils";

try {
  const demo = new MusicBuilder();
  demo.start();
} catch (error) {
  console.error(`Failed to start demo: ${getErrorMessage(error)}`);
  process.exit(1);
}
