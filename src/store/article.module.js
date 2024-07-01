import ArticleSvc from '../services/article-service';

export const article = {
    namespaced : true,
    state: {
        articles: [],
        status: {},
    },
    actions : {
        fetchArticles({commit}, loginId, pageNo){
            commit('fetchArticlesRequest');
            return ArticleSvc.fetchArticles(loginId, pageNo).then(
                response => {
                    commit('fetchArticlesSuccess', response.data);
                    return Promise.resolve(response.data);
                },
                error => {
                    commit('fetchArticlesFailure');
                    return Promise.reject(error);
                }
            )
        }
    },
    mutations : {
        fetchArticlesRequest(state) {
            state.status = { fetching: true };
        },
        fetchArticlesSuccess(state, articles){
            state.status = { fetching: false };
            state.articles = articles;
        },
        fetchArticlesFailure(state) {
            state.status = { fetching: false };
        },
    },
    getters: {
        allArticles: state => state.articles,
        fetchStatus: state => state.status,
    },

}