import Main from '@/views/Main.vue';
import Cookies from 'js-cookie';
const identity = Cookies.get('identity');

// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
    path: '/login',
    name: 'login',
    meta: {
        title: '广州市白云区华义电子厂 - 登录'
    },
    component: resolve => { require(['@/views/login.vue'], resolve); }
};

export const page404 = {
    path: '/*',
    name: 'error-404',
    meta: {
        title: '404-页面不存在'
    },
    component: resolve => { require(['@/views/error-page/404.vue'], resolve); }
};

export const page403 = {
    path: '/403',
    meta: {
        title: '403-权限不足'
    },
    name: 'error-403',
    component: resolve => { require(['@//views/error-page/403.vue'], resolve); }
};

export const page500 = {
    path: '/500',
    meta: {
        title: '500-服务端错误'
    },
    name: 'error-500',
    component: resolve => { require(['@/views/error-page/500.vue'], resolve); }
};

export const locking = {
    path: '/locking',
    name: 'locking',
    component: resolve => { require(['@/views/main-components/lockscreen/components/locking-page.vue'], resolve); }
};

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
    path: '/',
    name: 'otherRouter',
    redirect: '/home',
    component: Main,
    children: [
        { path: 'home', title: {i18n: 'home'}, name: 'home_index', component: resolve => { require(['@/views/home/home.vue'], resolve); } },
        { path: 'ownspace', title: '个人中心', name: 'ownspace_index', component: resolve => { require(['@/views/own-space/own-space.vue'], resolve); } },
        { path: 'news_edit/:id', title: '编辑新闻', name: 'news_edit', component: resolve => { require(['@/views/news_handel.vue?v1'], resolve); } },
        { path: 'job_edit/:id', title: '编辑人才招聘', name: 'job_edit', component: resolve => { require(['@/views/job_handel.vue?v1'], resolve); } },
        { path: 'product_edit/:id', title: '编辑产品', name: 'product_edit', component: resolve => { require(['@/views/product_handle.vue?v1'], resolve); } }
        // { path: 'message', title: '消息中心', name: 'message_index', component: resolve => { require(['@/views/message/message.vue'], resolve); } }
    ]
};

let identityGeneral = [
    {
        path: '/product',
        icon: 'a iconfont iconshangpin',
        title: { i18n: '产品管理' },
        name: 'product',
        component: Main,
        children: [
            { path: 'index', title: { i18n: '产品列表' }, name: 'product_index', component: resolve => { require(['@/views/product.vue'], resolve); } },
            { path: 'handle', title: { i18n: '添加产品' }, name: 'product_handle', component: resolve => { require(['@/views/product_handle.vue'], resolve); } },
            { path: 'related', title: { i18n: '关联产品规格' }, name: 'product_related', component: resolve => { require(['@/views/product_related.vue'], resolve); } }
        ]
    },
    {
        path: '/sku',
        icon: 'a iconfont iconguigeguanli',
        title: { i18n: '规格管理' },
        name: 'sku',
        component: Main,
        children: [
            { path: 'index', title: { i18n: '规格管理' }, name: 'sku_index', component: resolve => { require(['@/views/sku.vue'], resolve); } }
        ]
    }
];

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
let appRouters = [
    {
        path: '/about',
        icon: 'a iconfont icongongsi',
        title: { i18n: '公司介绍' },
        name: 'about',
        component: Main,
        children: [
            { path: 'index', title: { i18n: '公司介绍' }, name: 'about_index', component: resolve => { require(['@/views/about.vue'], resolve); } }
        ]
    },
    {
        path: '/contact',
        icon: 'a iconfont iconlianxiwomen-copy',
        title: { i18n: '联系我们' },
        name: 'contact',
        component: Main,
        children: [
            { path: 'index', title: { i18n: '联系我们' }, name: 'contact_index', component: resolve => { require(['@/views/contact.vue'], resolve); } }
        ]
    },
    {
        path: '/user',
        icon: 'a iconfont iconaddressbook_fill',
        title: { i18n: '后台用户管理' },
        name: 'user',
        component: Main,
        children: [
            { path: 'index', title: { i18n: '后台用户管理' }, name: 'user_index', component: resolve => { require(['@/views/user.vue'], resolve); } }
        ]
    },
    {
        path: '/category',
        icon: 'a iconfont iconcreatetask_fill',
        title: { i18n: '分类管理' },
        name: 'category',
        component: Main,
        children: [
            { path: 'index', title: { i18n: '分类管理' }, name: 'category_index', component: resolve => { require(['@/views/category.vue'], resolve); } }
        ]
    },
    {
        path: '/news',
        icon: 'a iconfont iconxinwen',
        title: { i18n: '新闻管理' },
        name: 'news',
        component: Main,
        children: [
            { path: 'index', title: { i18n: '新闻管理' }, name: 'news_index', component: resolve => { require(['@/views/news.vue'], resolve); } },
            { path: 'news_handel', title: { i18n: '添加新闻' }, name: 'news_handel', component: resolve => { require(['@/views/news_handel.vue'], resolve); } }
        ]
    },
    {
        path: '/job',
        icon: 'a iconfont icon959caidan_rencaizhongxin',
        title: { i18n: '人才中心' },
        name: 'job',
        component: Main,
        children: [
            { path: 'index', title: { i18n: '人才中心' }, name: 'job_index', component: resolve => { require(['@/views/job.vue'], resolve); } },
            { path: 'job_handel', title: { i18n: '添加人才招聘' }, name: 'job_handel', component: resolve => { require(['@/views/job_handel.vue'], resolve); } }
        ]
    },
    {
        path: '/messages',
        icon: 'a iconfont iconmessage',
        title: { i18n: '留言板' },
        name: 'messages',
        component: Main,
        children: [
            { path: 'index', title: { i18n: '留言板' }, name: 'messages_index', component: resolve => { require(['@/views/message.vue'], resolve); } }
        ]
    },
    {
        path: '/banner',
        icon: 'a iconfont iconbanner',
        title: { i18n: 'Banner管理' },
        name: 'banner',
        component: Main,
        children: [
            { path: 'index', title: { i18n: 'Banner管理' }, name: 'banner_index', component: resolve => { require(['@/views/banner.vue'], resolve); } }
        ]
    }
];

if (identity == 1) {
    appRouters = [...appRouters, ...identityGeneral];
}
if (identity == 3) {
    appRouters = identityGeneral;
}

export const appRouter = appRouters;

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
    loginRouter,
    otherRouter,
    locking,
    ...appRouters,
    page500,
    page403,
    page404
];
