const swRegister = async () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./service-worker.js')
      .then(reg => console.log('SW registered'))
      .catch(err => console.error('SW register error: ', err))
  } else {
    console.error('Service worker not supported in this browser!')
  }
}

export default swRegister
