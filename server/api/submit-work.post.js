// Helper function to find or create a record in a table
async function findOrCreateRecord(config, tableId, fieldId, name) {
  // First try to find existing record
  try {
    const searchResponse = await $fetch(`${config.baserowUrl}/api/database/rows/table/${tableId}/`, {
      method: 'GET',
      headers: {
        'Authorization': `Token ${config.baserowToken}`
      },
      params: {
        [`filter__field_${fieldId}__equal`]: name,
        size: 1
      }
    })
    
    if (searchResponse.results && searchResponse.results.length > 0) {
      return searchResponse.results[0].id
    }
  } catch (error) {
    console.log(`Search failed for ${name} in table ${tableId}, will create new record`)
  }
  
  // Create new record if not found
  const createData = {}
  createData[`field_${fieldId}`] = name
  
  const createResponse = await $fetch(`${config.baserowUrl}/api/database/rows/table/${tableId}/`, {
    method: 'POST',
    headers: {
      'Authorization': `Token ${config.baserowToken}`,
      'Content-Type': 'application/json'
    },
    body: createData
  })
  
  return createResponse.id
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)
  
  try {
    // Create a new work record in Baserow works table
    const workData = {}
    
    // Set the title field
    workData[`field_${config.baserowWorksTitleFieldId}`] = body.title
    
    // Handle linked fields by creating records first
    const linkedIds = []
    
    if (body.creators && body.creators.trim()) {
      const creatorId = await findOrCreateRecord(
        config, 
        config.public.baserowCreatorsTableId, 
        config.baserowCreatorsNameFieldId, 
        body.creators.substring(0, 255)
      )
      linkedIds.push({ 
        field: `field_${config.baserowWorksCreatorsFieldId}`, 
        ids: [creatorId] 
      })
      // Also add to notes for reference
      workData[`field_${config.baserowWorksNotesFieldId}`] = body.creators.substring(0, 255)
    }
    
    if (body.producers && body.producers.trim()) {
      const producerId = await findOrCreateRecord(
        config, 
        config.public.baserowProducersTableId, 
        config.baserowProducersNameFieldId, 
        body.producers.substring(0, 255)
      )
      linkedIds.push({ 
        field: `field_${config.baserowWorksProducersFieldId}`, 
        ids: [producerId] 
      })
      // Also add to IMPORTED producer field for reference
      workData[`field_${config.baserowWorksImportedProducerFieldId}`] = body.producers.substring(0, 255)
    }
    
    if (body.publishers && body.publishers.trim()) {
      const publisherId = await findOrCreateRecord(
        config, 
        config.public.baserowPublishersTableId, 
        config.baserowPublishersNameFieldId, 
        body.publishers.substring(0, 255)
      )
      linkedIds.push({ 
        field: `field_${config.baserowWorksPublishersFieldId}`, 
        ids: [publisherId] 
      })
      // Also add to IMPORTED publisher field for reference
      workData[`field_${config.baserowWorksImportedPublisherFieldId}`] = body.publishers.substring(0, 255)
    }
    
    if (body.year) {
      const yearString = String(body.year).trim()
      if (yearString) {
        const yearId = await findOrCreateRecord(
          config, 
          config.public.baserowYearsTableId, 
          config.baserowYearsNameFieldId, 
          yearString
        )
        linkedIds.push({ 
          field: `field_${config.baserowWorksYearFieldId}`, 
          ids: [yearId] 
        })
        // Keep the IMPORTED year field too
        workData[`field_${config.baserowWorksImportedYearFieldId}`] = yearString
      }
    }
    
    // Add linked relationships to work data
    for (const link of linkedIds) {
      workData[link.field] = link.ids
    }
    
    // Add other text fields
    if (body.tags && Array.isArray(body.tags) && body.tags.length > 0) {
      // Tags field expects array of IDs
      workData[`field_${config.baserowWorksTagsFieldId}`] = body.tags
    }
    
    if (body.email && body.email.trim()) {
      workData[`field_${config.baserowWorksSubmittedByFieldId}`] = body.email.substring(0, 100)
    }
    
    console.log('Creating work record in Baserow:', workData)
    
    // Insert into Baserow works table
    const response = await $fetch(`${config.baserowUrl}/api/database/rows/table/${config.public.baserowWorksTableId}/`, {
      method: 'POST',
      headers: {
        'Authorization': `Token ${config.baserowToken}`,
        'Content-Type': 'application/json'
      },
      body: workData
    })
    
    console.log('Work record created successfully:', response)
    
    // Log submission details for manual review
    console.log('Full submission received:', {
      title: body.title,
      year: body.year,
      creators: body.creators,
      producers: body.producers,
      publishers: body.publishers,
      tags: body.tags,
      email: body.email,
      submitted_at: body.submitted_at,
      baserow_id: response.id
    })
    
    return {
      success: true,
      message: 'Work submitted successfully',
      id: response.id
    }
    
  } catch (error) {
    console.error('Error creating work record:', error)
    
    // Log the full error details
    if (error.data) {
      console.error('Baserow error details:', error.data)
    }
    
    throw createError({
      statusCode: error.status || 500,
      statusMessage: error.message || 'Error submitting work'
    })
  }
})