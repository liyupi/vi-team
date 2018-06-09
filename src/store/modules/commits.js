import commitApi from '@/api/commitApi'
import utils from '@/utils/utils'

const state = {
    libCommits: [],
    myCommits: [],
    total: 0
};
const getters = {};
const actions = {
    getLibCommits(state, obj) {
        commitApi.getLibCommits(obj)
    },
    getMyCommits(state, obj) {
        commitApi.getMyCommits(obj)
    }
};
const mutations = {
    setLibCommits(state, data) {
        if (data) {
            state.libCommits = _.map(data.commitList, function (commit) {
                commit.commitTime = utils.toDateTimeStr(commit.commitTime);
                return commit;
            });
            state.total = data.total;
        } else {
            state.libCommits = [];
            state.total = 0;
        }
    },
    setMyCommits(state, data) {
        if (data) {
            state.myCommits = _.map(data.commitList, function (commit) {
                commit.commitTime = utils.toDateTimeStr(commit.commitTime);
                return commit;
            });
            state.total = data.total;
        } else {
            state.myCommits = [];
            state.total = 0;
        }
    }
};


export default {
    state,
    actions,
    getters,
    mutations
}
