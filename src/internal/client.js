import {Client, AgentServiceApi, Configuration, MemberServiceApi, MemberServiceApiFactory,
    QueueServiceApi, CallActions, CallServiceApi} from "../../webitel-sdk/src";


import store from '../store'
import router from '../router'
import {AgentStatusEvent} from "../../webitel-sdk/src";
import {ChatActions} from "../../webitel-sdk/src";
import {ExternalClient} from '../../webitel-sdk/src/sip/external'
import {SipPhone} from '../../webitel-sdk/src/sip/webrtc'

export let client = null;
const token = 'kqcxy369aiyptkomj47ix9p7jh'
// const token = 'h4tpx5sbq7ry8c6tgy757tdr6a' // ATB

export const configuration = new Configuration({
    accessToken: token,//"xtmepawckpb3pct391699stbhe",
    apiKey: token,
    // basePath: "https://cloud.webitel.ua/api"
});

export const memberApi = new MemberServiceApi(configuration)
export const queueApi = new QueueServiceApi(configuration)
export const agentApi = new AgentServiceApi(configuration)
const callApi = new CallServiceApi(configuration)

export async function openSocket() {

    const queuesRes = await queueApi.searchQueue(1, 10, undefined, undefined, undefined, "+priority")
    console.table(queuesRes.data.items)

    const aggRes = await callApi.aggregateHistoryCall({

        created_at: {
          from: Date.now() - 60 * 60 * 1000 * 60,
          to: Date.now()
        },
        aggs: [
            {
                name: "my best agg",
                group: [
                    {
                        id: "agent_id"
                    }
                ],
                avg: ["duration"]
            }
        ]
    })
    console.table(aggRes.data.items)

    console.time("searchAgentStatusStatistic");
    const res = await agentApi.searchAgentStatusStatistic(
        1,
        10,
        1597006800000, // time_from
        1597053999903, // time_to
        undefined,
        undefined, // agent_id[]
        undefined, // status[]
        undefined,
        undefined,
        undefined, // utilization_from
        undefined, // utilization_to
        false,
        "+name",
        undefined, // domain_id
        undefined,
    );
    console.timeEnd("searchAgentStatusStatistic")


    //FIXME
    // await memberApi.searchAttemptsHistory(
    //     1,
    //     20,
    //     0,
    //     Date.now() * 1000,
    //     undefined,
    //     undefined,
    //     undefined,
    //     123,
    //     undefined,
    //     undefined,
    //     undefined,
    //     "+joined_at",
    // )

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
        // endpoint: "wss://cloud.webitel.ua/ws",
        // endpoint: "ws://10.10.10.25:10025",
        token,
        registerWebDevice: true,
        debug: true,
    });

    window.cli = client;



    agentApi.searchAgentStateHistory()
    await client.connect();

    const callHandler =  (action, call) => {
        console.error(action)
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
            default:
                store.commit('updateCall', call)
                break;
        }
    };

    const chatHandler = (action, chat) => {
        // debugger
        switch (action) {
            case ChatActions.UserInvite:
                store.commit('newConversation', chat)
                break

            case ChatActions.Message:
                break

            case ChatActions.Decline:
            case ChatActions.Leave:
            case ChatActions.Close:
                store.commit('removeConversation', chat)
                break

            default:

                break
        }
        console.error(action, chat)
    }


    await client.auth();
    await client.subscribeCall( callHandler, {ids: [1,2,3,4,56]})
    await client.subscribeChat( chatHandler)

    // if (EXTERNAL) {
    //     client.registerCallClient(new ExternalClient())
    // } else if (WEBCLIENT) {
    //     client.registerCallClient(new SipPhone(await client.deviceConfig("webrtc")))
    // } else {
    //     // No register
    // }

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
        store.dispatch('agent/refreshQueues', agent.agentId)
        store.commit('agent/set', agent)
    } catch (e) {
        console.error(e.message)
    }

    return cli
}


