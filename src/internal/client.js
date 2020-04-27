import {Client, Configuration, MemberServiceApi, CallActions, CallServiceApi} from "../../webitel-sdk/src";

import store from '../store'
import router from '../router'
import {AgentStatusEvent} from "../../webitel-sdk/src/socket/agent";

export let client = null;


const token = '8dmumctirfradmeebp4tbn4uro'

export const configuration = new Configuration({
    accessToken: token,//"xtmepawckpb3pct391699stbhe",
    apiKey: token,
});

export const memberApi = new MemberServiceApi(configuration)

const api = new CallServiceApi(configuration)


export async function openSocket() {

    /*
       * @param {number} [page]
   * @param {number} [size]
   * @param {string} [created_at_from]
   * @param {string} [created_at_to]
   * @param {Array<string>} [user_id]
   * @param {Array<string>} [agent_id]
   * @param {Array<string>} [queue_id]
   * @param {Array<string>} [team_id]
   * @param {Array<string>} [member_id]
   * @param {Array<string>} [gateway_id]
   * @param {string} [number]
   * @param {string} [duration_from]
   * @param {string} [duration_to]
   * @param {boolean} [skip_parent]
   * @param {string} [parent_id]
   * @param {string} [cause]
   * @param {boolean} [exists_file]
   * @param {Array<string>} [fields]
   * @param {string} [sort]
   * @param {string} [domain_id]
     */

    // const res = await api.searchHistoryCall(
    //     1,
    //     10,
    //     0,
    //     1587653381873,
    //     3,
    //     null, null, null, null, null, '*', undefined, undefined, true, null, null, null, null, null, 1);
    // console.table(res.data.items)

    client = new Client({
        endpoint: "wss://dev.webitel.com/ws",
        // endpoint: "ws://192.168.177.199/ws",
        // endpoint: "ws://10.10.10.25:10025",
        token,
        registerWebDevice: true,
        debug: true,
    });

    window.cli = client;

    await client.connect();

    const callHandler = async (action, call) => {
        switch (action) {
            case CallActions.Ringing:

                if (call.queue) {
                    // FIXME
                    const result = await memberApi.readMember(call.queue.queue_id, call.queue.member_id)

                    call.postProcessData = {
                        success: false,
                        display: false,
                        description: '',
                        ...result.data
                    };

                }

                store.commit('newCall', call)
                break;
            case CallActions.Hangup:
                if (!call.allowReporting || call.reportingAt > 0) {
                    store.commit('removeCall', call)
                    router.push({name: "main"})
                } else {
                    store.commit('updateCall', call)
                }
                break

            case CallActions.Reporting:
                store.commit('removeCall', call)
                router.push({name: "main"})
                break;
            default:
                store.commit('updateCall', call)
                break;
        }
    };


    await client.auth();
    await client.subscribeCall( callHandler, {ids: [1,2,3,4,56]});

    for (const call of client.allCall()) {
        store.commit('newCall', call)
    }

    /*
        WrapTime -> Waiting
        this.agent.waiting('call')
     */


    try {
        const agent = await client.agentSession()

        await client.subscribeAgentsStatus(
            (e) => {
                store.commit('agent/setStatus', e.status)
                if (e.status === "online") {
                    store.commit('agent/updateChannels', agent.channels)
                }
            },
            {agent_id: agent.agentId}
        )

        client.subscribeTask((action, task) => {
            //TODO
            store.commit('agent/updateChannels', agent.channels)
        })

        store.commit('agent/set', agent)
    } catch (e) {
        console.error(e.message)
    }

    return cli
}


