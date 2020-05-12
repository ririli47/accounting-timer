<template>
  <div>
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item" href="/">
          <img src="../static/logo.png" alt="METEOR" />
        </a>
      </div>
      <div id="navbarBasicExample" class="navbar-menu">
        <div class="navbar-end">
          <div v-if="getIsLogin" class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link"> {{ getUser.displayName }} </a>
            <div class="navbar-dropdown is-right">
              <div
                v-for="template in getTemplates"
                :key="template.docId"
                class="template-menu"
              >
                <a
                  class="navbar-item template-label"
                  @click="setTemplate(template.docId)"
                  >{{ template.label }}
                </a>
                <p class="template-text" @click="setTemplate(template.docId)">
                  を読み込む
                </p>
                <a
                  class="button is-light is-info template-edit"
                  @click="editTemplate(template.docId)"
                  >Edit</a
                >
                <a
                  class="button is-light is-danger template-delete"
                  @click="openModal(template.docId)"
                  >Delete</a
                >
              </div>
              <hr class="navbar-divider" />
              <nuxt-link :to="{ path: '/templates' }" class="navbar-item"
                >お気に入り設定を登録する</nuxt-link
              >
            </div>
          </div>
          <div class="navbar-item">
            <div v-if="!getIsLogin" class="buttons">
              <a class="button is-light is-primary" @click="signIn">
                <strong>SignIn</strong>
              </a>
            </div>
            <div v-else class="buttons">
              <a class="button is-light is-primary" @click="signOut">
                <strong>SignOut</strong>
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <nuxt />
    <div id="delete-modal" class="modal">
      <div class="modal-background" @click="closeModal"></div>
      <div class="modal-content">
        <div class="box">
          本当に削除しますか？<br />
          テンプレート名： {{ getTemplateLabel }}

          <div class="buttons">
            <a class="button is-light is-primary is-right" @click="closeModal">
              <strong>キャンセル</strong>
            </a>
            <a
              class="button is-light is-danger is-right"
              @click="deleteTemplate"
            >
              <strong>削除する</strong>
            </a>
          </div>
        </div>
      </div>
      <button
        class="modal-close is-large"
        aria-label="close"
        @click="closeModal"
      ></button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      getUser: 'getUser',
      getIsLogin: 'getIsLogin',
      getTemplates: 'templates/getTemplates',
      getTemplateLabel: 'templates/getTemplateLabel',
      getSelectedTemplateId: 'templates/getSelectedTemplateId'
    })
  },
  methods: {
    async signIn() {
      try {
        console.log('starting...')
        await this.$store.dispatch('googleSignIn')
        console.log('loading...')

        const user = this.$store.getters.getUser

        if (user != null) {
          this.$store.dispatch('setIsLogin', true)

          console.log('logined')

          this.$store.dispatch('templates/fetchTemplates', user.uid)
        } else {
          Error('cannot login')
        }
      } catch (e) {
        console.log(e)
      }
    },
    async signOut() {
      try {
        console.log('starting...')
        await this.$store.dispatch('googleSignOut')
        console.log('logouting...')

        this.$store.dispatch('setIsLogin', false)
      } catch (e) {
        console.log(e)
      }
    },
    setTemplate(templateId) {
      // selectedTemplateId
      this.$store.dispatch('templates/setSelectedTemplateId', templateId)
      const selectedTemplate = this.getTemplates.filter(template => {
        return template.docId === templateId
      })

      // accounts
      let levelNum = 1
      selectedTemplate[0].accounts.forEach(accountNum => {
        const accounts = {
          level: levelNum,
          accountNum: accountNum
        }
        this.$store.dispatch('updateAccountNum', accounts)

        levelNum++
      })

      // estimateTime
      this.$store.dispatch(
        'updateEstimateTime',
        selectedTemplate[0].estimateTime
      )

      // templateLabel
      this.$store.dispatch(
        'templates/setTemplateLabel',
        selectedTemplate[0].label
      )
    },
    editTemplate(templateId) {
      this.setTemplate(templateId)
      this.$store.dispatch('templates/setEditMode', true)

      this.$router.push('/templates')
    },
    deleteTemplate() {
      console.log(this.getSelectedTemplateId)
      this.$store.dispatch(
        'templates/deleteTemplate',
        this.getSelectedTemplateId
      )
      this.closeModal()
    },
    openModal(templateId) {
      // selectedTemplateId
      this.$store.dispatch('templates/setSelectedTemplateId', templateId)
      const selectedTemplate = this.getTemplates.filter(template => {
        return template.docId === templateId
      })

      // templateLabel
      this.$store.dispatch(
        'templates/setTemplateLabel',
        selectedTemplate[0].label
      )

      const modal = document.getElementById('delete-modal')
      modal.classList.add('is-show')
    },
    closeModal() {
      const modal = document.getElementById('delete-modal')
      modal.classList.remove('is-show')
    }
  }
}
</script>

<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}

.template-menu {
  display: flex;
  align-items: center;
  width: 500px;
  margin-bottom: 5px;
}
.template-label {
  width: 40%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-right: 5px;
}
.template-text {
  width: 20%;
  margin-right: 5px;
}
.template-edit {
  width: 20%;
  margin-right: 5px;
}
.template-delete {
  width: 20%;
  margin-right: 5px;
}

.buttons {
  display: flex;
  justify-content: flex-end;
}

.is-show {
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 1;
  visibility: visible;
}
</style>
