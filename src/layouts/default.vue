<template>
    <v-app>

        <v-navigation-drawer width="350" v-model="drawer" app :clipped="$vuetify.breakpoint.lgAndUp">

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
            <transition>
                <slot/>
            </transition>
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
            }
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
