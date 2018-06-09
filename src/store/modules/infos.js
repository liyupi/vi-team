import infoApi from '@/api/infoApi'
import utils from '@/utils/utils'

const state = {
    infoStatus0: [],
    infoStatus1: [],
    infoTimeout: [],
    total: 0
};
const getters = {};
const actions = {
    getInfoStatus0(state, obj) {
        infoApi.getTeamInfoStatus0(obj)
    },
    getInfoStatus1(state, obj) {
        infoApi.getTeamInfoStatus1(obj);
    },
    getInfoTimeout(state, obj) {
        infoApi.getTeamInfoTimeout(obj)
    }
};
const mutations = {
    setInfoStatus0(state, data) {
        if (data) {
            state.infoStatus0 = _.map(data.infoList, function (info) {
                info.publishTime = utils.toDateTimeStr(info.publishTime);
                info.expireTime = utils.toDateTimeStr(info.expireTime);
                return info;
            });
            state.total = data.total;
        } else {
            state.infoStatus0 = [];
            state.total = 0;
        }
    },
    setInfoStatus1(state, data) {
        if (data) {
            state.infoStatus1 = _.map(data.infoList, function (info) {
                info.publishTime = utils.toDateTimeStr(info.publishTime);
                info.expireTime = utils.toDateTimeStr(info.expireTime);
                return info;
            });
            state.total = data.total;
        } else {
            state.infoStatus1 = [];
            state.total = 0;
        }
    },
    setInfoTimeout(state, data) {
        if (data) {
            state.infoTimeout = _.map(data.infoList, function (info) {
                info.publishTime = utils.toDateTimeStr(info.publishTime);
                info.expireTime = utils.toDateTimeStr(info.expireTime);
                return info;
            });
            state.total = data.total;
        } else {
            state.infoTimeout = [];
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
