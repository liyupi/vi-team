import teamApi from '@/api/teamApi'
import teamMemberApi from '@/api/teamMemberApi'

const state = {
    createTeam: '',
    joinTeam: '',
    createTeamDetail: '',
    teamMember: [],
    willJoinMember: [],
    teamInvitation: [],
    total: 0,
    activeTeamId: null,
    activeJoinId: null
};
const getters = {};
const actions = {
    getCreateTeam(state, obj) {
        teamApi.getCreateTeam(obj);
    },
    getJoinTeam(state, obj) {
        teamMemberApi.getJoinTeam(obj)
    },
    getCreateTeamDetail(state, obj) {
        teamApi.getCreateTeamDetail(obj);
    },
    getTeamMember(state, obj) {
        teamMemberApi.getTeamMember(obj)
    },
    getWillJoinMember(state, obj) {
        teamMemberApi.getWillJoinMember(obj)
    },
    getTeamInvitation(state, obj) {
        teamMemberApi.getTeamInvitation(obj)
    },
    getJoinTeamList(state, obj) {
        teamMemberApi.getJoinTeamList(obj)
    }
};
const mutations = {
    setCreateTeamDetail(state, data) {
        if (data) {
            state.createTeamDetail = _.map(data.teamList, function (team) {
                let date = new Date(team.createDate);
                let month = date.getMonth() + 1;
                let day = date.getDate();
                team.createDate = date.getFullYear() + "-" + (month < 10 ? "0" + month : month) + "-" + (day < 10 ? "0" + day : day);
                return team;
            });
            state.total = data.total;
        } else {
            state.createTeamDetail = [];
            state.total = 0;
        }

    },
    setJoinTeam(state, data) {
        if (data) {
            state.joinTeam = _.map(data.teamList, function (team) {
                let date = new Date(team.joinDate);
                let month = date.getMonth() + 1;
                let day = date.getDate();
                team.joinDate = date.getFullYear() + "-" + (month < 10 ? "0" + month : month) + "-" + (day < 10 ? "0" + day : day);
                return team;
            });
            state.total = data.total;
        } else {
            state.joinTeam = [];
            state.total = 0;
        }
    },
    setCreateTeam(state, data) {
        state.createTeam = data.teamList;
    },
    setTeamMember(state, data) {
        if (data) {
            state.teamMember = _.map(data.userList, function (member) {
                let date = new Date(member.joinDate);
                let month = date.getMonth() + 1;
                let day = date.getDate();
                member.joinDate = date.getFullYear() + "-" + (month < 10 ? "0" + month : month) + "-" + (day < 10 ? "0" + day : day);
                return member;
            });
            state.total = data.total;
        } else {
            state.teamMember = [];
            state.total = 0;
        }
    },
    setWillJoinMember(state, data) {
        if (data) {
            state.willJoinMember = _.map(data.userList, function (member) {
                let date = new Date(member.inviteDate);
                let month = date.getMonth() + 1;
                let day = date.getDate();
                member.inviteDate = date.getFullYear() + "-" + (month < 10 ? "0" + month : month) + "-" + (day < 10 ? "0" + day : day);
                return member;
            });
            state.total = data.total;
        } else {
            state.willJoinMember = [];
            state.total = 0;
        }
    },
    setTeamInvitation(state, data) {
        if (data) {
            state.teamInvitation = _.map(data.teamList, function (team) {
                let date = new Date(team.inviteDate);
                let month = date.getMonth() + 1;
                let day = date.getDate();
                team.inviteDate = date.getFullYear() + "-" + (month < 10 ? "0" + month : month) + "-" + (day < 10 ? "0" + day : day);
                return team;
            });
            state.total = data.total;
        } else {
            state.teamInvitation = [];
            state.total = 0;
        }
    },
    setActiveTeamId(state, val) {
        state.activeTeamId = val;
    },
    setActiveJoinId(state, val) {
        state.activeJoinId = val;
    }
};


export default {
    state,
    actions,
    getters,
    mutations
}
