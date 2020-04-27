
const state = {
    status: null,
    onDemand: false,
    channels: [],
    lastStatusChange: null,
};

const getters = {
    status: state => state.status,
    channels: state => state.channels,
    lastStatusChange: state => state.lastStatusChange,
};

const mutations = {
    set: (state, {status, onDemand, channels, lastStatusChange}) => {
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
    }
}

export default {
    namespaced: true,
    getters,
    state,
    mutations
};
