import axios from 'axios'

const api = axios.create({
    baseURL: window.location.protocol + '//' + window.location.hostname + ':3000/api',
})

export const insertCapcode = payload => api.post(`/capcode`, payload)
export const getAllCapcodes = () => api.get(`/capcodes`)
export const updateCapcodeById = (id, payload) => api.put(`/Capcode/${id}`, payload)
export const deleteCapcodeById = id => api.delete(`/Capcode/${id}`)
export const getCapcodeById = id => api.get(`/Capcode/${id}`)

export const getAllPages = () => api.get(`/pages`)

export const exportTTDtones = () => api.get('/capcodes/export')

const apis = {
    insertCapcode,
    getAllCapcodes,
    updateCapcodeById,
    deleteCapcodeById,
    getCapcodeById,
    getAllPages,
    exportTTDtones
}

export default apis