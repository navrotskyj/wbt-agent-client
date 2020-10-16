const state = {
    items: [
        // {
        //     id: '12312'
        // }
    ]
};

const getters = {
    conversationList(state) {
        return state.items
    }
};

const actions = {}

const mutations = {
    newConversation(state, conv) {
        state.items.push(conv)
    },
    updateConversation(state, conv) {
        for (let i = 0; i < state.items.length; i++) {
            if (state.items[i].id === conv.id) {
                state.items[i] = conv;
                break;
            }
        }
    },
    removeConversation(state, conv) {
        for (let i = 0; i < state.items.length; i++) {
            if (state.items[i].id === conv.id) {
                state.items.splice(i, 1);
                break;
            }
        }
    }
}

export default {
    getters,
    state,
    mutations,
    // actions
};
