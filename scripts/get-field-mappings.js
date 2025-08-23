#!/usr/bin/env node

const API_TOKEN = 'jW2SzZtFSC2cjbl5Sf7cFFVAyrV2VHa2';
const API_URL = 'https://data.abundanceofworks.ca';

const tables = {
  works: 1,
  creators: 2,
  producers: 3,
  publishers: 4,
  years: 5,
  tags: 6,
  tagTypes: 7
};

async function getFieldMappings() {
  console.log('Field Mappings for Baserow Tables\n');
  console.log('==================================\n');
  
  for (const [tableName, tableId] of Object.entries(tables)) {
    console.log(`\n${tableName.toUpperCase()} Table (ID: ${tableId})`);
    console.log('-'.repeat(40));
    
    try {
      // Get with field names
      const responseWithNames = await fetch(`${API_URL}/api/database/rows/table/${tableId}/?size=1&user_field_names=true`, {
        headers: {
          'Authorization': `Token ${API_TOKEN}`
        }
      });
      const dataWithNames = await responseWithNames.json();
      
      // Get with field IDs
      const responseWithIds = await fetch(`${API_URL}/api/database/rows/table/${tableId}/?size=1`, {
        headers: {
          'Authorization': `Token ${API_TOKEN}`
        }
      });
      const dataWithIds = await responseWithIds.json();
      
      if (dataWithNames.results && dataWithNames.results.length > 0 && dataWithIds.results && dataWithIds.results.length > 0) {
        const recordWithNames = dataWithNames.results[0];
        const recordWithIds = dataWithIds.results[0];
        
        // Map field names to field IDs
        const fieldMapping = {};
        for (const fieldName of Object.keys(recordWithNames)) {
          if (fieldName === 'id' || fieldName === 'order') continue;
          
          // Find corresponding field_X in recordWithIds
          for (const fieldId of Object.keys(recordWithIds)) {
            if (fieldId.startsWith('field_')) {
              // Check if values match (considering they might be arrays or objects)
              const valueWithName = recordWithNames[fieldName];
              const valueWithId = recordWithIds[fieldId];
              
              if (JSON.stringify(valueWithName) === JSON.stringify(valueWithId)) {
                fieldMapping[fieldName] = fieldId;
                break;
              }
            }
          }
        }
        
        // Display mappings
        for (const [name, id] of Object.entries(fieldMapping)) {
          console.log(`  ${name}: ${id}`);
        }
      }
    } catch (error) {
      console.error(`  Error fetching table ${tableId}: ${error.message}`);
    }
  }
}

getFieldMappings().catch(console.error);