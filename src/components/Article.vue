<template>
  <div class="article">
    <v-layout>
      <v-flex>
        <v-card class="pa-3">
          <v-card-actions class="header pa-0">
            <v-card-title primary-title class="pa-0">
              <h3 class="subheading mb-0">2017级8班 李小龙的妈妈</h3>
            </v-card-title>
            <v-spacer></v-spacer>
            <v-btn class="btn-set" fab flat color="grey lighten-1">
              <v-icon>keyboard_arrow_down</v-icon>
            </v-btn>
          </v-card-actions>
          <v-layout row wrap>
            <v-flex xs8>
              <v-card-text class="pa-0">
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Temporibus tempora sunt porro. Esse, nostrum saepe!
                </p>
              </v-card-text>
            </v-flex>
            <v-flex xs4 align-self-center class="py-2">
              <v-img src="https://picsum.photos/200" aspect-ratio="1"></v-img>
            </v-flex>
          </v-layout>
          <v-divider></v-divider>

          <v-card-actions class="footer pa-0">
            <v-avatar
              v-for="avatar in avatars"
              :tile="false"
              :size="24"
              color="grey lighten-4"
              :key="avatar.url"
              class="mr-1"
            >
              <img :src="avatar.url" alt="avatar" />
            </v-avatar>
            <v-spacer></v-spacer>
            <v-btn class="btn-comment" fab flat color="grey lighten-1">
              <v-icon>textsms</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data: function() {
    return {
      avatars: [
        { url: 'https://randomuser.me/api/portraits/men/32.jpg' },
        { url: 'https://randomuser.me/api/portraits/women/26.jpg' },
        { url: 'https://randomuser.me/api/portraits/women/68.jpg' },
        { url: 'https://randomuser.me/api/portraits/women/17.jpg' },
        {
          url:
            'https://pbs.twimg.com/profile_images/1111650888215494657/jNu7XFNX.jpg'
        }
      ]
    }
  }
})
</script>

<style lang="scss" scoped>
.header,
.footer {
  height: 36px;
}
</style>
