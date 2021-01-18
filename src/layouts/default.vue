<template>
    <v-app>

        <v-navigation-drawer width="350" v-model="drawer" app :clipped="$vuetify.breakpoint.lgAndUp">

            <v-card class="mx-auto"
                    max-width="344"
                    outlined
                    :to="{ name: 'dashboard'}"
            >
                <v-list-item three-line>
                    <v-list-item-content >
                        <v-list-item-title class="headline mb-1">Dashboard</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-card>
            <v-card class="mx-auto"
                    max-width="344"
                    outlined
                    :to="{ name: 'call_history'}"
            >
                <v-list-item three-line>
                    <v-list-item-content >
                        <v-list-item-title class="headline mb-1">History call</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-card>

            <v-card class="mx-auto"
                    max-width="344"
                    outlined
                    :to="{ name: 'main'}"
            >
                <v-list-item three-line>
                    <v-list-item-content >
                        <v-list-item-title class="headline mb-1">Home</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-card>

            <v-list-item-group v-model="sel">
            <v-card v-for="(call, index) in callList" active :to="{ name: 'call', params: {call: call, callId: call.id }}" :key="`call-${index}`"
                    class="mx-auto"
                    max-width="344"
            >
                <v-list-item three-line >
                    <v-list-item-icon>
                        <v-icon>mdi-phone-incoming</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content >
                        <div class="overline">{{call.state}}</div>
                        <v-list-item-title class="headline mb-1">{{call.displayName}}</v-list-item-title>
                        <v-list-item-subtitle>{{call.displayNumber}}</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>

                <!--<v-card-actions class="wbt-list-btn-groups">-->
                <!--</v-card-actions>-->
            </v-card>

            <v-card v-for="(chat, index) in conversationList" active :to="{ name: 'chat', params: {chat: chat, chatId: chat.id }}" :key="`chat-${index}`"
                    class="mx-auto"
                    max-width="344"
            >
                <v-list-item three-line >
                    <v-list-item-icon>
                        <v-icon>mdi-chat</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content >
                        <div class="overline">{{chat.state}}</div>
                        <v-list-item-title class="headline mb-1">{{chat.state}}</v-list-item-title>
                        <v-list-item-title class="headline mb-1">cr: {{chat.createdAt}}</v-list-item-title>
                        <v-list-item-title class="headline mb-1">ans: {{chat.answeredAt}}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <!--<v-card-actions class="wbt-list-btn-groups">-->
                <!--</v-card-actions>-->
            </v-card>

            <v-card v-for="(task, index) in taskList" active :to="{ name: 'task', params: {task: task, taskId: task.id }}" :key="`task-${index}`"
                    class="mx-auto"
                    max-width="344"
            >
                <v-list-item three-line >
                    <v-list-item-icon>
                        <v-icon>mdi-chat</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content >
                        <div class="overline">{{task.state}}</div>
                        <v-list-item-title class="headline mb-1">{{task.state}}</v-list-item-title>
                        <v-list-item-title class="headline mb-1">cr: {{task.createdAt}}</v-list-item-title>
                        <v-list-item-title class="headline mb-1">ans: {{task.answeredAt}}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <!--<v-card-actions class="wbt-list-btn-groups">-->
                <!--</v-card-actions>-->
            </v-card>

            </v-list-item-group>
        </v-navigation-drawer>

        <v-navigation-drawer width="350" right v-model="right" app clipped>
            <Help></Help>
        </v-navigation-drawer>

        <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" clipped-right app class="wbt-bar white--text">
            <v-toolbar-title>
                <v-app-bar-nav-icon class="white--text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            </v-toolbar-title>

            <v-spacer></v-spacer>

            <Agent></Agent>
            <v-btn icon class="white--text ml-6" @click.stop="right = !right">
                <v-icon>mdi-help</v-icon>
            </v-btn>
        </v-app-bar>

        <v-content app>
            <v-container  fill-height>
                <v-layout >
                    <v-flex >
                        <slot/>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-content>

        <v-btn
                bottom
                color="success"
                dark
                fab
                fixed
                right
                @click="dialog = !dialog"
        >
            <v-icon>mdi-phone</v-icon>
        </v-btn>
        <v-dialog
                v-model="dialog"
                width="800px"
        >
            <CreateCall></CreateCall>
        </v-dialog>
    </v-app>
</template>

<script>
    import Agent from '../components/agent'
    import CreateCall from '../components/createCall'
    import Help from '../components/help'

    function compare(a, b) {
        if (a.createdAt > b.createdAt) return -1;
        if (b.createdAt > a.createdAt) return 1;

        return 0;
    }



    export default {
        name: "default",
        components: {
            Agent,
            CreateCall,
            Help,
        },
        data: () => ({
            drawer: true,
            right: false,
            sel: null,
        }),
        created() {

        },
        computed: {
            dialog: {
                set(v) {
                    this.$store.commit( 'showNewCall', v)
                },
                get() {
                    return this.$store.getters['dialogCall'];
                }
            },
            callList() {
                return this.$store.getters.callList.sort(compare);
            },
            conversationList() {
                return this.$store.getters.conversationList;
            },
            taskList() {
                return this.$store.getters.taskList;
            },
        },
        methods: {
            exit() {}
        }
    }
</script>

<style scoped>
    .v-application .wbt-bar {
        background-color: #171a2a !important;
        border-color: #171a2a !important;
    }
    .wbt-list-btn-groups > button {
        width: 150px;
        z-index: 100;
    }
</style>
