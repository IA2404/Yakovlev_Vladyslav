
/**
 * Generates a unique string identifier.
 * Combines the current timestamp with a random component to ensure uniqueness.
 *
 * @returns {string} A unique ID string.
 */
export function idGenerator () {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}