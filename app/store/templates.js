import firebase from '~/plugins/firebase'
const db = firebase.firestore()

const templatesRef = db.collection('templates')

export const state = () => ({
  templates: [],
  editMode: false,
  templateLabel: '',
  selectedTemplateId: ''
})

export const mutations = {
  addTemplate(state, payload) {
    state.templates.push(payload)
  },
  setTemplate(state, payload) {
    state.templates.push(payload)
  },
  clearTemplates(state) {
    state.templates = []
  },
  setEditMode(state, payload) {
    state.editMode = payload
  },
  setTemplateLabel(state, payload) {
    state.templateLabel = payload
  },
  setSelectedTemplateId(state, payload) {
    state.selectedTemplateId = payload
  }
}

export const actions = {
  addTemplates({ commit, dispatch, state }, templateData) {
    const templateIds = []
    state.templates.forEach(template => {
      templateIds.push(template.id)
    })
    const maxTemplateId = Math.max(...templateIds)

    if (templateData.label === '') {
      templateData.label = 'template' + (parseInt(maxTemplateId) + 1)
    }
    templatesRef
      .add({
        userId: templateData.uid,
        accounts: templateData.accounts,
        estimateTime: templateData.estimateTime,
        label: templateData.label,
        id: parseInt(maxTemplateId) + 1
      })
      .then(function(docRef) {
        console.log('success')

        commit('clearTemplates')
        dispatch('fetchTemplates', templateData.uid)
      })
      .catch(function(error) {
        console.error('Error adding document: ', error)
      })
  },
  updateTemplates({ commit, dispatch, state }, templateData) {
    const templateIds = []
    state.templates.forEach(template => {
      templateIds.push(parseInt(template.id))
    })
    const maxTemplateId = Math.max(...templateIds)

    if (templateData.label === '') {
      templateData.label = 'template' + (parseInt(maxTemplateId) + 1)
    }

    templatesRef
      .doc(templateData.docId)
      .update({
        userId: templateData.uid,
        accounts: templateData.accounts,
        estimateTime: templateData.estimateTime,
        label: templateData.label,
        id: parseInt(maxTemplateId) + 1
      })
      .then(function(docRef) {
        console.log('success')

        commit('clearTemplates')
        dispatch('fetchTemplates', templateData.uid)
      })
      .catch(function(error) {
        console.error('Error adding document: ', error)
      })
  },
  fetchTemplates({ commit }, userId) {
    templatesRef
      .where('userId', '==', userId)
      .orderBy('id', 'asc')
      .get()
      .then(res => {
        res.forEach(doc => {
          console.log('success : ' + `${doc.id}`)

          const template = doc.data()
          template.docId = doc.id

          commit('setTemplate', template)
          return true
        })
      })
      .catch(error => {
        console.log('error : ' + error)
        return false
      })
  },
  setEditMode({ commit }, editModeFlg) {
    commit('setEditMode', editModeFlg)
  },
  setTemplateLabel({ commit }, templateLabel) {
    commit('setTemplateLabel', templateLabel)
  },
  setSelectedTemplateId({ commit }, selectedTemplateId) {
    commit('setSelectedTemplateId', selectedTemplateId)
  }
}

export const getters = {
  getTemplates(state) {
    return state.templates
  },
  getEditMode(state) {
    return state.editMode
  },
  getTemplateLabel(state) {
    return state.templateLabel
  },
  getSelectedTemplateId(state) {
    return state.selectedTemplateId
  }
}
