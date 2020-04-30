<template>
    <v-list two-line subheader>
        <v-subheader inset>Agents</v-subheader>

        <v-list-item
                v-for="item in agents"
                :key="item.id"
                @click=""
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
</template>

<script>
    import {agentApi} from '../internal/client'

    export default {
        name: "help",
        data() {
            return {
                agents: []
            }
        },
        async created() {
            const res = await agentApi.searchAgent(1, 100)
            this.agents = res.data.items
        }
    }
</script>

<style scoped>

</style>
