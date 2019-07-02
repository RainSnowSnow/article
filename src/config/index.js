import Config from './config'
let config = Config
if (process.env.NODE_ENV === 'development' && !process.mockServer) {
  const DevConfig = require('./dev.env').default

  config = Object.assign(config, DevConfig)
} else if (process.env.NODE_ENV === 'product') {
  const DevConfig = require('./prod.env').default

  config = Object.assign(config, DevConfig)
}
export default config
