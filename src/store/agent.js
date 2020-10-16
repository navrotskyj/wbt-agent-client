import {agentApi} from "../internal/client";

const state = {
    id: null,
    status: null,
    onDemand: false,
    channels: [],
    lastStatusChange: null,
    queues: []
};

const getters = {
    status: state => state.status,
    channels: state => state.channels,
    queues: state => state.queues,
    lastStatusChange: state => state.lastStatusChange,
};

const mutations = {
    set: (state, {id, status, onDemand, channels, lastStatusChange}) => {
        state.id = id
        state.status = status
        state.onDemand = onDemand
        state.channels = channels
        state.lastStatusChange = lastStatusChange
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
        const agentStatistics = await agentApi.searchAgentInQueueStatistics(id)
        commit('setQueues', agentStatistics.data.items)

    }
}

export default {
    namespaced: true,
    getters,
    state,
    actions,
    mutations
};
