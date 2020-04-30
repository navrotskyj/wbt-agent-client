<template>
    <v-card class="mx-auto">

        <v-list-item three-line>
            <v-list-item-content>
                <div  v-if="call.queue" class="overline mb-4">{{call.queue.queue_name}}</div>
                <v-list-item-title class="headline mb-1">Client: {{call.displayName}}</v-list-item-title>
                <v-list-item-subtitle>Phone: {{call.displayNumber}}</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-avatar
                    tile
                    size="80"
                    color="grey"
            ></v-list-item-avatar>
        </v-list-item>

        <v-card-actions>
            <v-btn color="error"  v-show="call.allowHangup" @click="call.hangup()">
                <v-icon>mdi-phone-hangup</v-icon>hangup
            </v-btn>

            <v-btn color="warning"  v-show="call.allowHold" @click="call.hold()" >
                <v-icon>mdi-phone-paused</v-icon>hold
            </v-btn>
            <v-btn color="success" v-show="call.allowUnHold" @click="call.unHold()">
                <v-icon>mdi-phone-paused-outline</v-icon>active
            </v-btn>
            <v-btn color="success" v-show="call.allowAnswer" @click="call.answer({video: true})" >
                <v-icon>mdi-phone-incoming</v-icon>answer
            </v-btn>
            <v-btn v-if="call.allowReporting"
                   class="mr-4"
                   color="success"
                   @click="call.reporting(call.postProcessData)"
            >
                Next call
                <v-icon>mdi-skip-forward-outline</v-icon>
            </v-btn>
            <v-btn text>Ban</v-btn>
            <v-btn text>Cancel</v-btn>
        </v-card-actions>

        <v-card-text>
            <v-row no-gutters>
                <v-col
                        cols="12"
                        sm="6"
                >
                    <v-text-field disabled1 v-for="(v, k) in call.variables"
                                  :label="k"
                                  :value="v"
                    ></v-text-field>
                </v-col>
                <v-col
                        cols="12"
                        sm="6"
                >
                    <v-container>
                        <h3 align="center">Success</h3>
                        <v-row

                                class="justify-center"
                        >
                            <v-radio-group v-model="success" row >
                                <v-radio label="Yes" :value="true"></v-radio>
                                <v-radio label="No" :value="false"></v-radio>
                            </v-radio-group>
                        </v-row>
                    </v-container>

                    <v-container fluid v-if="call.memberCommunication">
                        <v-row align="center">
                            <v-col class="d-flex" cols="12" sm="6">
                                <v-text-field
                                        :messages="['User display: ' + call.memberCommunication.display]"
                                        :value="call.memberCommunication.destination"
                                        label="Destination"
                                ></v-text-field>
                            </v-col>
                            <v-col class="d-flex" cols="12" sm="6">
                                <v-select
                                        :items="['a']"
                                        label="Type"
                                ></v-select>
                            </v-col>
                        </v-row>
                        <v-row align="center">
                            <v-btn icon dense>
                                <v-icon>mdi-plus</v-icon>
                            </v-btn>
                        </v-row>
                    </v-container>

                    <v-row align="center">

                    </v-row>
                </v-col>
            </v-row>

            <v-row v-if="call.allowReporting" no-gutters>
                <v-textarea
                        v-model="call.postProcessData.description"
                        label="Description"
                ></v-textarea>
            </v-row>

            <v-timeline>

                <v-timeline-item
                        color="green lighten-1"
                        left
                        v-for="(v, k) in history"
                >
                    <template v-slot:opposite>
        <span
                :class="`headline font-weight-bold`"
        >{{new Date(+v.joined_at).toLocaleString()}}</span>
                    </template>
                    <v-card>
                        <v-card-title class="green lighten-1">
                            <v-icon
                                    class="mr-4"
                                    dark
                                    size="42"
                            >
                                mdi-phone-in-talk
                            </v-icon>
                            <h2 class="display-1 white--text font-weight-light">
                                {{v.destination.destination}}
                            </h2>
                        </v-card-title>


                    </v-card>
                </v-timeline-item>
            </v-timeline>

            <audio v-if="call.peerStreams" :srcObject.prop="call.peerStreams[0]" autoplay />
        </v-card-text>



    </v-card>
</template>

<script>

    import {memberApi} from '../internal/client'

    export default {
        name: "call",
        data: () => ({
            success: false,
            valid: true,
            menu1: false,
            menu2: false,
            history: [],
            nameRules: [
                v => !!v || 'Name is required',
                v => (v && v.length <= 10) || 'Name must be less than 10 characters',
            ],
            email: '',
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
            ],
            select: null,
            items: [
                'Item 1',
                'Item 2',
                'Item 3',
                'Item 4',
            ],
            checkbox: false,
            lazy: false,
            member: null
        }),

        props: {
            callId: String,
            call: Object
        },
        async created() {
            // загружаем данные, когда представление создано
            // и данные реактивно отслеживаются
            await this.fetchData()
        },
        methods: {
            validate () {
                this.$refs.form.validate()
            },
            reset () {
                this.$refs.form.reset()
            },
            resetValidation () {
                this.$refs.form.resetValidation()
            },
            async fetchData() {
                if (!this.call || !this.call.queue) {
                    this.history = []

                    return
                }

                const res = await memberApi.searchAttemptsHistory(
                    1,
                    20,
                    0,
                    Date.now() * 1000,
                    undefined,
                    undefined,
                    undefined,
                    this.call.queue.member_id,
                    undefined,
                    undefined,
                    undefined,
                    "+joined_at",
                )
                this.history = res.data.items
            }
        },
        watch: {
            // при изменениях маршрута запрашиваем данные снова
            $route: 'fetchData'
        },
    }
</script>

<style scoped>

</style>
