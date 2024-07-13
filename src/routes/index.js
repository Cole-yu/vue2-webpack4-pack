const Home = () => import(/* webpackChunkName: "Home" */'@/views/Home');
const Bar = () => import(/* webpackChunkName: "Bar" */'@/views/Bar');

const routes = [
    {
        path: '*', 
        redirect: '/'
    },
    {
        path: '/',
        redirect: {
            name: "Home"
        }
    },
    {
        path: '/home',
        name: "Home",
        component: Home,
    },
    {
        path: '/bar',
        component: Bar,
        children: [
            {
                path: '',
                name: 'Baz',
                component: ()=>import(/* webpackChunkName: "Baz" */'@/views/Baz')
            },
        ]
    },
]

export default routes;