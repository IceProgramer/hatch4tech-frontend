export default [
  {
    path: '/user',
    layout: false,
    routes: [
      { path: '/user/login', component: './User/Login' },
      { path: '/user/register', name: '注册', component: './User/Register' },
    ],
  },
  {
    path: '/welcome',
    icon: 'smile',
    component: './Welcome',
  },
  {
    path: '/',
    name: '首页',
    icon: 'HomeOutlined',
    redirect: '/welcome',
  },
  {
    path: '/student',
    name: '学生检索',
    icon: 'UserOutlined',
    redirect: '/welcome',
  },
  {
    path: '/teacher',
    name: '老师检索',
    icon: 'UserOutlined',
    redirect: '/welcome',
  },
  {
    path: '/competition',
    name: '竞赛相关',
    icon: 'StarOutlined',
    component: './Competition/ShowCompetition',
  },
  {
    path: '/competition/info',
    name: '竞赛处理',
    hideInMenu: true,
    routes: [
      {
        path: '/competition/info/:id',
        name: '竞赛',
        hideInMenu: true,
        component: './Competition/CompetitionInfo',
      }
    ]
  },
  {
    path: '/activity',
    name: '活动相关',
    icon: 'GiftOutlined',
    redirect: '/welcome',
  },
  {
    path: '/college',
    name: '学院立项',
    icon: 'InboxOutlined',
  },
  {
    path: '/team',
    name: '组队频道',
    icon: 'TeamOutlined',
    routes: [
      {
        path: '/team/show',
        name: '队伍展示',
        component: './Team/ShowTeam',
      },
      {
        path: '/team/add',
        name: '创建队伍',
        component: './Team/AddTeam',
      },
      {
        path: '/team/update/:id',
        name: '更新队伍',
        hideInMenu: true,
        component: './Team/UpdateTeam',
      },
      {
        path: '/team/apply/:id',
        name: '队伍申请',
        hideInMenu: true,
        component: './Team/ApplyTeam',
      },
    ],
  },
  {
    path: '/shop',
    name: '积分商城',
    icon: 'ShoppingCartOutlined',
    redirect: '/welcome',
  },
  {
    path: '/user/center',
    name: '个人中心',
    hideInMenu: true,
    routes: [
      {
        path: '/user/center',
        component: './UserCenter',
      },
    ],
  },
  { path: '*', name: '404', layout: false, component: './404' },
];
