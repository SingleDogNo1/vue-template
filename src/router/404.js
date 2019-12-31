const notFound = [
  {
    name: '404',
    path: '/404',
    component: () => import(/* webpackChunkName: '404' */ '@/views/404')
  },
  {
    path: '*',
    redirect: '/404'
  }
]

export default notFound
