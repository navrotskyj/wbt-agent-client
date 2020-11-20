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



async function getCallsCount() {
    let page = 1;
    let count = 0;
    while (true) {
        const res = await callApi.searchHistoryCall(
            page++,
            1000,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            ["id"],
            '+stored_at',
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            (new Date(2020,8,1)).getTime(),
            Date.now(),
        );

        count += res.data.items.length;

        if (!res.data.next) {
            break
        }



    }

    return count;
}

export async function openSocket() {
    // const count = await getCallsCount();
    // console.error(count);
    // debugger;
    // return;

    const queuesRes = await queueApi.searchQueue(1, 10, undefined, undefined, undefined, "+priority")
    console.table(queuesRes.data.items)

    const aggRes = await callApi.aggregateHistoryCall({

        created_at: {
          from: Date.now() - 60 * 60 * 1000 * 60,
          to: Date.now()
        },
        agent_id: [12],
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

    const result = {"items":[{"name":"Hello","data":[{"agent":null,"count":null,"created_at":"2020-07-01T00:00:00+03:00"},{"agent":null,"count":null,"created_at":"2020-07-02T00:00:00+03:00"},{"agent":null,"count":null,"created_at":"2020-07-03T00:00:00+03:00"},{"agent":null,"count":null,"created_at":"2020-07-04T00:00:00+03:00"},{"agent":null,"count":null,"created_at":"2020-07-05T00:00:00+03:00"},{"agent":null,"count":null,"created_at":"2020-07-06T00:00:00+03:00"},{"agent":null,"count":null,"created_at":"2020-07-07T00:00:00+03:00"},{"agent":null,"count":null,"created_at":"2020-07-08T00:00:00+03:00"},{"agent":null,"count":null,"created_at":"2020-07-09T00:00:00+03:00"},{"agent":null,"count":null,"created_at":"2020-07-10T00:00:00+03:00"},{"agent":null,"count":null,"created_at":"2020-07-11T00:00:00+03:00"},{"agent":null,"count":null,"created_at":"2020-07-12T00:00:00+03:00"},{"agent":null,"count":null,"created_at":"2020-07-13T00:00:00+03:00"},{"agent":null,"count":null,"created_at":"2020-07-14T00:00:00+03:00"},{"agent":null,"count":null,"created_at":"2020-07-15T00:00:00+03:00"},{"agent":null,"count":null,"created_at":"2020-07-16T00:00:00+03:00"},{"agent":null,"count":null,"created_at":"2020-07-17T00:00:00+03:00"},{"agent":null,"count":null,"created_at":"2020-07-18T00:00:00+03:00"},{"agent":null,"count":null,"created_at":"2020-07-19T00:00:00+03:00"},{"agent":null,"count":null,"created_at":"2020-07-20T00:00:00+03:00"},{"agent":null,"count":null,"created_at":"2020-07-21T00:00:00+03:00"},{"agent":null,"count":null,"created_at":"2020-07-22T00:00:00+03:00"},{"agent":null,"count":null,"created_at":"2020-07-23T00:00:00+03:00"},{"agent":null,"count":null,"created_at":"2020-07-24T00:00:00+03:00"},{"agent":null,"count":null,"created_at":"2020-07-25T00:00:00+03:00"},{"agent":null,"count":null,"created_at":"2020-07-26T00:00:00+03:00"},{"agent":null,"count":null,"created_at":"2020-07-27T00:00:00+03:00"},{"agent":null,"count":null,"created_at":"2020-07-28T00:00:00+03:00"},{"agent":null,"count":null,"created_at":"2020-07-29T00:00:00+03:00"},{"agent":null,"count":null,"created_at":"2020-07-30T00:00:00+03:00"},{"agent":null,"count":null,"created_at":"2020-07-31T00:00:00+03:00"},{"agent":null,"count":null,"created_at":"2020-08-01T00:00:00+03:00"},{"agent":null,"count":null,"created_at":"2020-08-02T00:00:00+03:00"},{"agent":null,"count":null,"created_at":"2020-08-03T00:00:00+03:00"},{"agent":null,"count":null,"created_at":"2020-08-04T00:00:00+03:00"},{"agent":null,"count":null,"created_at":"2020-08-05T00:00:00+03:00"},{"agent":null,"count":null,"created_at":"2020-08-06T00:00:00+03:00"},{"agent":null,"count":null,"created_at":"2020-08-07T00:00:00+03:00"},{"agent":null,"count":null,"created_at":"2020-08-08T00:00:00+03:00"},{"agent":null,"count":null,"created_at":"2020-08-09T00:00:00+03:00"},{"agent":null,"count":null,"created_at":"2020-08-10T00:00:00+03:00"},{"agent":null,"count":null,"created_at":"2020-08-11T00:00:00+03:00"},{"agent":null,"count":null,"created_at":"2020-08-12T00:00:00+03:00"},{"agent":null,"count":null,"created_at":"2020-08-13T00:00:00+03:00"},{"agent":null,"count":null,"created_at":"2020-08-14T00:00:00+03:00"},{"agent":null,"count":null,"created_at":"2020-08-15T00:00:00+03:00"},{"agent":null,"count":null,"created_at":"2020-08-16T00:00:00+03:00"},{"agent":null,"count":null,"created_at":"2020-08-17T00:00:00+03:00"},{"agent":null,"count":null,"created_at":"2020-08-18T00:00:00+03:00"},{"agent":null,"count":null,"created_at":"2020-08-19T00:00:00+03:00"},{"agent":null,"count":null,"created_at":"2020-08-20T00:00:00+03:00"},{"agent":null,"count":null,"created_at":"2020-08-21T00:00:00+03:00"},{"agent":null,"count":null,"created_at":"2020-08-22T00:00:00+03:00"},{"agent":null,"count":null,"created_at":"2020-08-23T00:00:00+03:00"},{"agent":null,"count":null,"created_at":"2020-08-24T00:00:00+03:00"},{"agent":null,"count":null,"created_at":"2020-08-25T00:00:00+03:00"},{"agent":null,"count":null,"created_at":"2020-08-26T00:00:00+03:00"},{"agent":null,"count":null,"created_at":"2020-08-27T00:00:00+03:00"},{"agent":null,"count":null,"created_at":"2020-08-28T00:00:00+03:00"},{"agent":null,"count":null,"created_at":"2020-08-29T00:00:00+03:00"},{"agent":null,"count":null,"created_at":"2020-08-30T00:00:00+03:00"},{"agent":null,"count":null,"created_at":"2020-08-31T00:00:00+03:00"},{"agent":null,"count":null,"created_at":"2020-09-01T00:00:00+03:00"},{"agent":"adm","count":41,"created_at":"2020-09-02T00:00:00+03:00"},{"agent":"igor igor igor igor igor igor","count":18,"created_at":"2020-09-02T00:00:00+03:00"},{"agent":"igor igor igor igor igor igor","count":25,"created_at":"2020-09-03T00:00:00+03:00"},{"agent":null,"count":null,"created_at":"2020-09-04T00:00:00+03:00"},{"agent":null,"count":null,"created_at":"2020-09-05T00:00:00+03:00"},{"agent":null,"count":null,"created_at":"2020-09-06T00:00:00+03:00"},{"agent":"igor igor igor igor igor igor","count":3,"created_at":"2020-09-07T00:00:00+03:00"},{"agent":"igor igor igor igor igor igor","count":11,"created_at":"2020-09-08T00:00:00+03:00"},{"agent":"igor igor igor igor igor igor","count":2,"created_at":"2020-09-09T00:00:00+03:00"},{"agent":null,"count":null,"created_at":"2020-09-10T00:00:00+03:00"},{"agent":null,"count":null,"created_at":"2020-09-11T00:00:00+03:00"},{"agent":null,"count":null,"created_at":"2020-09-12T00:00:00+03:00"},{"agent":null,"count":null,"created_at":"2020-09-13T00:00:00+03:00"},{"agent":null,"count":null,"created_at":"2020-09-14T00:00:00+03:00"},{"agent":null,"count":null,"created_at":"2020-09-15T00:00:00+03:00"},{"agent":null,"count":null,"created_at":"2020-09-16T00:00:00+03:00"},{"agent":"igor igor igor igor igor igor","count":16,"created_at":"2020-09-17T00:00:00+03:00"},{"agent":"adm","count":1,"created_at":"2020-09-18T00:00:00+03:00"},{"agent":"igor igor igor igor igor igor","count":23,"created_at":"2020-09-18T00:00:00+03:00"},{"agent":null,"count":null,"created_at":"2020-09-19T00:00:00+03:00"},{"agent":null,"count":null,"created_at":"2020-09-20T00:00:00+03:00"},{"agent":"igor igor igor igor igor igor","count":6,"created_at":"2020-09-21T00:00:00+03:00"},{"agent":"778","count":93,"created_at":"2020-09-22T00:00:00+03:00"},{"agent":"igor igor igor igor igor igor","count":10,"created_at":"2020-09-22T00:00:00+03:00"},{"agent":"igor igor igor igor igor igor","count":8,"created_at":"2020-09-23T00:00:00+03:00"},{"agent":"adm","count":93,"created_at":"2020-09-24T00:00:00+03:00"},{"agent":"igor igor igor igor igor igor","count":7,"created_at":"2020-09-24T00:00:00+03:00"},{"agent":"igor igor igor igor igor igor","count":23,"created_at":"2020-09-25T00:00:00+03:00"},{"agent":null,"count":null,"created_at":"2020-09-26T00:00:00+03:00"},{"agent":"igor igor igor igor igor igor","count":39,"created_at":"2020-09-27T00:00:00+03:00"},{"agent":"igor igor igor igor igor igor","count":27,"created_at":"2020-09-28T00:00:00+03:00"},{"agent":null,"count":null,"created_at":"2020-09-29T00:00:00+03:00"},{"agent":null,"count":null,"created_at":"2020-09-30T00:00:00+03:00"},{"agent":"igor igor igor igor igor igor","count":278,"created_at":"2020-10-01T00:00:00+03:00"},{"agent":"adm","count":5,"created_at":"2020-10-01T00:00:00+03:00"},{"agent":"adm","count":9,"created_at":"2020-10-02T00:00:00+03:00"},{"agent":null,"count":null,"created_at":"2020-10-03T00:00:00+03:00"}]}]}


    function normalize(key, valueKey, group, def, data) {
        const datasources = data.reduce((ctx, val) => {
            if (!ctx.unique.has(val[key])) {
                ctx.unique.set(val[key], val[valueKey] || def)
            } else {
                let u = ctx.unique.get(val[key]);
                u += val[valueKey] || def
            }

            if (!ctx.series.has(val[group])) {
                ctx.series.set(val[group], {
                    name: "name",
                    data: []
                })
            }

            const series = ctx.series.get(val[group])
            if (series.data.length < ctx.unique.size) {
                series.data = series.data.concat(new Array(ctx.unique.size - series.data.length - 1).fill(def))
            }
            series.data.push(val[valueKey] || def)
            return ctx;
        }, {
            series: new Map(),
            unique: new Map(),
        })

        // заповняю хвости
        for (let [k, series] of datasources.series.entries()) {
            if (series.data.length < datasources.unique.size) {
                series.data = series.data.concat(new Array(datasources.unique.size - series.data.length).fill(def))
            }
        }

        return datasources
    }

    function absolute(datasources) {
        // маючи суму по Х можна пробігтися по series data і порахувати %
    }

    window.data= normalize("created_at", "count", "agent", 0, result.items[0].data)


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
        // endpoint: "wss://dev.webitel.com/ws",
        // endpoint: "ws://192.168.177.199/ws",
        // endpoint: "wss://cloud.webitel.ua/ws",
        endpoint: "ws://10.10.10.25:10025",
        token,
        registerWebDevice: false,
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
    //     client.registerCallClient(new ExternalClient({
    //         server: "https://dev.webitel.com/api/"
    //     }))
    // } else if (WEBCLIENT) {
        client.registerCallClient(new SipPhone(await client.deviceConfig("webrtc")))
    // } else {
    //     // No register
    // }

    for (const call of client.allCall()) {
        call.postProcessData = {}
        store.commit('newCall', call)
    }

    for (const chat of client.allConversations) {
	    // store.commit('newConversation', chat)
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


