<template>
    <div>
        <div v-if="allSpyScreenSessions">
          <v-card v-for="(s, index) in allSpyScreenSessions"  :key="`screen-${index}`">
            <video v-if="s.stream" :key="`screen-video-${index}`" autoplay :srcObject.prop="s.stream" style="width: 500px"></video>
            <v-btn color="error" @click="s.close()">
              <v-icon>mdi-phone-hangup</v-icon>Close
            </v-btn>
            <v-btn color="info" @click="s.screenshot()">
            Screenshot
          </v-btn>

            <v-btn v-if="s.recordings" color="warn" @click="s.stopRecord()">
              Rec
            </v-btn>
            <v-btn v-if="!s.recordings" color="error" @click="s.startRecord()">
              Rec
            </v-btn>

          </v-card>
        </div>

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
        },
      computed:{
        allSpyScreenSessions() {
          return this.$store.getters['allSpyScreenSessions']
        },
      }
    }
</script>
