export default class AirtableService {
    constructor(baseID, tableName) {
      this.baseID = baseID;
      this.tableName = tableName;
    }
  
    async fetchAllRecords(view) {
      const config = useRuntimeConfig();
      const apiKey = config.airtableApiKey;
      const encodedTableName = encodeURIComponent(this.tableName);
      const encodedView = encodeURIComponent(view);
  
      try {
        let records = [];
        let offset = null;
  
        do {
          const response = await $fetch(
            `https://api.airtable.com/v0/${this.baseID}/${encodedTableName}?view=${encodedView}${offset ? `&offset=${offset}` : ''}`,
            {
              headers: {
                Authorization: `Bearer ${apiKey}`,
              },
            }
          );
          records = records.concat(response.records);
          offset = response.offset;
        } while (offset);
  
        return records;
      } catch (error) {
        console.error("Error fetching records:", error);
        throw error;
      }
    }
  
    async fetchWithFormula(formula, view) {
      const config = useRuntimeConfig();
      const apiKey = config.airtableApiKey;
      const encodedFormula = encodeURIComponent(formula);
      const encodedView = encodeURIComponent(view);
      const encodedTableName = encodeURIComponent(this.tableName);
  
      try {
        let records = [];
        let offset = null;
  
        do {
          const response = await $fetch(
            `https://api.airtable.com/v0/${this.baseID}/${encodedTableName}?view=${encodedView}&filterByFormula=${encodedFormula}${offset ? `&offset=${offset}` : ''}`,
            {
              headers: {
                Authorization: `Bearer ${apiKey}`,
              },
            }
          );
          records = records.concat(response.records);
          offset = response.offset;
        } while (offset);
  
        return records;
      } catch (error) {
        console.error("Error fetching records with formula:", error);
        throw error;
      }
    }
  }
  