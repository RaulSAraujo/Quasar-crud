import { boot } from 'quasar/wrappers'
import { SessionStorage } from "quasar";
import axios from 'axios'

const api = axios.create({ baseURL: process.env.BASE_URL })

// interceptor para configurar o cabeçalho
api.interceptors.request.use(config => {
  config.headers.Authorization = SessionStorage.getItem("token");
  return config;
});

export default boot(({ app }) => {
  app.config.globalProperties.$axios = axios
  app.config.globalProperties.$api = api
})

export { api }
