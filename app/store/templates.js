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
  },
  deleteTemplate(state, payload) {
    state.templates = state.templates.filter(template => {
      return template.docId !== payload
    })
  }
}

export const actions = {
  addTemplates({ commit, dispatch, state }, templateData) {
    const templateIds = []
    state.templates.forEach(template => {
      templateIds.push(template.id)
    })
    let maxTemplateId = 0
    if (templateIds.length !== 0) {
      maxTemplateId = Math.max(...templateIds)
    }

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
    let maxTemplateId = 0
    if (templateIds.length !== 0) {
      maxTemplateId = Math.max(...templateIds)
    }

    if (templateData.label === '') {
      templateData.label = 'template' + (parseInt(maxTemplateId) + 1)
    }

    const editingTemplate = state.templates.filter(template => {
      return template.docId === templateData.docId
    })

    templatesRef
      .doc(templateData.docId)
      .update({
        userId: templateData.uid,
        accounts: templateData.accounts,
        estimateTime: templateData.estimateTime,
        label: templateData.label,
        id: editingTemplate[0].id
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
  deleteTemplate({ commit }, templateId) {
    templatesRef
      .doc(templateId)
      .delete()
      .then(function(docRef) {
        console.log('success')

        commit('deleteTemplate', templateId)
      })
      .catch(function(error) {
        console.error('Error adding document: ', error)
      })
  },
  fetchTemplates({ commit }, userId) {
    return new Promise(resolve => {
      templatesRef
        .where('userId', '==', userId)
        .orderBy('id', 'asc')
        .get()
        .then(res => {
          res.forEach(doc => {
            const template = doc.data()
            template.docId = doc.id
            commit('setTemplate', template)
            // return true
          })
          resolve(true)
        })
        .catch(error => {
          console.log('error : ' + error)
          resolve(false)
        })
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
  },
  clearTemplates({ commit }) {
    commit('clearTemplates')
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
