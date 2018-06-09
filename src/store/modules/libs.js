import libApi from '@/api/libApi'
import utils from '@/utils/utils'

const state = {
    libStatus0: [],
    libStatus1: [],
    activeLibId: null,
    total: 0
};
const getters = {};
const actions = {
    getLibStatus0(state, obj) {
        libApi.getTeamLibStatus0(obj)
    },
    getLibStatus1(state, obj) {
        libApi.getTeamLibStatus1(obj);
    }
};
const mutations = {
    setLibStatus0(state, data) {
        if (data) {
            state.libStatus0 = _.map(data.libList, function (lib) {
                lib.createDate = utils.toDateStr(lib.createDate);
                return lib;
            });
            state.total = data.total;
        } else {
            state.libStatus0 = [];
            state.total = 0;
        }
    },
    setLibStatus1(state, data) {
        if (data) {
            state.libStatus1 = _.map(data.libList, function (lib) {
                lib.createDate = utils.toDateStr(lib.createDate);
                return lib;
            });
            state.total = data.total;
        } else {
            state.libStatus1 = [];
            state.total = 0;
        }
    },
    setActiveLibId(state, val) {
        state.activeLibId = val;
    }
};


export default {
    state,
    actions,
    getters,
    mutations
}
