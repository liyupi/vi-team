const teamMemberAddUrl = '/teamMember/add';//向用户发送团队邀请
const teamMemberDeleteUrl = '/teamMember/delete';//团队踢出用户
const teamMemberUpdateUrl = '/teamMember/update';//修改用户职位
const teamMemberDealInvitationUrl = '/teamMember/deal/invitation';//用户处理团队邀请
const teamMemberQuitUrl = '/teamMember/quit';//用户退出团队
const teamMemberGetTeamsUrl = '/teamMember/get/teams';//得到某用户所加入的团队
const teamMemberGetMembersUrl = '/teamMember/get/members';//得到某团队所有的成员

export default {
    getJoinTeam(obj) {
        let userId = obj.$store.state.userId;
        let token = obj.$cookie.get('token');
        let page = obj.currPage;
        let limit = 6;
        obj.$http.post(teamMemberGetTeamsUrl, {
            memberId: userId,
            status: 1,
            token, page, limit
        })
            .then(res => {
                let data = res.data;
                switch (data.code) {
                    case 0:
                        obj.$store.commit('setJoinTeam', data);
                        break;
                    case 2:
                        this.loginTimeout(obj);
                        break;
                    case 4:
                        obj.$message('没有更多了');
                        break;
                    default:
                        obj.$message({
                            message: '请求异常',
                            type: 'error'
                        });
                }
            })
            .catch(err => {
                obj.$message("请求失败")
            });
    },
    getJoinTeamList(obj) {
        let userId = obj.$store.state.userId;
        let token = obj.$cookie.get('token');
        let page = 0;
        let limit = 0;
        obj.$http.post(teamMemberGetTeamsUrl, {
            memberId: userId,
            status: 1,
            token, page, limit
        })
            .then(res => {
                let data = res.data;
                switch (data.code) {
                    case 0:
                        obj.$store.commit('setJoinTeam', data);
                        break;
                    case 2:
                        this.loginTimeout(obj);
                        break;
                    case 4:
                        obj.$message('没有更多了');
                        break;
                    default:
                        obj.$message({
                            message: '请求异常',
                            type: 'error'
                        });
                }
            })
            .catch(err => {
                obj.$message("请求失败")
            });
    },
    getTeamMember(obj) {
        let teamId = obj.activeTeamId;
        let token = obj.$cookie.get('token');
        let page = obj.currPage;
        let limit = obj.pageSize;
        obj.$http.post(teamMemberGetMembersUrl, {
            teamId, status: 1, token, page, limit
        })
            .then(res => {
                let data = res.data;
                switch (data.code) {
                    case 0:
                        obj.$store.commit('setTeamMember', _.assign({teamId: teamId}, data));
                        break;
                    case 2:
                        this.loginTimeout(obj);
                        break;
                    case 4:
                        obj.$message('没有更多了');
                        break;
                    default:
                        obj.$message({
                            message: '请求异常',
                            type: 'error'
                        });
                }
            })
            .catch(err => {
                obj.$message("请求失败")
            });
    },
    getWillJoinMember(obj) {
        let teamId = obj.activeTeamId;
        let token = obj.$cookie.get('token');
        let page = obj.currPage;
        let limit = obj.pageSize;
        obj.$http.post(teamMemberGetMembersUrl, {
            teamId, status: 0, token, page, limit
        })
            .then(res => {
                let data = res.data;
                switch (data.code) {
                    case 0:
                        obj.$store.commit('setWillJoinMember', _.assign({teamId: teamId}, data));
                        break;
                    case 2:
                        this.loginTimeout(obj);
                        break;
                    case 4:
                        obj.$message('没有更多了');
                        break;
                    default:
                        obj.$message({
                            message: '请求异常',
                            type: 'error'
                        });
                }
            })
            .catch(err => {
                obj.$message("请求失败")
            });
    },
    getTeamInvitation(obj) {
        let memberId = obj.$store.state.userId;
        let token = obj.$cookie.get('token');
        let page = obj.currPage;
        let limit = obj.pageSize;
        obj.$http.post(teamMemberGetTeamsUrl, {
            memberId, status: 0, token, page, limit
        })
            .then(res => {
                let data = res.data;
                switch (data.code) {
                    case 0:
                        obj.$store.commit('setTeamInvitation', data);
                        break;
                    case 2:
                        this.loginTimeout(obj);
                        break;
                    case 4:
                        obj.$message('没有更多了');
                        break;
                    default:
                        obj.$message({
                            message: '请求异常',
                            type: 'error'
                        });
                }
            })
            .catch(err => {
                obj.$message("请求失败")
            });
    },
    addTeamMember(obj) {
        let teamId = obj.activeTeamId;
        let userId = obj.$store.state.userId;
        let memberId = obj.user.userId;
        let token = obj.$cookie.get('token');
        obj.$http.post(teamMemberAddUrl, {
            teamId: teamId,
            memberId: memberId,
            creatorId: userId,
            token: token
        })
            .then(res => {
                let data = res.data;
                switch (data.code) {
                    case 0:
                        obj.$message({
                            message: '邀请成功',
                            type: 'success'
                        });
                        break;
                    case 1:
                        obj.$message({
                            message: '仅有团队创建者有邀请权限',
                            type: 'error'
                        });
                        break;
                    case 2:
                        this.loginTimeout(obj);
                        break;
                    default:
                        obj.$message({
                            message: '请求异常或重复邀请',
                            type: 'error'
                        });
                }
            })
            .catch(err => {
                obj.$message("请求失败")
            });
    },
    updateTeamMember(obj, {row, position}) {
        let teamId = obj.$store.state.teams.activeTeamId;
        let userId = obj.$store.state.userId;
        let memberId = row.userId;
        let token = obj.$cookie.get('token');
        obj.$http.post(teamMemberUpdateUrl, {
            teamId: teamId,
            memberId: memberId,
            userId: userId,
            position: position,
            token: token
        })
            .then(res => {
                let data = res.data;
                switch (data.code) {
                    case 0:
                        obj.$message({
                            message: '操作成功',
                            type: 'success'
                        });
                        row.position = position;
                        break;
                    case 1:
                        obj.$message({
                            message: '仅有团队创建者有该权限',
                            type: 'error'
                        });
                        break;
                    case 2:
                        this.loginTimeout(obj);
                        break;
                    default:
                        obj.$message({
                            message: '请求异常',
                            type: 'error'
                        });
                }
            })
            .catch(err => {
                obj.$message("请求失败")
            });
    },
    deleteTeamMember(obj, row) {
        let teamId = obj.activeTeamId;
        let userId = obj.$store.state.userId;
        let memberId = row.userId;
        let token = obj.$cookie.get('token');
        obj.$http.post(teamMemberDeleteUrl, {
            teamId: teamId,
            memberId: memberId,
            userId: userId,
            token: token
        })
            .then(res => {
                let data = res.data;
                switch (data.code) {
                    case 0:
                        obj.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        obj.teamMember.splice(row);
                        break;
                    case 1:
                        obj.$message({
                            message: '仅有团队创建者有删除权限',
                            type: 'error'
                        });
                        break;
                    case 2:
                        this.loginTimeout(obj);
                        break;
                    default:
                        obj.$message({
                            message: '请求异常',
                            type: 'error'
                        });
                }
            })
            .catch(err => {
                obj.$message("请求失败")
            });
    },
    dealInvitation(obj, index, rows, status) {
        let memberId = obj.$store.state.userId;
        let teamId = rows[index].teamId;
        let token = obj.$cookie.get('token');
        obj.$http.post(teamMemberDealInvitationUrl, {
            teamId, memberId, status, token
        })
            .then(res => {
                let data = res.data;
                switch (data.code) {
                    case 0:
                        if (status === 1) {
                            obj.$message({
                                message: '已接受该邀请',
                                type: 'success'
                            });
                        } else if (status === 2) {
                            obj.$message({
                                message: '已拒绝该邀请',
                                type: 'success'
                            });
                        }
                        rows.splice(index, 1);
                        break;
                    case 1:
                        obj.$message({
                            message: '仅有团队创建者有该权限',
                            type: 'error'
                        });
                        break;
                    case 2:
                        this.loginTimeout(obj);
                        break;
                    default:
                        obj.$message({
                            message: '请求异常',
                            type: 'error'
                        });
                }
            })
            .catch(err => {
                obj.$message("请求失败")
            });
    },
    loginTimeout(obj) {
        obj.$message({
            message: '用户未登录或会话超时',
            type: 'error'
        });
        this.clearLogin(obj);
    },
    clearLogin(obj) {
        obj.$store.commit('setHasLogin', false);
        obj.$store.commit('setUsername', '');
        obj.$store.commit('setUserId', '');
        obj.activeIndex = '0';
        obj.$cookie.delete('userId');
        obj.$cookie.delete('username');
        obj.$cookie.delete('token');
        obj.$router.push({path: '/'});
    }
}
