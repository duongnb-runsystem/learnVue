const checkAuth = (router) => {
  router.beforeEach((to, from, next) => {
    console.log('beforeEach');
    next()
  })

  // router.beforeEach((to, from, next) => {
  //   next()
  // })

}

export default checkAuth
