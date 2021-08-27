module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views',
      }
    }
  }
}
// module.exports = {
//   lintOnSave: true,
//   chainWebpack: (config) => {
//     config.resolve.alias
//       .set('@', resolve('src'))
//       .set('@assets',resolve('src/assets'))
//       .set('@common',resolve('src/common'))
//       .set('@components',resolve('src/components'))
//       .set('@network',resolve('src/network'))
//       .set('@views',resolve('src/views'))
//     // 这里只写了两个个，你可以自己再加，按这种格式.set('', resolve(''))
//   }
// }

// module.exports = {
//   configureWebpack: {
//     resolve: {
//       alias: {
//         'assets': 'src/assets',
//         'common': 'src/common',
//         'components': 'src/components',
//         'network': 'src/network',
//         'views': 'src/views',
//       }
//     }
//   }
// }
