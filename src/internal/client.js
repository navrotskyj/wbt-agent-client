import {Client, AgentServiceApi, Configuration, MemberServiceApi,
    QueueServiceApi, CallActions, ContactsApiFactory, JobState, ChatActions} from "../../webitel-sdk/src";

// import {JobState} from '../../webitel-sdk/src'

console.error(JobState)

import store from '../store'
import router from '../router'
import {SipPhone} from '../../webitel-sdk/src/sip/webrtc'

export let client = null;

// const apiC = new CallServiceApi();
const apiCon = new ContactsApiFactory({}, '');
// apiC.searchActiveCall(1,1,'','', [])
const fields = ["name", "bla", "ble"]
apiCon.searchContacts(1,1,'','',fields)


let token = 'y813etikm3d93bg7qxdbt8y4yy'// localStorage.getItem('token');
if (!token) {
    token = prompt("Please enter your token", "");
    localStorage.setItem('token', token);
}
// const token = 'h4tpx5sbq7ry8c6tgy757tdr6a' // ATB

export const configuration = new Configuration({
    accessToken: token,//"xtmepawckpb3pct391699stbhe",
    apiKey: token,
    // basePath: "https://cloud.webitel.ua/api"
});

export const memberApi = new MemberServiceApi(configuration)
export const queueApi = new QueueServiceApi(configuration)
export const agentApi = new AgentServiceApi(configuration)


function onIceStateChange(pc, event) {
    if (pc) {
        console.log(`${getName(pc)} ICE state: ${pc.iceConnectionState}`);
        console.log('ICE state change event: ', event);
    }
}

const offerOptions = {
    offerToReceiveAudio: 1,
    offerToReceiveVideo: 0
};


class Test {
    constructor() {

    }

    async make() {
        var pc1 = this.pc1 = new RTCPeerConnection({});
        console.log('Created local peer connection object pc1');
        pc1.addEventListener('icecandidate',  event => {
            console.warn(event)
            // pc1.addIceCandidate(event.candidate); // pc2
        });

        pc1.addEventListener('iceconnectionstatechange', async e => {
            onIceStateChange(pc1, e)
        });

        const offer = await pc1.createOffer(offerOptions);
        console.warn(offer.sdp)
        await pc1.setLocalDescription(offer);
    }

    getSdp() {

    }

    answer(remSdp) {

    }
}

export async function openSocket() {

    client = new Client({
        endpoint: "wss://dev.webitel.com/ws",
        // endpoint: "ws://192.168.177.199/ws",
        // endpoint: "wss://cloud.webitel.ua/ws",
        storageEndpoint: "https://dev.webitel.com/",
        // endpoint: "ws://10.10.10.25:10022",
        token,
        registerWebDevice: false,
        debug: false,
        reconnect: true,
    });

    window.cli = client;


    client.on('disconnected', () => {
        console.error("disconnected")
    })

    client.on('error', (e) => {
        console.info("error: ", e.id)
    })

    try {
        await client.connect();
    } catch (e) {
        console.warn(e)
        debugger
    }

    const callHandler =  (action, call) => {
        console.error(action, call.firstActive)
        switch (action) {

            case CallActions.Ringing:

                if (call.queue) {
                    // FIXME
                    let data = {}
                    try {
                        // const result = await memberApi.readMember(call.queue.queue_id, call.queue.member_id)
                        // data = result.data
                    } catch (e) {
                        console.error(e)
                    }

                    call.postProcessData = {
                        success: false,
                        display: false,
                        description: '',
                        ...data
                    };

                }

                store.commit('newCall', call)
                router.push({name: "call", params: {call, callId: call.id }})
                break;
            case CallActions.Hangup:
                store.commit('updateCall', call)
                break

            case CallActions.Destroy:
                store.commit('removeCall', call)
                router.push({name: "main"})
                break;
            case CallActions.Bridge:
                if (call.queue && !call.postProcessData) {
                    call.postProcessData = {
                        success: false,
                        display: false,
                        description: '',
                    };
                }
            default:
                store.commit('updateCall', call)
                break;
        }
    };

    const chatHandler = (action, chat) => {
        // debugger
        console.error(action, chat)
        switch (action) {
            case ChatActions.UserInvite:
                store.commit('newConversation', chat)
                break

            case ChatActions.Message:
                store.commit('updateConversation', chat)
                break

            case ChatActions.Decline:
            case ChatActions.Leave:
            case ChatActions.Close:
                store.commit('updateConversation', chat)
                break

            case ChatActions.Destroy:
                store.commit('removeConversation', chat)
                router.push({name: "main"})
                break

            default:

                break
        }
    }


    try {
        await client.auth();
    } catch (e) {
        console.info("error: ", e.id)
    }
    await client.subscribeCall( callHandler, {ids: [1,2,3,4,56]})
    await client.subscribeChat( chatHandler)

    // if (EXTERNAL) {
    //     client.registerCallClient(new ExternalClient({
    //         server: "https://dev.webitel.com/api/"
    //     }))
    // } else if (WEBCLIENT) {
        client.registerCallClient(new SipPhone(await client.deviceConfig("webrtc"), true))
    // } else {
    //     // No register
    // }

    /*
        WrapTime -> Waiting
        this.agent.waiting('call')
     */

    try {
        const agent = await client.agentSession()

        await client.subscribeAgentsStatus(
            (e, a) => {
                store.commit('agent/setStatus', e.status)
                if (e.status === "online") {
                    store.commit('agent/updateChannels', agent.channels)
                }
            },
            {agent_id: agent.agentId}
        )

        client.subscribeJob((action, job) => {
            console.error(action, job.state)
            switch (action) {
                case "distribute":
                    job.postProcessData = {
                        success: false,
                        display: false,
                        description: '',
                    };
                    store.commit('newTask', job)
                    break

                case "destroy":
                    store.commit('removeTask', job)
                    router.push({name: "main"})
                    break

                default:
                    store.commit('updateTask', job)
                    break
            }
        })

        client.subscribeTask((action, task) => {
            //TODO
            // console.warn(JSON.stringify(task, undefined, 4))

            store.commit('agent/updateChannels', agent.channels)
            return
            if (task && task.channel === "task") {

                switch (action) {
                    case "distribute":
                        task.postProcessData = {
                            success: false,
                            display: false,
                            description: '',
                        };
                        store.commit('newTask', task)
                        break

                    case "waiting":
                    case "missed":
                    case "wrap_time":
                        store.commit('removeTask', task)
                        router.push({name: "main"})
                        break

                    default:
                        store.commit('updateTask', task)
                        break
                }
                console.error(action, task)
            }

        })

        // for (const task of client.allTask()) {
        //     if (task.channel === "task") {
        //         store.commit('newTask', task)
        //     }
        // }

        for (const job of client.allJob()) {
            store.commit('newTask', job)
        }

        for (const call of client.allCall()) {
            call.postProcessData = {}
            store.commit('newCall', call)
        }

        for (const chat of client.allConversations()) {
            store.commit('newConversation', chat)
        }

        store.dispatch('agent/refreshQueues', agent.agentId)
        store.commit('agent/set', agent)
    } catch (e) {
        console.error(e.message)
    }

    return cli
}


