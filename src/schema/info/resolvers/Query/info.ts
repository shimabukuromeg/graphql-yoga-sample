export const info = (
  parent: unknown,
  args: Record<string, never>,
  context: unknown,
  info: unknown,
) => {
  /* Implement Query.info resolver logic here */
  const message = 'This is the API of a Hackernews Clone';
  return message;
};
