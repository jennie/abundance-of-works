import { $fetch } from 'ofetch'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const tableId = getRouterParam(event, 'tableId')
  const query = getQuery(event)
  
  try {
    const response = await $fetch(
      `${config.baserowUrl}/api/database/rows/table/${tableId}/`,
      {
        headers: {
          'Authorization': `Token ${config.baserowToken}`
        },
        params: {
          page: query.page || 1,
          size: query.size || 200,
          ...query
        }
      }
    )
    
    return {
      data: response
    }
  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.message || 'Failed to fetch table data'
    })
  }
})