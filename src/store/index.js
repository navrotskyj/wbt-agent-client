import Vuex from 'vuex';
import {openSocket} from "../internal/client";

import callStore from './call'
import agentStore from './agent'
import chatStore from './chat'
import taskStore from './task'

import {AgentStatus} from '../../webitel-sdk/src'

const Store = new Vuex.Store({
    // strict: true,
    state: {
        layout: 'default-layout',
        client: null,
        dialogCall: false
    },
    modules: {
        call: callStore,
        agent: agentStore,
        chat: chatStore,
        task: taskStore,
    },
    getters: {
        layout(state) {
            return state.layout
        },
        dialogCall(state) {
            return state.dialogCall
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
        },
        showNewCall(state, val) {
            state.dialogCall = val
        }
    },
    actions: {
        async makeCall({ commit, state }, {destination, variables, useVideo, useScreen}) {
            if (state.client) {
                return state.client.call({
                    destination,
                    params: {
                        video: useVideo,
                        variables
                    }
                })
            }
            throw "Not register";
        },
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
