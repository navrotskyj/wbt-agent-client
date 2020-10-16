import VueRouter from 'vue-router'
import Main from  '../components/main'
import Call from  '../components/call'
import Test from  '../components/test'
import Task from  '../components/task'
import Email from  '../components/email'
import Chat from  '../components/chat'
import Dashboard from  '../components/dashboard'
import CallHistory from '../components/callHistory'

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
        path: '/call_history',
        name: 'call_history',
        component: CallHistory
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
        path: '/chat/:chatId',
        name: 'chat',
        component: Chat,
        props: (route) => ({ chatId: route.params.chatId, chat: route.params.chat })
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

