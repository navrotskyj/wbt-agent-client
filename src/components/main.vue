<template>
    <div>
        <v-card class="mx-auto">
            <ActiveAttempt></ActiveAttempt>
        </v-card>
        <v-card class="mx-auto">
            <HistoryAttempt></HistoryAttempt>
        </v-card>

        <!--<video type="video/mp4" src="http://10.10.10.25:10023/api/v2/recordings/2570/stream?access_token=qz15sqyyotdefkharzse1cigcr">-->
        <!--</video>-->
    </div>
</template>

<script>

    import ActiveAttempt from './tables/activeAttempt'
    import HistoryAttempt from './tables/historyAttempt'

    export default {
        name: 'Main',
        components: {
            ActiveAttempt,
            HistoryAttempt
        }
    }
</script>
