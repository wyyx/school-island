<template>
  <div class="app-relative app-fill-height app-scroll-y white">
    <Header title="创建文章" @back="goBack"></Header>

    <v-dialog v-model="uploadingDialog" persistent min-width="290">
      <v-card class="pa-3">
        <v-progress-linear v-model="uploadingProgress"> </v-progress-linear>
        <div class="text-xs-center">图片正在上传...</div>
      </v-card>
    </v-dialog>

    <video
      v-if="false"
      poster="/path/to/poster.jpg"
      id="player"
      playsinline
      controls
    >
      <source src="/demo.mp4" type="video/mp4" />
      <source src="/path/to/video.webm" type="video/webm" />

      <!-- Captions are optional -->
      <track
        kind="captions"
        label="English captions"
        src="/path/to/captions.vtt"
        srclang="en"
        default
      />
    </video>

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
        <div class="preview-wrapper text-xs-center">
          <img class="preview" :src="cover" alt="" />
        </div>
      </v-flex>
      <!-- toobar group1 -->
      <v-flex class="text-xs-center">
        <div class="toolbar-container pa-1 ">
          <!-- format bold -->
          <div>
            <v-btn @click="formatBold" fab depressed small color="transparent">
              <v-icon medium color="grey darken-1">format_bold</v-icon>
            </v-btn>
          </div>
          <!-- format font color -->
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
                  <v-icon medium color="grey darken-1">
                    format_color_fill
                  </v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-tile>
                  <v-list-tile-title>
                    <v-layout row wrap>
                      <v-flex
                        app-shrink
                        @click="formatClearColor(currentSelection)"
                      >
                        <div class="color-sample no-color-sample">
                          <v-icon>format_color_reset</v-icon>
                        </div>
                      </v-flex>
                    </v-layout>
                  </v-list-tile-title>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-title>
                    <v-layout row wrap>
                      <v-flex
                        app-shrink
                        @click="formatColor('red', currentSelection)"
                      >
                        <div class="color-sample red-color-sample"></div>
                      </v-flex>
                    </v-layout>
                  </v-list-tile-title>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-title>
                    <v-layout row wrap>
                      <v-flex
                        app-shrink
                        @click="formatColor('green', currentSelection)"
                      >
                        <div class="color-sample green-color-sample"></div>
                      </v-flex> </v-layout
                  ></v-list-tile-title>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-title>
                    <v-layout row wrap>
                      <v-flex
                        app-shrink
                        @click="formatColor('blue', currentSelection)"
                      >
                        <div class="color-sample blue-color-sample"></div>
                      </v-flex> </v-layout
                  ></v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-menu>
          </div>
          <!-- insert photo -->
          <div>
            <div class="text-xs-center">
              <v-btn
                fab
                depressed
                small
                color="transparent"
                @click="startInsertImage"
              >
                <v-icon medium color="grey darken-1"
                  >add_photo_alternate
                </v-icon>
              </v-btn>
              <input
                ref="imageInput"
                style="display: none"
                type="file"
                accept="image/*"
                @change="onFileChanged"
              />
            </div>
          </div>
          <!-- clear all format -->
          <div>
            <v-btn
              fab
              depressed
              small
              color="transparent"
              @click="_removeFormat()"
            >
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
      <v-flex app-shrink>
        <v-btn color="light" @click="saveAsDraft">存为草稿</v-btn>
      </v-flex>
      <v-flex app-shrink>
        <v-btn color="success" @click="publish">发布</v-btn>
      </v-flex>
    </v-layout>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Header from '../components/Header.component.vue'
import Quill, { RangeStatic } from 'quill'
import { editorMixin } from '../mixins/editor.mixin'
import COS from 'cos-js-sdk-v5'
import { httpConfigService } from '../services/http-config.service'
import { cosService } from '../services/cos.service'
import Plyr from 'plyr'

const player = new Plyr('#player')

export interface UploadingProgress {
  loaded: number
  total: number
  speed: number
  percent: number
}

// 初始化实例
const cos = new COS({
  getAuthorization: function(options, callback) {
    // 异步获取临时密钥
    cosService.getCredentials().then(res => {
      const credentials = res.data.content
      console.log('TCL: credentials', credentials)

      if (credentials) {
        callback({
          TmpSecretId: credentials.tmpSecretId,
          TmpSecretKey: credentials.tmpSecretKey,
          XCosSecurityToken: credentials.sessionToken,
          ExpiredTime: 36000000000
        })
      } else {
        console.log('无法获取 cos credentials')
      }
    })
  }
})

const ARTICLE_TEXT_HOLDER = '这里添加文章的内容...'

export default Vue.extend({
  mixins: [editorMixin],
  data: function() {
    return {
      title: '',
      cover: 'https://picsum.photos/id/68/536/354',
      editor: {} as Quill,
      articleHtml: ARTICLE_TEXT_HOLDER,
      // articleHtml: '',
      previewMode: false,
      currentSelection: null as RangeStatic,
      insertingImageMenu: false,
      selectedFile: null as any,
      uploadingProgress: 0,
      uploadingDialog: false,
      imageUrl: ''
    }
  },
  components: {
    Header
  },
  methods: {
    goBack() {
      this.$router.back()
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
    },
    startInsertImage() {
      const that: any = this
      this.saveCurrentSelection()

      if (!this.currentSelection) {
        return
      }

      that.$refs.imageInput.click()

      // that.insertImage(
      //   'http://img0.imgtn.bdimg.com/it/u=2577464539,3482866209&fm=26&gp=0.jpg',
      //   this.currentSelection
      // )
    },
    onFileChanged(event) {
      const that: any = this
      this.selectedFile = event.target.files[0]
      console.log('TCL: onFileChanged -> this.selectedFile', this.selectedFile)

      if (!this.selectedFile) {
        return
      }

      this.uploadingDialog = true

      cos.putObject(
        {
          Bucket: 'img-1259347239' /* 必须 */,
          Region: 'ap-chengdu' /* 必须 */,
          Key: '/demo/' + this.selectedFile.name /* 必须 */,
          StorageClass: 'STANDARD',
          Body: this.selectedFile, // 上传文件对象
          onProgress: (progressData: UploadingProgress) => {
            console.log(JSON.stringify(progressData))

            this.uploadingProgress = progressData.percent * 100
          }
        },
        (err, data) => {
          console.log('TCL: onFileChanged -> data', data)
          console.log('TCL: onFileChanged -> err', err)

          this.uploadingDialog = false

          this.imageUrl =
            'https://img-1259347239.cos.ap-chengdu.myqcloud.com' +
            '/demo/' +
            this.selectedFile.name

          if (data) {
            that.insertImage(this.imageUrl, this.currentSelection)
          }
        }
      )
    },
    _removeFormat() {
      const that: any = this
      this.saveCurrentSelection()
      that.removeFormat(this.currentSelection)
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

    setTimeout(() => {
      this.editor.clipboard.dangerouslyPasteHTML(
        null,
        `<video
      
      id="player"
      playsinline
      controls
    >
      <source src="/demo.mp4" type="video/mp4" />
    

    
    </video>`
      )
    }, 2000)
  }
})
</script>

<style lang="scss" scoped>
.preview {
  width: 80%;
}

#editor {
  min-height: 150px;
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
.no-color-sample {
  background-color: white;
}

.insert-image-url {
  width: 100%;
}

.v-progress-linear {
  border-radius: 0px !important;
}
</style>
