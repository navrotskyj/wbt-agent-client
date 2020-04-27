<template>
    <div>
        Main page
        <pie
                :chartdata="datasets"
                :options="options"/>
    </div>
</template>

<script>
    import LayoutDefault from '../layouts/default.vue';
    import { Pie } from 'vue-chartjs'

    export default {
        name: 'Main',
        components: {
            Pie,
        },
        data() {
            return {
                options: {},
                labels: ['VueJs', 'EmberJs', 'ReactJs', 'AngularJs'],
                datasets: [
                    {
                        backgroundColor: [
                            '#41B883',
                            '#E46651',
                            '#00D8FF',
                            '#DD1B16'
                        ],
                        data: [40, 20, 80, 10]
                    }
                ]
            }
        }
        // components: {
        //     LayoutDefault,
        // },
    }
</script>
