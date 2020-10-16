<template>
    <v-data-table
            dense
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
        name: "historyAttempt",
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
                        sortable: true,
                        value: 'joined',
                    },

                    { text: 'Member', value: 'member.name' },
                    { text: 'Agent', value: 'agent.name' },
                    {
                        text: 'Leaving',
                        sortable: false,
                        value: 'leaving',
                    },
                    { text: 'Result', value: 'result' },
                    { text: 'Offering', value: 'offering' },
                    { text: 'Bridged', value: 'bridged' },
                    { text: 'Reporting', value: 'reporting' },,
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
                                    ...i
                                }
                            })
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


                return memberApi.searchAttemptsHistory(
                    page,
                    itemsPerPage,
                    Date.now() - 60 * 60 * 1000 * 6000,
                    Date.now() + (600 * 1000),
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
