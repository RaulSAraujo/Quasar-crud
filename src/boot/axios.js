import { boot } from 'quasar/wrappers'
import { SessionStorage } from "quasar";
import axios from 'axios'

const api = axios.create({ baseURL: process.env.BASE_URL })

let token = `${SessionStorage.getItem("tokenPart0")}${SessionStorage.getItem("tokenPart1")}${SessionStorage.getItem("tokenPart2")}${SessionStorage.getItem("tokenPart3")}`

// interceptor para configurar o cabeçalho
api.interceptors.request.use(config => {
  config.headers.Authorization = token;
  return config;
});

export default boot(({ app }) => {
  app.config.globalProperties.$axios = axios
  app.config.globalProperties.$api = api
})

export { api }
