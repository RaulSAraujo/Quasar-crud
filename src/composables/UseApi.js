import {api} from 'boot/axios'

export default function useApi(url){
  const list = async () => {
    try {
      const {data} = await api.get(url)
      return data
    } catch (error) {
      throw new Error(error)
    }
  }

  const show = async (id) => {
    try {
      const { data } = await api.get(`${url}/${id}`)
      return data
    } catch (error) {
      throw new Error(error)
    }
  }

  const create = async (form) => {
    try {
      const { data } = await api.post(url,form)
      return data
    } catch (error) {
      throw new Error(error)
    }
  }

  const update = async (id,form) => {
    try {
      const { data } = await api.put(`${url}/${id}`,form)
      return data
    } catch (error) {
      throw new Error(error)
    }
  }

  const remove = async (id) => {
    try {
      const { data } = await api.delete(`${url}/${id}`)
      return data
    } catch (error) {
      throw new Error(error)
    }
  }

  return {
    list,
    show,
    create,
    update,
    remove
  }
}
