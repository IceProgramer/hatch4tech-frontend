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
    component: './Home',
  },
  {
    path: '/',
    name: '首页',
    icon: 'HomeOutlined',
    component: './Home',
  },
  {
    path: '/student',
    name: '学生检索',
    icon: 'UserOutlined',
    redirect: '/todo',
  },
  {
    path: '/teacher',
    name: '老师检索',
    icon: 'UserOutlined',
    redirect: '/todo',
  },
  {
    path: '/competition',
    name: '竞赛相关',
    icon: 'StarOutlined',
    component: './Competition/ShowCompetition',
    // redirect: '/todo',
  },
  {
    path: '/competition/info/:id',
    name: '竞赛详情',
    hideInMenu: true,
    component: './Competition/CompetitionInfo',
  },
  {
    path: '/activity',
    name: '活动相关',
    icon: 'GiftOutlined',
    component: './Activity/ShowActivity',
  },
  {
    path: '/activity/info/:id',
    name: '活动详情',
    hideInMenu: true,
    component: './Activity/ActivityInfo',
  },
  {
    path: '/college',
    name: '学院立项',
    icon: 'InboxOutlined',
    component: './Project/ShowProject',
  },
  {
    path: '/college/publicity/info/:id',
    hideInMenu: true,
    name: '公示详情',
    component: './Project/ProjectInfo',
  },
  {
    path: '/team/show',
    name: '组队频道',
    icon: 'TeamOutlined',
    redirect: '/todo',
    // component: './Team/ShowTeam'
  },
  {
    path: '/team',
    name: '组队相关',
    hideInMenu: true,
    routes: [
      {
        path: '/team/add',
        name: '创建队伍',
        hideInMenu: true,
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
    redirect: '/todo',
  },
  {
    path: '/develop',
    name: '开发团队',
    icon: 'ToolOutlined',
    redirect: '/todo',
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
      {
        path: '/user/center/info',
        component: './UserInfo',
      },
    ],
  },
  { path: '*', name: '404', layout: false, component: './404' },
  { path: '/todo', hideInMenu: true, name: '正在制作', component: './TODO' },
];
