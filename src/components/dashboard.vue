<template>

    <v-card class="agent-msg" >
        <v-card-title>
            Queue {{queues.length}}
        </v-card-title>
        <v-card-text>
            <queue
                    :width="null"
                    :height="null"
                    :chartdata="queueData"
                    :options="queueOptions"
            ></queue>
        </v-card-text>
    </v-card>

</template>

<script>
    import  'vue-chartjs'
    import Queue from './statistics/queue'
    import {agentApi} from "../internal/client";


    const queueData = {
        labels: [],
        datasets: []
    };
    const queueOptions = {
        responsive: true,
        aspectRatio: 2,
        legend: {
            display: false,
        },
        scales: {
            xAxes: [{
                stacked: true,
            }],
            yAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'Gb'
                },
                stacked: true,
            }]
        },
    };


    export default {
        name: "dashboard",
        components: {
            Queue
        },
        data: () => ({
            queueData,
            queueOptions,
        }),
        computed: {
            queues() {
                return this.$store.getters['agent/queues']
            }
        },
        watch: {
            queues(data) {
                if (!data) return

                this.queueData = data.reduce(function(ctx, current) {
                    ctx.labels.push(current.queue.name)
                    const tst = current.statistics.map( i => {
                        return  {
                            label: 'Digital Ocean',
                            // backgroundColor: '#36A2EB',
                            data: [1, 2, 1, 2, 1, 2 * 3, 1, 2 * 4, 1, 2 * 5, 1, 2 * 6, 1, 2 * 7, 1, 2 * 8]
                        }
                    })
                    ctx.datasets = ctx.datasets.concat(tst)
                    return ctx
                }, {
                    labels: [],
                    datasets: [],
                })
            }
        },
        created() {

        }
    }
</script>

<style scoped>

</style>
