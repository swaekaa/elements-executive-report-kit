import type { ComponentMetadata, ComponentRegistry } from './types';

// Global registry instance
const registry: ComponentRegistry = {};

/**
 * Register a new Elements component into the global registry.
 * This makes it available for the Component Library and Drag-and-Drop.
 */
export const registerComponent = (metadata: ComponentMetadata) => {
  if (registry[metadata.id]) {
    console.warn(`Component with id ${metadata.id} is already registered. Overwriting.`);
  }
  registry[metadata.id] = metadata;
};

/**
 * Retrieve a specific component from the registry.
 */
export const getComponent = (id: string): ComponentMetadata | undefined => {
  return registry[id];
};

/**
 * Retrieve all registered components, optionally filtered by category.
 */
export const getComponents = (category?: string): ComponentMetadata[] => {
  const all = Object.values(registry);
  if (category) {
    return all.filter(c => c.category === category);
  }
  return all;
};

// Expose types
export * from './types';
