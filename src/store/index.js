import Vuex from 'vuex';
import {openSocket} from "../internal/client";

import callStore from './call'
import agentStore from './agent'

import {AgentStatus} from '../../webitel-sdk/src'

const Store = new Vuex.Store({
    // strict: true,
    state: {
        layout: 'default-layout',
        client: null
    },
    modules: {
        call: callStore,
        agent: agentStore
    },
    getters: {
        layout(state) {
            return state.layout
        },
        status(state) {
            return state.layout
        },
        agent(state) {
            return (state.client && state.client.agent)
        }
    },
    mutations: {
        setLayout(state, payload) {
            state.layout = payload
        },
        setClient(state, client) {
            state.client = client
        }
    },
    actions: {
        existsCall({commit, state}, callId) {
            if (!state.client) {
                return false
            }

            return !!state.client.callById(callId)
        },
        async setAgentStatus({commit, state}, status) {

            switch (status) {
                case AgentStatus.Pause:
                    await state.client.agent.pause();
                    break;
                case AgentStatus.Offline:
                    await state.client.agent.offline();
                    break;
                case AgentStatus.Online:
                    await state.client.agent.online();
                    break;
                default:
                    throw new Error(`unknown agent status  \"${status}\"`)
            }
        },
        async setAgentWaiting({commit, state}, channel) {
           await state.client.agent.waiting(channel)
        },
        async auth({commit, state}, token) {
           const cli = await openSocket(token)
           commit('setClient', cli)
        }
    }
});

export default Store
