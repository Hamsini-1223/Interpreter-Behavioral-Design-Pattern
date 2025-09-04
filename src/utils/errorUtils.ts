/**
 * Safely extracts an error message from an unknown error value
 * @param error - The caught error of unknown type
 * @returns A string representation of the error message
 */
export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  return String(error);
}
