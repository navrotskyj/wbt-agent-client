import VueRouter from 'vue-router'
import Main from  '../components/main'
import Call from  '../components/call'
import Test from  '../components/test'
import Task from  '../components/task'
import Email from  '../components/email'
import Dashboard from  '../components/dashboard'

const routes = [
    {
        path: '/',
        name: 'main',
        component: Main
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: Dashboard
    },
    {
        path: '/call/:callId',
        name: 'call',
        component: Call,
        props: (route) => ({ callId: route.params.callId, call: route.params.call })
    },
    {
        path: '/task/:callId',
        name: 'task',
        component: Task
    },
    {
        path: '/email/:emailId',
        name: 'email',
        component: Email
    },
    {
        path: '/test',
        name: 'test',
        component: Test
    }
];

const router = new VueRouter({
    routes // сокращённая запись для `routes: routes`
});


export default router

