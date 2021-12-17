import axios from 'axios'

const api = axios.create({
    baseURL: window.location.protocol + '//' + window.location.hostname + ':3000/api',
})

export const insertCapcode = payload => api.post(`/capcode`, payload)
export const getAllCapcodes = () => api.get(`/capcodes`)
export const updateCapcodeById = (id, payload) => api.put(`/capcode/${id}`, payload)
export const deleteCapcodeById = id => api.delete(`/capcode/${id}`)
export const getCapcodeById = id => api.get(`/capcode/${id}`)

export const getAllPages = () => api.get('/pages')
export const getPagesCount = () => api.get('/pages/count')

export const exportTTDtones = () => api.get('/capcodes/export')

const apis = {
    insertCapcode,
    getAllCapcodes,
    updateCapcodeById,
    deleteCapcodeById,
    getCapcodeById,
    getAllPages,
    getPagesCount,
    exportTTDtones
}

export default apis