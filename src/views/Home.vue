<template>
  <div class="container">
    <div class="nav-wrapper">
      <v-layout>
        <v-flex xs8>
          <v-tabs fixed-tabs slider-color="cyan">
            <v-tab> 推荐 </v-tab>
            <v-tab> 学校 </v-tab>
            <v-tab> 班级 </v-tab>
            <v-tab> 关注 </v-tab>
          </v-tabs>
        </v-flex>
        <v-spacer></v-spacer>
        <v-flex>
          <v-layout :align-center="true" fill-height>
            <v-flex>
              <v-icon>message</v-icon>
            </v-flex>
            <v-flex>
              <v-icon>add_circle_outline</v-icon>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </div>
    <v-carousel class="banners" hide-delimiters height="160">
      <v-carousel-item
        v-for="(item, i) in images"
        :key="i"
        :src="item.src"
      ></v-carousel-item>
    </v-carousel>

    <div class="sub-nav">
      <v-layout row wrap justify-center>
        <v-flex xs9>
          <v-tabs fixed-tabs slider-color="cyan">
            <v-tab>
              校园头条
            </v-tab>
            <v-tab>
              学校概况
            </v-tab>
            <v-tab>
              校园之星
            </v-tab>
          </v-tabs>
        </v-flex>
      </v-layout>
      <div class="article-list">
        <AppArticle
          class="article"
          v-for="item in articles"
          :key="item.id"
        ></AppArticle>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getRandomInt } from '@/utils/math.util'
import AppArticle from '../components/Article'

export default Vue.extend({
  data: function() {
    return {
      images: [
        { src: `https://picsum.photos/id/${getRandomInt(1000)}/1920/1080` },
        { src: `https://picsum.photos/id/${getRandomInt(1000)}/1920/1080` },
        { src: `https://picsum.photos/id/${getRandomInt(1000)}/1920/1080` }
      ],
      articles: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }]
    }
  },
  name: 'home',
  components: { AppArticle }
})
</script>

<style lang="scss" scoped>
.container {
  padding: 0px;
}
.nav-wrapper {
  padding: 0px;
  background-color: white;
}
.v-tabs__div {
  min-width: unset;
}

.sub-nav {
  padding: 10px;
}

.article {
  padding-top: 10px;
}
</style>
