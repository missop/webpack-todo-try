import createApp from './create-app'

export default context => {
  return new Promise((resolve, reject) => {
    const {app, router} = createApp()

    router.push(context.url)

    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents()
      if (!matchedComponents.length) {
        return reject(new Error('no components matched'))
      }
      console.log(1);
      Promise.all(matchedComponents.map(Component => {
          if (Component.asyncData) {
            return Component.asyncData({
              route: router.currentRoute,
              store
            })
          }
        })
      ).then(data => console.log(data))
      context.meta = app.$meta()
      resolve(app)
    })
  })
}
