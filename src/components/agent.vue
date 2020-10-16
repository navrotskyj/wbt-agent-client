<template>

    <div>
        <span class="group pa-6 mr-12">
            <v-btn icon dark class="mb-3 mr-8" v-on:click="testOpen()">
                    <v-icon>mdi-virus</v-icon>
                    <span class="wbt-chan-state caption">
                        TEST
                    </span>
            </v-btn>

            <v-btn icon dark class="mb-3 mr-8" disabled v-model="answerInbound" @click.stop="answerInbound = !answerInbound">
                    <v-icon>mdi-virus</v-icon>
                    <span class="wbt-chan-state caption">
                        Auto answer
                    </span>
            </v-btn>

              <v-btn icon dark class="ma-4" :disabled="ch.disabled" :color="ch.color" v-on:click='setWaiting(ch.channel)' v-for="(ch, index) in channels" :key="index">
                    <v-badge
                            :content="ch.open"
                            :value="ch.open > 0"
                    >
                        <v-icon style="margin-top: -14px;">{{ch.icon}}</v-icon>
                    </v-badge>
                    <span class="wbt-chan-state caption">
                        {{ch.state}}
                    </span>
                </v-btn>
          </span>

        <v-menu >
            <template v-slot:activator="{ on }">
                <v-btn
                        v-on="on"
                        icon
                >
                    <span class="wbt-duration-field white--text subtitle-2 ">{{duration}}</span>
                    <v-badge
                            bordered
                            bottom
                            :color="selectedStatus.color"
                            overlap
                            avatar
                    >
                        <v-avatar overlap>

                            <v-img src="https://cdn.vuetifyjs.com/images/lists/4.jpg"></v-img>
                        </v-avatar>
                    </v-badge>
                </v-btn>
            </template>

            <v-list>
                <v-list-item
                        v-for="(item, index) in listAgentStatus"
                        v-show="item.id !== status"
                        :key="index"
                        @click="setStatus(item)"
                >
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
    </div>
</template>

<script>

    function chanelTime(state, joined_at, timeout) {
        if (timeout) {
            return `${Math.round((timeout - joined_at) / 1000)}`
        }

        return `${Math.round((timeout - joined_at) / 1000)}`
    }

    export default {
        name: "agent",
        data() {
            return {
                onDemand: false,
                duration: '00:00:00',
                interval: null,
                answerInbound: false,
                emails: 10,
                selectedStatus: {},
                listAgentStatus: [
                    {title: 'Online', id: 'online', color: 'light-green accent-4'},
                    {title: 'Offline', id: 'offline', color: 'grey accent-4'},
                    {title: 'Sleep', id: 'pause', color: 'amber accent-4', icon: 'mdi-pause'},
                    {title: 'Smoke', id: 'pause', color: 'amber accent-4', icon: 'mdi-pause'},
                ],
                color: "light-green accent-4",
            }
        },
        created() {
            this.interval = setInterval(() => {
                this.duration = new Date(Math.round((Date.now() - this.lastStatusChange) / 1000) * 1000)
                    .toISOString().substr(11, 8);
            }, 1000)
        },
        destroyed() {
            if (this.interval) {
                clearInterval(this.interval)
            }
        },
        computed: {
            status() {
                return this.$store.getters['agent/status']
            },
            lastStatusChange() {
                return this.$store.getters['agent/lastStatusChange']
            },
            channels() {
                return (this.$store.getters['agent/channels'] || []).map( i => {
                    return {
                        duration: chanelTime(i.state, i.joined_at, i.timeout),
                        color: i.state === 'missed' ? 'error' : 'success',
                        icon: channelIcon(i.channel),
                        disabled: ['wrap_time', 'missed'].indexOf(i.state) === -1,
                        ...i,
                    }
                })
            }
        },
        methods: {
            testOpen() {
                var link = document.createElement("a");
                link.download = 'File name';
                link.href = 'wtel://00';
                link.click();
            },
            setStatus(status) {
                this.$store.dispatch('setAgentStatus', status.id)
            },
            setWaiting(channel) {
                this.$store.dispatch('setAgentWaiting', channel)
            }
        },
        watch: {
            status(s) {
                this.selectedStatus = (this.listAgentStatus.find(i => i.id === s) || {}) //TODO
            }
        }
    }

    function channelIcon(chan) {
        switch (chan) {
            case "email":
                return "mdi-email"
            case "call":
                return "mdi-phone"
            case "chat":
                return "mdi-chat"
        }
    }
</script>

<style scoped>
    .wbt-duration-field {
        position: absolute;
        bottom: -6px;
        right: 46px;
    }
    .wbt-chan-state {
        position: absolute;
        bottom: -19px;
    }
</style>
