/**
 * Generates a ISO 8601 String
 * of a date 1 hour from now.
 */
const ttl = (): string => new Date(Date.now() + 60 * 60 * 1000).toISOString();

export { ttl };
