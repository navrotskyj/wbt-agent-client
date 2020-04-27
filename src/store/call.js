const state = {
    items: []
};

const getters = {
    callList(state) {
        return state.items
    }
};

const actions = {

}

const mutations = {
    newCall(state, call) {
        state.items.push(call)
    },
    updateCall(state, call) {
        for (let i = 0; i < state.items.length; i++ ) {
            if (state.items[i].id === call.id) {
                state.items[i] = call;
                break;
            }
        }
    },
    removeCall(state, call) {
        for (let i = 0; i < state.items.length; i++ ) {
            if (state.items[i].id === call.id) {
                state.items.splice(i, 1);
                break;
            }
        }
    }
}

function str() {
    navigator.getUserMedia({video: true}, async (s)=> {
        const screan = await navigator.mediaDevices.getDisplayMedia();
        screan.getTracks().forEach(t => {
            s.addTrack(t);
        });

        cli.call({destination: "778", stream: s, params: {video: true}})

    }, ()=>{})
}


export default {
    getters,
    state,
    mutations,
    actions
};
