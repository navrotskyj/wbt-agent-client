<template>
    <v-card>
        <v-card-title >
            Make call
        </v-card-title>
        <v-container>
            <v-row class="mx-2">
                <v-col
                        class="align-center justify-space-between"
                        cols="12"
                >
                    <v-row
                            align="center"
                            class="mr-0"
                    >
                        <v-avatar
                                size="40px"
                                class="mx-3"
                        >
                            <img
                                    src="//ssl.gstatic.com/s2/oz/images/sge/grey_silhouette.png"
                                    alt=""
                            >
                        </v-avatar>
                        <v-text-field
                                placeholder="Name"
                                v-model="callVariables.name"
                        />
                    </v-row>
                </v-col>
                <v-col cols="6">
                    <v-text-field
                            v-model="callVariables.company"
                            prepend-icon="mdi-business"
                            placeholder="Company"
                    />
                </v-col>
                <v-col cols="6">
                    <v-text-field
                            placeholder="Job title"
                            v-model="callVariables.job"
                    />
                </v-col>
                <v-col cols="12">
                    <v-text-field
                            v-model="callVariables.mail"
                            prepend-icon="mdi-mail"
                            placeholder="Email"
                    />
                </v-col>
                <v-col cols="12">
                    <v-text-field
                            type="tel"
                            prepend-icon="mdi-phone"
                            placeholder="(000) 000 - 0000"
                            v-model="number"
                    />
                </v-col>
                <v-col cols="12">
                    <v-text-field
                            v-model="callVariables.notes"
                            prepend-icon="mdi-notes"
                            placeholder="Notes"
                    />
                </v-col>
            </v-row>
        </v-container>
        <v-card-actions>
            <v-btn
                    text
                    color="primary"
            >More</v-btn>
            <v-spacer />
            <v-btn
                    text
                    color="primary"
                    @click="close()"
            >Cancel</v-btn>
            <v-btn
                    text
                    @click="makeScreenCall()"
            >ScreenCall</v-btn>
            <v-btn
                    text
                    @click="makeVideoCall()"
            >VideoCall</v-btn>
            <v-btn
                    text
                    @click="makeAudioCall()"
            >AudioCall</v-btn>
        </v-card-actions>
    </v-card>
</template>


<script lang="ts">
    import Vue from 'vue';

    export default Vue.extend({
        name: 'CreateCall',

        data: () => ({
            number: "778",
            useVideo: false,
            useScreen: false,
            callVariables: {
                name: "Name",
                notes: "Notes",
                job: "Job",
                company: "Company",
                mail: "example@mail.com",
            }
        }),

        methods: {
            close() {
                this.$store.commit( "showNewCall", false )
            },
            makeScreenCall() {
                this.$store.dispatch('makeCall', {
                    useVideo: false,
                    useScreen: true,
                    destination: this.number,
                    variables: this.callVariables,
                });
                this.close();
            },
            makeVideoCall() {
                this.$store.dispatch('makeCall', {
                    useVideo: true,
                    useScreen: false,
                    destination: this.number,
                    variables: this.callVariables,
                });
                this.close();
            },
            makeAudioCall() {
                this.$store.dispatch('makeCall', {
                    useVideo: false,
                    useScreen: false,
                    destination: this.number,
                    variables: this.callVariables,
                });
                this.close();
            }
        },

        computed: {

        }
    });
</script>
