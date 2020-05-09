import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Amplify, * as AmplifyModules from 'aws-amplify'
import { AmplifyPlugin } from 'aws-amplify-vue'
import config from './config'
import '@aws-amplify/ui-vue'

// bootstrap
import { BootstrapVue } from 'bootstrap-vue'
// Install BootstrapVue
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
// fonts
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrash, faPlus, faMinus, faCheck, faEdit, faUpload } from '@fortawesome/free-solid-svg-icons'
library.add(faTrash, faPlus, faMinus, faCheck, faEdit, faUpload)
Vue.use(BootstrapVue)

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: config.REGION,
    userPoolId: config.USER_POOL_ID,
    identityPoolId: config.IDENTITY_POOL_ID,
    userPoolWebClientId: config.APP_CLIENT_ID
  }
})
Vue.use(AmplifyPlugin, AmplifyModules)

Vue.config.productionTip = false
new Vue({
  AmplifyPlugin,
  AmplifyModules,
  router,
  render: h => h(App)
}).$mount('#app')
