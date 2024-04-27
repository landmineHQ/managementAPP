import ROUTER_NAME from '#/routes/config'
import { DAEMON_HOST } from '@/api'
import axios from 'axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { ElNotification, ElMessage } from 'element-plus'
import useUserStore from './user'

const useAuthStore = defineStore('auth', () => {
  const isLogin = ref(false)
  const token = ref(localStorage.getItem('token') || '')

  // 初始化方法，从LocalStorage读取token
  const storedToken = localStorage.getItem('token')
  if (storedToken) {
    isLogin.value = true
    token.value = storedToken
    useUserStore().getUserStore()
  }

  function saveToken(newToken?: string) {
    if (typeof newToken === 'string') {
      isLogin.value = true
      token.value = newToken
      localStorage.setItem('token', token.value || newToken)
    }
  }

  function removeToken() {
    localStorage.removeItem('token')
    isLogin.value = false
    token.value = ''
  }

  function getToken(email: string, password: string) {
    const token = axios
      .post(`${DAEMON_HOST}/${ROUTER_NAME.AUTH}`, { email, password })
      .then((res) => {
        if (res.data.error) {
          ElNotification.error(res.data.error)
          return ''
        }
        useAuthStore().saveToken(res.data.token)
        return res.data.token
      })
      .catch((error) => {
        ElNotification.error(error)
      })

    return token
  }

  async function requestValidationCode(email: string) {
    const isOK = await axios
      .post(`${DAEMON_HOST}/${ROUTER_NAME.AUTH}/getCode`, { email })
      .then((res) => {
        if (res.data.error) {
          ElNotification.error(res.data.error)
          return false
        }
        ElMessage.success({
          message: '验证码发送成功！',
          offset: 300
        })
        return true
      })
      .catch((error) => {
        ElNotification.error(error)
        return false
      })

    return isOK
  }

  async function resetPasswordByCode(email: string, code: string, password: string) {
    const isOK = await axios
      .post(`${DAEMON_HOST}/${ROUTER_NAME.AUTH}/forget/password`, { email, code, password })
      .then((res) => {
        if (res.data.error) {
          ElNotification.error(res.data.error)
          return false
        }
        ElMessage.success({
          message: '重置密码成功！',
          offset: 300
        })
        return true
      })
      .catch((error) => {
        ElNotification.error(error)
        return false
      })

    return isOK
  }

  return {
    isLogin,
    token,
    saveToken,
    removeToken,
    getToken,
    requestValidationCode,
    resetPasswordByCode
  }
})

export default useAuthStore
