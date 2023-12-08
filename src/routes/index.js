const Foo = () => import(/* webpackChunkName: "foo" */'@/views/foo');
const Bar = () => import(/* webpackChunkName: "bar" */'@/views/bar');

const routes = [
    {
        path: '*', 
        redirect: '/'
    },
    {
        path: '/',
        redirect: {
            name: "Foo"
        }
    },
    {
        path: '/foo',
        name: "Foo",
        component: Foo,
    },
    {
        path: '/bar',
        component: Bar,
        children: [
            {
                path: '',
                name: 'Baz',
                component: ()=>import(/* webpackChunkName: "baz" */'@/views/baz')
            },
        ]
    },
]

export default routes;