const infoAddUrl = '/info/add';//在某个团队发布通知
const infoGetByTeamUrl = '/info/get/team';//根据状态得到某个团队所有的通知
const infoUpdateUrl = '/info/update';//更新某通知
const infoDeleteUrl = '/info/delete';//删除某通知

export default {
    getTeamInfoStatus0(obj) {
        let teamId = obj.activeTeamId;
        let token = obj.$cookie.get('token');
        let page = obj.currPage;
        let limit = obj.pageSize;
        obj.$http.post(infoGetByTeamUrl, {teamId, status: 0, token,page,limit})
            .then(res => {
                let data = res.data;
                switch (data.code) {
                    case 0:
                        obj.$store.commit('setInfoStatus0', data);
                        break;
                    case 2:
                        this.loginTimeout(obj);
                        break;
                    case 4:
                        obj.$message('该团队暂无未发布通知');
                        obj.$store.commit('setInfoStatus0', null);
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
    getTeamInfoStatus1(obj) {
        let teamId = obj.activeTeamId;
        let token = obj.$cookie.get('token');
        let page = obj.currPage;
        let limit = obj.pageSize;
        obj.$http.post(infoGetByTeamUrl, {teamId, status: 1, token,page,limit})
            .then(res => {
                let data = res.data;
                switch (data.code) {
                    case 0:
                        obj.$store.commit('setInfoStatus1', data);
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
    getTeamInfoTimeout(obj) {
        let teamId = obj.activeTeamId;
        let token = obj.$cookie.get('token');
        let page = obj.currPage;
        let limit = obj.pageSize;
        obj.$http.post(infoGetByTeamUrl, {teamId, status: 3, token,page,limit})
            .then(res => {
                let data = res.data;
                switch (data.code) {
                    case 0:
                        obj.$store.commit('setInfoTimeout', data);
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
    addTeamInfo(obj) {
        let token = obj.$cookie.get('token');
        let teamId = obj.activeTeamId;
        obj.$http.post(infoAddUrl, _.assign(obj.form, {token, teamId}))
            .then(res => {
                let data = res.data;
                switch (data.code) {
                    case 0:
                        obj.$message({
                            message: '新建成功',
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
    publishInfo(obj, index, row) {
        let token = obj.$cookie.get('token');
        let infoId = row.infoId;
        obj.$http.post(infoUpdateUrl, {token, status: 1, infoId})
            .then(res => {
                let data = res.data;
                switch (data.code) {
                    case 0:
                        obj.$message({
                            message: '发布成功',
                            type: 'success'
                        });
                        obj.infoStatus0.splice(index, 1);
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
    updateTeamInfo(obj) {
        let token = obj.$cookie.get('token');
        obj.$http.post(infoUpdateUrl, _.assign(_.omit(obj.updateForm,'publishTime'), {token}))
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
    deleteTeamInfo(obj, index, rows) {
        let infoId = rows[index].infoId;
        let token = obj.$cookie.get('token');
        obj.$http.post(infoDeleteUrl, {
            infoId, token
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
