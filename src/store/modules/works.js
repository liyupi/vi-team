import workApi from '@/api/workApi'
import utils from '@/utils/utils'

const state = {
    workStatus0: [],
    workStatus1: [],
    workStatus2: [],
    workTimeout: [],
    total: 0,
    activeWorkId: null
};
const getters = {};
const actions = {
    getWorkStatus0(state, obj) {
        workApi.getTeamWorkStatus0(obj)
    },
    getWorkStatus1(state, {obj, workerId}) {
        workApi.getTeamWorkStatus1(obj, workerId)
    },
    getWorkStatus2(state, {obj, workerId}) {
        workApi.getTeamWorkStatus2(obj, workerId)
    },
    getWorkTimeout(state, {obj, workerId}) {
        workApi.getTeamWorkTimeout(obj, workerId)
    }
};
const mutations = {
    setWorkStatus0(state, data) {
        if (data) {
            state.workStatus0 = _.map(data.workList, function (work) {
                work.startDate = utils.toDateStr(work.startDate);
                work.planStartDate = utils.toDateStr(work.planStartDate);
                work.endDate = utils.toDateStr(work.endDate);
                return work;
            });
            state.total = data.total;
        } else {
            state.workStatus0 = [];
            state.total = 0;
        }
    },
    setWorkStatus1(state, data) {
        if (data) {
            state.workStatus1 = _.map(data.workList, function (work) {
                work.startDate = utils.toDateStr(work.startDate);
                work.planStartDate = utils.toDateStr(work.planStartDate);
                work.endDate = utils.toDateStr(work.endDate);
                return work;
            });
            state.total = data.total;

        } else {
            state.workStatus1 = [];
            state.total = 0;
        }
    },
    setWorkStatus2(state, data) {
        if (data) {
            state.workStatus2 = _.map(data.workList, function (work) {
                work.startDate = utils.toDateStr(work.startDate);
                work.planStartDate = utils.toDateStr(work.planStartDate);
                work.endDate = utils.toDateStr(work.endDate);
                work.finishDate = utils.toDateStr(work.finishDate);
                return work;
            });
            state.total = data.total;
        } else {
            state.workStatus2 = [];
            state.total = 0;
        }
    },
    setWorkTimeout(state, data) {
        if (data) {
            state.workTimeout = _.map(data.workList, function (work) {
                work.startDate = utils.toDateStr(work.startDate);
                work.planStartDate = utils.toDateStr(work.planStartDate);
                work.endDate = utils.toDateStr(work.endDate);
                return work;
            });
            state.total = data.total;
        } else {
            state.workTimeout = [];
            state.total = 0;
        }
    },
    setActiveWorkId(state, val) {
        state.activeWorkId = val;
    }
};


export default {
    state,
    actions,
    getters,
    mutations
}
