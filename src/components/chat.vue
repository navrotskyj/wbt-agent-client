<template>

    <v-card class="agent-msg" >
        <v-card-text>
            <h4>{{chat.state}}</h4>
            <v-row>
              <v-item-group>
                <v-btn color="error" @click="decline()">Decline</v-btn>
                <v-btn color="success" @click="join()">Join</v-btn>
                <v-btn  @click="leave()">Leave</v-btn>
<!--                <v-btn  @click="close()">Close</v-btn>-->
              </v-item-group>
            </v-row>
            <v-row dense>
                <v-col
                        v-for="msg in chat.messages"
                        cols="12"
                >
                    <v-card
                            class="mx-auto"
                            outlined
                    >
                        <v-list-item three-line>
                            <v-list-item-content>
                                <div class="overline mb-4">{{msg.id}}</div>
                                <v-list-item-subtitle>{{msg.channel_id}}</v-list-item-subtitle>
                                <v-list-item-title class="headline mb-1">{{msg.text}}</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-card>
                </v-col>
            </v-row>
        </v-card-text>
        <v-card-actions class="agent-wrap">
            <v-textarea v-model="msg" label="Message"></v-textarea>
            <v-btn fab dark small color="primary" type="submit" @click="send()">
                <v-icon dark>mdi-send</v-icon>
            </v-btn>
        </v-card-actions>
    </v-card>

</template>

<script>
    export default {
        name: "chat",
        data() {
            return {
                msg: "",
                posts: []
            }
        },
        props: {
          chatId: String,
          chat: Object
        },
        created() {

        },
        methods: {
            fetchData() {

            },
            decline() {
              this.chat.decline()
            },
            join() {
              this.chat.join()
            },
            close() {
              this.chat.close("LAST MESSAGE")
            },
            leave() {
              this.chat.leave()
            },
            async send() {
              if (this.msg) {
                await this.chat.sendText(this.msg)
                this.msg = ''
              }
            }
        },
        watch: {
            // при изменениях маршрута запрашиваем данные снова
            $route: 'fetchData'
        },
    }
</script>

<style scoped>
    .agent-wrap {
        position: absolute;
        bottom: 0;
        width: 100%;
    }
    .agent-msg {
        min-height: 100%;;
    }
</style>
