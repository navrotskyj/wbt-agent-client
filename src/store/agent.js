import {agentApi} from "../internal/client";

const state = {
    id: null,
    status: null,
    onDemand: false,
    channels: null,
    lastStatusChange: null,
    queues: [],
    waitingList: null,
    agent: null
};

const getters = {
    status: state => state.status,
    waitingListCalls: state => state.agent&& state.agent.waitingListCalls,
    waitingListChats: state => state.agent&& state.agent.waitingListChats,
    channels: state => state.channels,
    queues: state => state.queues,
    lastStatusChange: state => state.lastStatusChange,
};

const mutations = {
    set: (state, agent) => {
        const {id, status, onDemand, channels, lastStatusChange} = agent
        state.id = id
        state.status = status
        state.onDemand = onDemand
        state.channels = channels
        state.lastStatusChange = lastStatusChange
        state.agent = agent
    },
    updateChannels: (state, channels) => {
        state.channels = channels
    },
    setStatus: (state, status) => {
        state.status = status
        state.lastStatusChange = Date.now()
    },

    setQueues: (state, queues) => {
        state.queues = queues
    }
}

const actions = {
    async refreshQueues({ commit, state }, id) {
        // const agentStatistics = await agentApi.searchAgentInQueueStatistics(id)
        // commit('setQueues', agentStatistics.data.items)

    },

    async intercept({ commit, state }, id) {
        return state.agent.interceptAttempt(id)
    }
}

export default {
    namespaced: true,
    getters,
    state,
    actions,
    mutations
};
