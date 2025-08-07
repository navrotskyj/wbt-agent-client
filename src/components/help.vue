<template>
    <div>
        <v-tabs
                v-model="tab"
                dark
        >
            <v-tab
                    v-for="item in tabs"
                    :key="item.tab"
            >
                {{ item.tab }}
            </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
            <v-tab-item
                    v-for="item in items"
                    :key="item.tab"
            >
                <v-card flat>
                    <v-card-text>{{ item.content }}</v-card-text>
                </v-card>
            </v-tab-item>
        </v-tabs-items>

        <v-list two-line subheader>
            <v-subheader inset>Agents</v-subheader>

            <v-list-item
                    v-for="item in agents"
                    :key="item.id"
                    @click="screen(item)"
            >
                <v-list-item-avatar>
                    <v-icon large
                            color="success"
                    >mdi-account-circle-outline</v-icon>
                </v-list-item-avatar>

                <v-list-item-content>
                    <v-list-item-title v-text="item.name"></v-list-item-title>
                    <v-list-item-subtitle v-text="item.status"></v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-action>
                    <v-btn icon>
                        <v-icon color="grey lighten-1">mdi-information</v-icon>
                    </v-btn>
                </v-list-item-action>
            </v-list-item>

            <v-divider inset></v-divider>

            <v-subheader inset>Supervisors</v-subheader>
        </v-list>
    </div>
</template>

<script>
    import {agentApi} from '../internal/client'

    export default {
        name: "help",
        data() {
            return {
                agents: [],
                queue: [],
                tab: 0,
                items: [],
                tabs: [
                    {
                       tab: "Users",
                        items: []
                    }
                ]
            }
        },
        async created() {
            const res = await agentApi.searchAgent(1, 100, undefined, undefined, undefined, [12,3429, 4727])
            this.agents = res.data.items
        },
        methods: {
          screen(i) {
           cli.spyScreen(
               +i.user.id,
               {
                 iceServers: [],
                 iceTransportPolicy: "all",
               }
           )
          }
        }
    }
</script>

<style scoped>

</style>
