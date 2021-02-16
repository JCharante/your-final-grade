
const routes = [
    {
        path: '/app',
        component: () => import('layouts/MyLayout.vue'),
        children: [
            { path: 'login', component: () => import('pages/Login.vue') },
            { path: 'class/:classid', component: () => import('pages/ClassView.vue'), props: true, name: 'ClassView' },
            { path: 'scan', component: () => import('pages/Scan.vue'), name: 'Scan' },
            { path: '', component: () => import('pages/Classes.vue'), name: 'Classes' },
        ],
    },
    {
        path: '',
        component: () => import('layouts/BlankLayout.vue'),
        children: [
            { path: '', component: () => import('pages/Index.vue'), name: 'Home' },
        ],
    },
];

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
    routes.push({
        path: '*',
        component: () => import('pages/Error404.vue'),
    });
}

export default routes;
