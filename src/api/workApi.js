const addWorkUrl = '/work/add';//添加某个团队的工作
const getUserWorkUrl = '/work/get/user';//查询某个用户的工作及对应团队id
const getTeamWorkUrl = '/work/get/team';//查询某个团队某个状态的工作
const updateWorkUrl = '/work/update';//更新某项工作信息
const deleteWorkUrl = '/work/delete';//删除某项工作
const assignWorkUrl = '/work/assignWork';//将某个工作分配给该团队员工

export default {
    getTeamWorkStatus0(obj) {
        let teamId = obj.activeTeamId;
        let token = obj.$cookie.get('token');
        let page = obj.currPage || 0;
        let limit = obj.pageSize || 0;
        obj.$http.post(getTeamWorkUrl, {teamId: teamId, status: 0, token: token, page, limit})
            .then(res => {
                let data = res.data;
                switch (data.code) {
                    case 0:
                        obj.$store.commit('setWorkStatus0', data);
                        break;
                    case 2:
                        this.loginTimeout(obj);
                        break;
                    case 4:
                        obj.$message('该团队暂无未分配的工作');
                        obj.$store.commit('setWorkStatus0', null);
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
    getTeamWorkStatus1(obj, workerId) {
        let teamId = obj.activeTeamId;
        let token = obj.$cookie.get('token');
        let page = obj.currPage;
        let limit = obj.pageSize;
        let payload = {teamId: teamId, status: 1, token: token, page, limit};
        if (workerId) {
            payload.workerId = workerId;
        }
        obj.$http.post(getTeamWorkUrl, payload)
            .then(res => {
                let data = res.data;
                switch (data.code) {
                    case 0:
                        obj.$store.commit('setWorkStatus1', data);
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
    getTeamWorkStatus2(obj, workerId) {
        let teamId = obj.activeTeamId;
        let token = obj.$cookie.get('token');
        let page = obj.currPage;
        let limit = obj.pageSize;
        let payload = {teamId: teamId, status: 2, token: token, page, limit};
        if (workerId) {
            payload.workerId = workerId;
        }
        obj.$http.post(getTeamWorkUrl, payload)
            .then(res => {
                let data = res.data;
                switch (data.code) {
                    case 0:
                        obj.$store.commit('setWorkStatus2', data);
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
    getTeamWorkTimeout(obj, workerId) {
        let teamId = obj.activeTeamId;
        let token = obj.$cookie.get('token');
        let page = obj.currPage;
        let limit = obj.pageSize;
        let payload = {teamId: teamId, status: 3, token: token, page, limit};
        if (workerId) {
            payload.workerId = workerId;
        }
        obj.$http.post(getTeamWorkUrl, payload)
            .then(res => {
                let data = res.data;
                switch (data.code) {
                    case 0:
                        obj.$store.commit('setWorkTimeout', data);
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
    addTeamWork(obj) {
        let token = obj.$cookie.get('token');
        let teamId = obj.activeTeamId;
        obj.$http.post(addWorkUrl, _.assign(obj.form, {token, teamId}))
            .then(res => {
                let data = res.data;
                switch (data.code) {
                    case 0:
                        obj.$message({
                            message: '添加成功',
                            type: 'success'
                        });
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
    updateTeamWork(obj) {
        let token = obj.$cookie.get('token');
        obj.$http.post(updateWorkUrl, _.assign(_.omit(obj.updateForm, "finishDate"), {token}))
            .then(res => {
                let data = res.data;
                switch (data.code) {
                    case 0:
                        obj.$message({
                            message: '修改成功',
                            type: 'success'
                        });
                        obj.updateDialog = false;
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
    deleteTeamWork(obj, index, rows) {
        let workId = rows[index].workId;
        let token = obj.$cookie.get('token');
        obj.$http.post(deleteWorkUrl, {
            workId, token
        })
            .then(res => {
                let data = res.data;
                switch (data.code) {
                    case 0:
                        obj.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        rows.splice(index, 1);
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
    assignWork(obj, userId) {
        let token = obj.$cookie.get('token');
        let workId = obj.activeWorkId;
        obj.$http.post(updateWorkUrl, {token, workerId: userId, workId, status: 1})
            .then(res => {
                let data = res.data;
                switch (data.code) {
                    case 0:
                        obj.$message({
                            type: 'success',
                            message: '已分配'
                        });
                        obj.workStatus0.splice(
                            _.findIndex(obj.workStatus0, {workId}), 1
                        );
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
    updateWorkStatus(obj, index, rows, status) {
        let workId = rows[index].workId;
        let token = obj.$cookie.get('token');
        obj.$http.post(updateWorkUrl, {workId, token, status})
            .then(res => {
                let data = res.data;
                switch (data.code) {
                    case 0:
                        obj.$message({
                            message: '操作成功',
                            type: 'success'
                        });
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
