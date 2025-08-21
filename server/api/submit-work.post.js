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
    // Create a new work record in Baserow table 449
    const workData = {
      field_3927: body.title, // Title field  
    }
    
    // Handle linked fields by creating records first
    const linkedIds = []
    
    if (body.creators && body.creators.trim()) {
      const creatorId = await findOrCreateRecord(config, 450, 3946, body.creators.substring(0, 255))
      linkedIds.push({ field: 'field_3929', ids: [creatorId] })
      // Also add to notes for reference
      workData.field_3928 = body.creators.substring(0, 255)
    }
    
    if (body.producers && body.producers.trim()) {
      const producerId = await findOrCreateRecord(config, 451, 3956, body.producers.substring(0, 255))
      linkedIds.push({ field: 'field_3938', ids: [producerId] })
      // Also add to IMPORTED field for reference
      workData.field_3933 = body.producers.substring(0, 255)
    }
    
    if (body.publishers && body.publishers.trim()) {
      const publisherId = await findOrCreateRecord(config, 452, 3963, body.publishers.substring(0, 255))
      linkedIds.push({ field: 'field_3939', ids: [publisherId] })
      // Also add to IMPORTED field for reference
      workData.field_3934 = body.publishers.substring(0, 255)
    }
    
    if (body.year) {
      const yearString = String(body.year).trim()
      if (yearString) {
        const yearId = await findOrCreateRecord(config, 453, 3970, yearString)
        linkedIds.push({ field: 'field_3941', ids: [yearId] })
        // Keep the IMPORTED year field too
        workData.field_3932 = yearString
      }
    }
    
    // Add linked relationships to work data
    for (const link of linkedIds) {
      workData[link.field] = link.ids
    }
    
    // Add other text fields
    if (body.tags && body.tags.trim()) {
      workData.field_3940 = body.tags.substring(0, 255) // Tags field
    }
    if (body.email && body.email.trim()) {
      workData.field_3943 = body.email.substring(0, 100) // Submitted by email field
    }
    
    console.log('Creating work record in Baserow:', workData)
    
    // Insert into Baserow works table (449)
    const response = await $fetch(`${config.baserowUrl}/api/database/rows/table/449/`, {
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