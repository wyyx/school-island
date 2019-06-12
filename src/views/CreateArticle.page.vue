<template>
  <div class="container white pa-0">
    <Header :showBack="true" title="创建文章" @back="onBack"></Header>
    <!-- tabs -->
    <v-layout row wrap class="pa-3">
      <v-flex>
        <v-tabs fixed-tabs slider-color="primary">
          <v-tab @click="previewMode = false"> 编辑 </v-tab>
          <v-tab @click="previewMode = true"> 预览 </v-tab>
        </v-tabs>
      </v-flex>
    </v-layout>
    <!-- editor -->
    <v-layout v-show="!previewMode" class="editor-wrapper pa-3" column wrap>
      <!-- meta info -->
      <v-flex>
        <v-text-field
          clearable
          label="文章标题"
          v-model="title"
          v-validate="'required'"
          name="title"
          data-vv-as="标题"
          :error-messages="errors.collect('title')"
          :error="errors.has('title')"
        ></v-text-field>
        <v-text-field
          clearable
          v-model="cover"
          v-validate="'required'"
          name="cover"
          data-vv-as="封面图"
          :error-messages="errors.collect('cover')"
          :error="errors.has('cover')"
          label="封面图"
        >
        </v-text-field>
        <div class="preview-wrapper text-center">
          <img class="preview" :src="cover" alt="" />
        </div>
      </v-flex>
      <!-- toobar group1 -->
      <v-flex class="text-center">
        <div class="toolbar-container pa-1 ">
          <div>
            <v-btn @click="formatBold" fab depressed small color="transparent">
              <v-icon medium color="grey darken-1">format_bold</v-icon>
            </v-btn>
          </div>
          <div>
            <v-menu offset-y>
              <template v-slot:activator="{ on }">
                <v-btn
                  v-on="on"
                  fab
                  depressed
                  small
                  color="transparent"
                  @click="saveCurrentSelection"
                >
                  <v-icon medium color="grey darken-1"
                    >format_color_text
                  </v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-tile>
                  <v-list-tile-title>
                    <v-layout row wrap>
                      <v-flex shrink @click="formatColor('red')">
                        <div class="color-sample red-color-sample"></div>
                      </v-flex>
                    </v-layout>
                  </v-list-tile-title>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-title>
                    <v-layout row wrap>
                      <v-flex shrink @click="formatColor('green')">
                        <div class="color-sample green-color-sample"></div>
                      </v-flex> </v-layout
                  ></v-list-tile-title>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-title>
                    <v-layout row wrap>
                      <v-flex shrink @click="formatColor('blue')">
                        <div class="color-sample blue-color-sample"></div>
                      </v-flex> </v-layout
                  ></v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-menu>
          </div>
          <div>
            <v-menu offset-y>
              <template v-slot:activator="{ on }">
                <v-btn v-on="on" fab depressed small color="transparent">
                  <v-icon medium color="grey darken-1">
                    format_color_fill
                  </v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-tile>
                  <v-list-tile-title>
                    <v-layout row wrap>
                      <v-flex shrink>
                        <div class="color-sample red-color-sample"></div>
                      </v-flex>
                    </v-layout>
                  </v-list-tile-title>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-title>
                    <v-layout row wrap>
                      <v-flex shrink>
                        <div class="color-sample green-color-sample"></div>
                      </v-flex> </v-layout
                  ></v-list-tile-title>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-title>
                    <v-layout row wrap>
                      <v-flex shrink>
                        <div class="color-sample blue-color-sample"></div>
                      </v-flex> </v-layout
                  ></v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-menu>
          </div>
          <div>
            <v-btn fab depressed small color="transparent">
              <v-icon medium color="grey darken-1">add_photo_alternate </v-icon>
            </v-btn>
          </div>
          <div>
            <v-btn fab depressed small color="transparent">
              <v-icon medium color="grey darken-1">format_clear </v-icon>
            </v-btn>
          </div>
        </div>
      </v-flex>
      <v-flex>
        <div id="editor" ref="editor" v-html="articleHtml" class="editor"></div>
      </v-flex>
    </v-layout>
    <v-layout v-show="previewMode" row wrap class="pa-3">
      <v-flex>
        <div class="preview" v-html="articleHtml"></div>
      </v-flex>
    </v-layout>
    <!-- actions -->
    <v-layout class="actions" row wrap justify-center>
      <v-flex shrink>
        <v-btn color="light" @click="saveAsDraft">存为草稿</v-btn>
      </v-flex>
      <v-flex shrink>
        <v-btn color="success" @click="publish">发布</v-btn>
      </v-flex>
    </v-layout>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Header from '../components/Header.component.vue'
import Quill from 'quill'
import { format } from '../utils/format.util'
import { editorMixin } from '../mixins/editor.mixin'

const ARTICLE_TEXT_HOLDER = '这里添加文章的内容...'

export default Vue.extend({
  mixins: [editorMixin],
  data: function() {
    return {
      // https://picsum.photos/id/68/536/354
      title: '',
      cover: 'https://picsum.photos/id/68/536/354',
      editor: {} as Quill,
      articleHtml: ARTICLE_TEXT_HOLDER,
      // articleHtml: '',
      previewMode: false,
      currentSelection: null as any
    }
  },
  components: {
    Header
  },
  methods: {
    onBack() {
      this.$router.push({
        name: 'home'
      })
    },
    saveAsDraft() {
      console.log('saveAdDraft')
    },
    publish() {
      console.log('publish')

      this.$validator.validate().then(valid => {
        if (valid) {
          console.log('TCL: publish -> valid', valid)
        }
      })
    },
    saveCurrentSelection() {
      const that: any = this
      this.currentSelection = this.editor.getSelection()
    }
  },
  mounted() {
    const that: any = this
    this.editor = new Quill(that.$refs.editor, {
      modules: {
        toolbar: false
      },
      theme: 'snow'
    })
  }
})
</script>

<style lang="scss" scoped>
.preview {
  width: 80%;
}

#editor {
  min-height: 300px;
}

.toolbar-container {
  display: flex;
  width: 100%;
}

.toolbar-container > div {
  flex: 1 1 auto;
}

.toolbar-container button {
  margin: 0px;
}

#header-1-button,
#header-2-button {
  font-size: 22px;
  font-weight: 900;
  color: rgba(0, 0, 0, 0.54);
}

.actions {
  padding-bottom: 96px;
}

.ql-container {
  border-radius: 2px;
}

.ql-editor {
  position: absolute !important;
  width: 100% !important;
  height: 100% !important;
}

.editor /deep/ * {
  line-height: 210% !important;
  word-spacing: 120%;
  letter-spacing: 0.15rem;
}

.color-sample {
  width: 24px;
  height: 24px;
}

.red-color-sample {
  background-color: rgb(223, 72, 72);
}

.green-color-sample {
  background-color: rgb(68, 206, 68);
}
.blue-color-sample {
  background-color: rgb(75, 75, 236);
}
</style>
