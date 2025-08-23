export const useBaserow = () => {
  const config = useRuntimeConfig()
  
  const fetchTable = async (tableId, options = {}) => {
    // During build time (SSR), call Baserow API directly
    // During client-side, this shouldn't be called in static build
    if (process.server) {
      try {
        const response = await $fetch(`${config.baserowUrl}/api/database/rows/table/${tableId}/`, {
          headers: {
            'Authorization': `Token ${config.baserowToken}`
          },
          params: {
            page: options.page || 1,
            size: options.size || 200,
            ...options
          }
        })
        return response
      } catch (error) {
        console.error('Baserow API error:', error)
        throw error
      }
    } else {
      // Client-side in static build - this shouldn't happen
      // but if it does, return empty data to prevent errors
      console.warn('Client-side API call attempted in static build')
      return { results: [], count: 0 }
    }
  }
  
  const fetchRow = async (tableId, rowId) => {
    if (process.server) {
      try {
        const response = await $fetch(`${config.baserowUrl}/api/database/rows/table/${tableId}/${rowId}/`, {
          headers: {
            'Authorization': `Token ${config.baserowToken}`
          }
        })
        return response
      } catch (error) {
        console.error('Baserow API error:', error)
        throw error
      }
    } else {
      console.warn('Client-side API call attempted in static build')
      return null
    }
  }
  
  const searchTable = async (tableId, query, options = {}) => {
    if (process.server) {
      try {
        const response = await $fetch(`${config.baserowUrl}/api/database/rows/table/${tableId}/`, {
          headers: {
            'Authorization': `Token ${config.baserowToken}`
          },
          params: {
            search: query,
            ...options
          }
        })
        return response
      } catch (error) {
        console.error('Baserow API error:', error)
        throw error
      }
    } else {
      console.warn('Client-side API call attempted in static build')
      return { results: [], count: 0 }
    }
  }
  
  return {
    fetchTable,
    fetchRow,
    searchTable
  }
}