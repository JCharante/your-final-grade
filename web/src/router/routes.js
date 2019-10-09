
const routes = [
    {
        path: '/',
        component: () => import('layouts/MyLayout.vue'),
        children: [
            { path: 'login', component: () => import('pages/Login.vue') },
            { path: 'class/:classid', component: () => import('pages/ClassView.vue'), props: true, name: 'ClassView' },
            { path: '', component: () => import('pages/Classes.vue'), name: 'Classes' },
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
