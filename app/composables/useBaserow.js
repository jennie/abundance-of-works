export const useBaserow = () => {
  const config = useRuntimeConfig()
  
  const fetchTable = async (tableId, options = {}) => {
    const { data } = await $fetch(`/api/baserow/table/${tableId}`, {
      params: options
    })
    return data
  }
  
  const fetchRow = async (tableId, rowId) => {
    const { data } = await $fetch(`/api/baserow/table/${tableId}/row/${rowId}`)
    return data
  }
  
  const searchTable = async (tableId, query, options = {}) => {
    const { data } = await $fetch(`/api/baserow/table/${tableId}/search`, {
      params: {
        search: query,
        ...options
      }
    })
    return data
  }
  
  return {
    fetchTable,
    fetchRow,
    searchTable
  }
}