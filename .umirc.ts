import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/index' },
    { path: '/home', component: '@/pages/home/home' },
  ],
  fastRefresh: {},
  // hash: true,
  // history: {
  //   type: 'hash',
  // },
  title: '数据看版',
  favicon: '/assets/test.ico',
  // ssr: {},
  //服务端渲染;
  // exportStatic: {},
  //预渲染;
});
