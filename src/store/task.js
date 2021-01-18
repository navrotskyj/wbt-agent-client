const state = {
    items: [
        // {
        //     id: '12312'
        // }
    ]
};

const getters = {
    taskList(state) {
        return state.items
    }
};

const actions = {}

const mutations = {
    newTask(state, conv) {
        state.items.push(conv)
    },
    updateTask(state, conv) {
        for (let i = 0; i < state.items.length; i++) {
            if (state.items[i].id === conv.id) {
                state.items[i] = conv;
                break;
            }
        }
    },
    removeTask(state, conv) {
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
