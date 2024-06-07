import {createApp} from 'vue';
import Vuex from 'vuex';

import {auth } from './auth.module'
import {search} from './search.module'

const app = createApp({})
app.use(Vuex)

export default new Vuex.Store({
    modules: {
        auth,search
    }
});