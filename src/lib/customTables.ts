interface CustomTableField {
  name: string;
  type: 'text' | 'number' | 'boolean' | 'date';
  required: boolean;
  defaultValue?: any;
}

interface CustomTableRule {
  name: string;
  condition: string;
  action: string;
}

interface CustomTable {
  id: string;
  name: string;
  fields: CustomTableField[];
  rules: CustomTableRule[];
  data: Record<string, any>[];
}

export class CustomTableManager {
  private tables: Map<string, CustomTable> = new Map();

  createTable(name: string, fields: CustomTableField[]) {
    const id = crypto.randomUUID();
    this.tables.set(id, {
      id,
      name,
      fields,
      rules: [],
      data: []
    });
    return id;
  }

  addRule(tableId: string, rule: CustomTableRule) {
    const table = this.tables.get(tableId);
    if (table) {
      table.rules.push(rule);
    }
  }

  addRecord(tableId: string, record: Record<string, any>) {
    const table = this.tables.get(tableId);
    if (table) {
      // Validate record against fields
      const isValid = table.fields.every(field => {
        return !field.required || record[field.name] !== undefined;
      });
      if (isValid) {
        table.data.push(record);
        this.executeRules(tableId, record);
      }
    }
  }

  private executeRules(tableId: string, record: Record<string, any>) {
    const table = this.tables.get(tableId);
    if (table) {
      table.rules.forEach(rule => {
        try {
          const conditionMet = new Function('record', `return ${rule.condition}`)(record);
          if (conditionMet) {
            new Function('record', rule.action)(record);
          }
        } catch (error) {
          console.error(`Error executing rule ${rule.name}:`, error);
        }
      });
    }
  }
}
