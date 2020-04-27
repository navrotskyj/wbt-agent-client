<template>
    <v-container >
        <v-card outlined>

            <v-card-title>
                <span class="headline">{{call.displayName}}</span>
            </v-card-title>
            <v-card-subtitle class="pb-0">{{call.displayNumber}}</v-card-subtitle>

            <v-card-text>
                <video v-if="call.peerStreams" :srcObject.prop="call.peerStreams[0]" autoplay />
                <v-container fluid>
                    <v-row>
                        <v-col cols="12" >
                            <span class="headline">Variables</span>
                            <v-text-field disabled v-for="(k, v) in call.variables"
                                          :label="k"
                                          :value="v"
                            ></v-text-field>
                        </v-col>
                    </v-row>

                    <v-form ref="form"
                            v-model="valid" v-if="call.postProcessData">
                        <v-row>

                            <v-col cols="6" sm="6">
                                <span class="headline">Member</span>
                                <v-text-field disabled
                                              label="Name"
                                              :value="call.postProcessData.name"
                                ></v-text-field>
                                <v-text-field disabled
                                              label="Queue"
                                              :value="call.queue.queue_name"
                                ></v-text-field>

                                <v-text-field disabled
                                              label="Last activity at"
                                              :value="new Date(call.postProcessData.last_activity_at * 1000).toLocaleString()"
                                ></v-text-field>
                            </v-col>


                        </v-row>

                        <v-row v-if="call.allowReporting">
                            <v-col cols="6" sm="6" >
                                <span class="headline">Post processing</span>

                                <v-select
                                        v-model="call.postProcessData.status"
                                        :items="['auto', 'success', 'cancel']"
                                        menu-props="auto"
                                        label="Status"
                                ></v-select>

                                <v-menu
                                        ref="menu1"
                                        v-model="menu1"
                                        :close-on-content-click="false"
                                        transition="scale-transition"
                                        offset-y
                                        max-width="290px"
                                        min-width="290px"
                                >
                                    <template v-slot:activator="{ on }">
                                        <v-text-field
                                                v-model="call.postProcessData.next_call"
                                                label="Nex call"
                                                v-on="on"
                                        ></v-text-field>
                                    </template>
                                    <v-date-picker v-model="call.postProcessData.next_call" no-title @input="menu1 = false"></v-date-picker>
                                </v-menu>
                            </v-col>
                            <v-col cols="6" sm="6" class="pt-9">
                                <v-switch v-model="call.postProcessData.display" class="ma-4" label="Set display ?"></v-switch>

                                <v-menu
                                        ref="menu2"
                                        v-model="menu2"
                                        :close-on-content-click="false"
                                        transition="scale-transition"
                                        offset-y
                                        max-width="290px"
                                        min-width="290px"
                                >
                                    <template v-slot:activator="{ on }">
                                        <v-text-field
                                                v-model="call.postProcessData.expire"
                                                label="Expire"
                                                persistent-hint
                                                v-on="on"
                                        ></v-text-field>
                                    </template>
                                    <v-date-picker v-model="call.postProcessData.next_call" no-title @input="menu2 = false"></v-date-picker>
                                </v-menu>

                            </v-col>

                            <v-col cols="12">
                                <v-textarea
                                        v-model="call.postProcessData.description"
                                        label="Description"
                                ></v-textarea>
                            </v-col>
                        </v-row>

                        <v-btn v-if="call.allowReporting"
                                class="mr-4"
                                @click="call.reporting(call.postProcessData.status)"
                        >
                            Reporting
                        </v-btn>
                    </v-form>

                </v-container>
            </v-card-text>

        </v-card>
    </v-container>
</template>

<script>

    export default {
        name: "call",
        data: () => ({
            valid: true,
            menu1: false,
            menu2: false,
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
        },
        computed: {
            call() {
                return this.$route.params.call
            },
        },
        created() {

        },
        async beforeCreate() {
            const exists = await this.$store.dispatch('existsCall', this.$route.params.callId)
            if (!exists) {
                this.$router.go(-1)
            }
        },
    }
</script>

<style scoped>

</style>
