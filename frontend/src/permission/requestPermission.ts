import { ElNotification } from 'element-plus'

async function requestRecordPermission() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    stream.getTracks().forEach((track) => track.stop()) // Stop using the stream
    console.log('Recording permission granted')
  } catch (error) {
    console.error('Recording permission denied', error)
    ElNotification.error({
      message: '未给予录音权限！',
      offset: 300,
      showClose: false,
      duration: 5000
    })
  }
}

async function requestCameraPermission() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true })
    stream.getTracks().forEach((track) => track.stop()) // Stop using the stream
    console.log('Camera permission granted')
  } catch (error) {
    console.error('Camera permission denied', error)
    ElNotification.error({
      message: '未给予摄像头权限！',
      offset: 300,
      showClose: false,
      duration: 5000
    })
  }
}

export default {
  requestRecordPermission,
  requestCameraPermission
}
