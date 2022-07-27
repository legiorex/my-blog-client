// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

module.exports = function override(config) {
  return {
    ...config,
    resolve: {
      ...config.resolve,
      alias: {
        ...config.alias,
        '@components': path.resolve(__dirname, 'src/components'),
        '@pages': path.resolve(__dirname, 'src/pages'),
        '@styles': path.resolve(__dirname, 'src/styles'),
        '@assets': path.resolve(__dirname, 'src/assets'),
        '@store': path.resolve(__dirname, 'src/store'),
        '@hooks': path.resolve(__dirname, 'src/hooks'),
        '@utils': path.resolve(__dirname, 'src/utils'),
        '@interfaces': path.resolve(__dirname, 'src/interfaces'),
        '@types': path.resolve(__dirname, 'src/types'),
      },
    },
  }
}
