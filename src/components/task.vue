<template>
  <v-card class="mx-auto">
    <v-list-item three-line>
      <v-list-item-content>
        <div  v-if="task.queue" class="overline mb-4">{{task.queue.queue_name}}</div>
        <v-list-item-title class="headline mb-1">Client: {{task.displayName}}</v-list-item-title>
        <v-list-item-subtitle>Phone: {{task.displayNumber}}</v-list-item-subtitle>
      </v-list-item-content>

      <div class="wbt-incoming-video">

      </div>

      <span v-show="task.transcript">
          Transcript: {{task.transcript}}
      </span>

      <v-list-item-avatar
          tile
          size="80"
          color="grey"
      >
      </v-list-item-avatar>
    </v-list-item>

    <v-card-actions>
      <v-btn color="error" v-show="task.allowDecline" @click="task.decline()">Decline</v-btn>
      <v-btn color="success" v-show="task.allowAccept" @click="task.accept()">Accept</v-btn>
      <v-btn v-show="task.allowClose" @click="task.close()">Close</v-btn>

      <v-btn v-if="task.allowReporting"
             class="mr-4"
             color="success"
             @click="task.reporting({success: true})"
      >
        Next >
        <v-icon>mdi-skip-forward-outline</v-icon>
      </v-btn>
    </v-card-actions>

    <v-card-text>
      <v-row no-gutters>
        <v-col
            cols="12"
            sm="6"
        >
          <v-text-field disabled1 v-for="(v, k) in task.variables"
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

          <v-container v-if="task.memberCommunication">
            <v-row align="center">
              <v-col class="d-flex" cols="12" sm="6">
                <v-text-field
                    :messages="['User display: ' + task.memberCommunication.display]"
                    :value="task.memberCommunication.destination"
                    label="Destination"
                ></v-text-field>
              </v-col>
              <v-col class="d-flex" cols="12" sm="6">
                <v-select
                    v-model="task.memberCommunication.type"
                    :items="[task.memberCommunication.type]"
                    item-text="name"
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

          <v-row v-if="task.allowReporting" align="center">
            <v-text-field
                v-model="task.postProcessData.next_distribute_at"
                label="Next call"
            ></v-text-field>
          </v-row>

          <v-row v-if="task.allowReporting" align="center">
            <v-text-field
                v-model="task.postProcessData.expire"
                label="Expire"
            ></v-text-field>
          </v-row>
        </v-col>
      </v-row>

      <v-row v-if="task.allowReporting" no-gutters>
        <v-textarea
            v-model="task.postProcessData.description"
            label="Description"
        ></v-textarea>
      </v-row>

    </v-card-text>
  </v-card>
</template>


<script>

import {memberApi} from '../internal/client'

export default {
  name: "task",
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
    taskId: Number,
    task: Object
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
      if (!this.task || !this.task.queue) {
        this.history = []

        return
      }

      try {
        // const res = memberApi.searchAttemptsHistory(
        //     1,
        //     10,
        //     0,
        //     Date.now() * 1000,
        //     undefined,
        //     undefined,
        //     undefined,
        //     this.call.queue.member_id,
        //     undefined,
        //     undefined,
        //     undefined,
        //     "+joined_at",
        // )
        // this.history = res.data.items
      } catch (e) {
        console.error(e)
        this.history = []
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

</style>
