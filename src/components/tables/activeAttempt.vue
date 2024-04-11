<template>
    <v-data-table
            calculate-widths
            :headers="headers"
            :items="attempts"
            :options.sync="options"
            :server-items-length="total"
            :loading="loading"
            class="elevation-1"
    ></v-data-table>
</template>

<script>
    import {memberApi} from "../../internal/client";

    export default {
        name: "activeAttempt",
        data () {
            return {
                total: 0,
                attempts: [],
                loading: true,
                options: {},
                headers: [
                    {
                        text: 'Queue',
                        align: 'start',
                        value: 'queue.name',
                    },
                    {
                        text: 'Joined',
                        sortable: false,
                        value: 'joined',
                    },
                    { text: 'State', value: 'state' },
                    { text: 'Offering', value: 'offering' },
                    { text: 'Bridged', value: 'bridged' },
                    { text: 'Reporting', value: 'reporting' },
                    { text: 'Timeout', value: 'timeout_str' },
                    { text: 'Member', value: 'member.name' },
                    { text: 'Agent', value: 'agent.name' },
                ],
            }
        },
        watch: {
            options: {
                handler () {
                    this.setData()
                },
                deep: true,
            },
        },
        mounted () {
            this.setData()
        },
        methods: {
            setData() {
              return;
                this.getDataFromApi()
                    .then(({data}) => {
                            this.loading = false
                            this.attempts = (data.items || []).map( i => {
                                return {
                                    joined: new Date(+i.joined_at).toLocaleTimeString(),
                                    leaving: new Date(+i.leaving_at).toLocaleTimeString(),
                                    offering: +i.offering_at ? new Date(+i.offering_at).toLocaleTimeString() : "",
                                    bridged: +i.bridged_at ? new Date(+i.bridged_at).toLocaleTimeString() : "",
                                    reporting: +i.reporting_at ? new Date(+i.reporting_at).toLocaleTimeString() : "",
                                    timeout_str: +i.timeout ? new Date(+i.timeout).toLocaleTimeString() : "",
                                    ...i
                                }
                            })
                            function hasVideo(call) {
                                if ( !call.peerStreams ) {
                                    return false
                                }

                                for (const s of call.peerStreams) {

                                }
                                cli.allCall()[0].peerStreams[0].getTracks().forEach(t => console.error(t.kind))
                            }
                            this.total = this.attempts.length
                        },
                        e => {
                            this.loading = false
                            throw e
                        })
            },
            getDataFromApi () {
                this.loading = true
                const { sortBy, sortDesc, page, itemsPerPage } = this.options

                return memberApi.searchAttempts(
                    1,
                    10,
                    0,
                    Date.now() * 1000,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    "-joined_at",
                )
            }
        },
    }
</script>

<style scoped>

</style>
