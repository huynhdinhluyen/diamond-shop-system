export function handleError(message, error) {
  console.error(message, error);
  throw error;
}
