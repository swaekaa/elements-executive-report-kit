import type { BlockDefinition, Block } from './types';

class BlockRegistry {
  private blocks: Map<string, BlockDefinition> = new Map();

  register(definition: BlockDefinition) {
    if (this.blocks.has(definition.type)) {
      console.warn(`Block type "${definition.type}" is already registered. Overwriting.`);
    }
    this.blocks.set(definition.type, definition);
  }

  get(type: string): BlockDefinition | undefined {
    return this.blocks.get(type);
  }

  getAll(): BlockDefinition[] {
    return Array.from(this.blocks.values());
  }

  getByCategory(category: BlockDefinition['category']): BlockDefinition[] {
    return this.getAll().filter(b => b.category === category);
  }

  createInstance(type: string, overrides: Partial<Block> = {}): Block {
    const definition = this.get(type);
    if (!definition) {
      throw new Error(`Cannot create block: Unknown block type "${type}"`);
    }
    
    return {
      id: crypto.randomUUID(),
      type: definition.type,
      label: definition.name,
      data: JSON.parse(JSON.stringify(definition.defaultData)),
      children: [],
      ...overrides
    };
  }
}

export const blocksRegistry = new BlockRegistry();
