<template>

    <v-card class="agent-msg" >
        <v-card-text>
            <h4>{{chat.state}}</h4>
            <v-row>
              <v-item-group>
                <div v-if="chat.task.form">{{chat.task.form}}</div>
                <v-btn v-if="chat.task.form" color="error" v-show="chat.task.form" @click="formAction(chat.task)">Action[0]</v-btn>
                <v-btn color="error" v-show="chat.allowDecline" @click="decline()">Decline</v-btn>
                <v-btn color="success" v-show="chat.allowJoin" @click="join()">Join</v-btn>
                <v-btn v-show="chat.allowLeave" @click="leave()">Leave</v-btn>

                <v-btn v-if="chat.allowReporting"
                       class="mr-4"
                       color="success"
                       @click="chat.reporting({success: true})"
                >
                  Next call
                  <v-icon>mdi-skip-forward-outline</v-icon>
                </v-btn>
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
                            <v-list-item-content v-if="msg.type === 'text'" >
                                <div class="overline mb-4">{{msg.id}}: {{msg.member && msg.member.name}}</div>
                                <v-list-item-subtitle>{{msg.channel_id}}</v-list-item-subtitle>
                                <v-list-item-title class="headline mb-1">{{msg.text}}</v-list-item-title>
                            </v-list-item-content>
                            <v-list-item-content v-if="msg.file" >
                                <div class="overline mb-4">{{msg.id}}: {{msg.member && msg.member.name}}</div>
                                <v-list-item-subtitle>{{msg.channel_id}}</v-list-item-subtitle>
                                <v-list-item-title class="headline mb-1">
                                  <a :href="msg.file.url">
                                    {{msg.file.name || 'undefined'}} [{{msg.file.mime}}]
                                  </a>
                                </v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-card>
                </v-col>
            </v-row>
        </v-card-text>
        <v-card-actions class="agent-wrap">
            <v-textarea v-model="msg" label="Message"></v-textarea>
            <v-btn fab dark small color="primary" @click="send()" >
                <v-icon dark>mdi-send</v-icon>
            </v-btn>
            <v-file-input
                id="file_send"
                truncate-length="15"
                hide-input
            ></v-file-input>

            <v-btn fab dark small color="primary" type="submit" @click="sendFile()">
              <v-icon dark>mdi-file</v-icon>
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
            formAction(task) {
              debugger
              console.error(task.form.actions[1])
              task.formAction(task.form.actions[1].id, {})
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
                await this.chat.send(this.msg)
                this.msg = ''
              }
            },
            async sendFile() {
              const sel = document.getElementById('file_send');
              if (!sel.files.length) {
                return
              }

              await this.chat.send(sel.files[0], p => {
                console.error(p)
              })
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
