import Layout from '@/views/Layout/index.vue'
const routes = [
  {
    path: '/',
    name: 'THREE',
    component: Layout,
    icon: 'el-icon-extend-threetriangles',
    children: [
      {
        path: '',
        name: 'points_waves',
        component: () => import('@/views/Three/pointsWaves.vue'),
        meta: { title: '粒子波动', icon: 'el-icon-extend-echarts_mappie' }
      },
      {
        path: 'lesson1',
        name: 'lesson1',
        component: () => import('@/views/Three/lesson1.vue'),
        meta: { title: '第一课', icon: 'el-icon-extend-changjingguanli' }
      },
      {
        path: 'lesson2',
        name: 'lesson2',
        component: () => import('@/views/Three/lesson2.vue'),
        meta: { title: '第二课', icon: 'el-icon-extend-changjingguanli' }
      },
      {
        path: 'lesson3',
        name: 'lesson3',
        component: () => import('@/views/Three/lesson3.vue'),
        meta: { title: '第三课', icon: 'el-icon-extend-changjingguanli' }
      },
      {
        path: 'lesson4',
        name: 'lesson4',
        component: () => import('@/views/Three/lesson4.vue'),
        meta: { title: '第四课', icon: 'el-icon-extend-changjingguanli' }
      },
      {
        path: 'lesson5',
        name: 'lesson5',
        component: () => import('@/views/Three/lesson5.vue'),
        meta: { title: '第五课', icon: 'el-icon-extend-changjingguanli' }
      }
    ]
  },
  {
    path: '/chair',
    name: 'HighCharts',
    component: Layout,
    icon: 'el-icon-extend--chart-',
    children: [
      {
        path: 'count_up',
        name: 'count_up',
        component: () => import('@/views/Charts/CountUp.vue'),
        meta: { title: '数字滚动', icon: 'el-icon-cpu' }
      },
      {
        path: 'line',
        name: 'line',
        component: () => import('@/views/Charts/Line.vue'),
        meta: { title: '折线图', icon: 'el-icon-extend-tubiao-zhexiantu' }
      },
      {
        path: 'bar',
        name: 'bar',
        component: () => import('@/views/Charts/Bar.vue'),
        meta: { title: '柱状图', icon: 'el-icon-extend-charts_pile' }
      },
      {
        path: 'pie',
        name: 'pie',
        component: () => import('@/views/Charts/Pie.vue'),
        meta: { title: '饼图', icon: 'el-icon-extend-charts_pie' }
      },
      {
        path: 'map',
        name: 'map',
        component: () => import('@/views/Charts/Map.vue'),
        meta: { title: '地图', icon: 'el-icon-extend-echarts_heatmap' }
      }
    ]
  },
  {
    path: '/apple_view',
    name: 'Apple',
    component: Layout,
    icon: 'el-icon-apple',
    children: [
      {
        path: 'apple',
        name: 'apple',
        component: () => import('@/views/AppleView/user/index.vue'),
        meta: { title: '用户信息', icon: 'el-icon-user' }
      },
      {
        path: 'topic',
        name: 'topic',
        component: () => import('@/views/AppleView/topic/index.vue'),
        meta: { title: '话题信息', icon: 'el-icon-microphone' }
      }
    ]
  }
]

export default routes
