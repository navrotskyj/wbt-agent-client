<template>
    <v-data-table
            :headers="headers"
            :items="desserts"
            :single-expand="singleExpand"
            :expanded.sync="expanded"
            item-key="name"
            show-expand
            class="elevation-1"
    >
        <template v-slot:expanded-item="{ headers, item }">
            <td :colspan="headers.length">More info about {{ item.name }}</td>
        </template>
    </v-data-table>
</template>

<script>
    export default {
        name: "callHistory",
        data () {
            return {
                expanded: [],
                singleExpand: true,
                headers: [
                    {
                        text: 'Time',
                        align: 'start',
                        sortable: false,
                        value: 'created_at',
                    },
                    { text: 'From', value: 'from' },
                    { text: 'To', value: 'to' },
                    { text: 'Queue', value: 'queue' },
                    { text: 'Agent', value: 'agent' }
                ],
                desserts: [
                    {
                        time: 'todo',
                        from: "TODO",
                        to: "TODO",
                        Queue: "TODO",
                        Agent: "TODO",
                    },

                ],
            }
        },
    }
</script>

<style scoped>

</style>
