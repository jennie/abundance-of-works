export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const { tableId, rowId } = getRouterParams(event)
  
  try {
    const response = await $fetch(`${config.baserowUrl}/api/database/rows/table/${tableId}/${rowId}/`, {
      headers: {
        'Authorization': `Token ${config.baserowToken}`
      }
    })
    
    return {
      data: response
    }
  } catch (error) {
    console.error('Baserow row fetch error:', error)
    throw createError({
      statusCode: error.status || 500,
      statusMessage: error.message || 'Failed to fetch row from Baserow'
    })
  }
})