const teamCreateUrl = '/team/create';//创建团队
const teamGetCreateDetailUrl = '/team/get/create/detail';//获得某人创建的团队
const teamGetCreateListUrl = '/team/get/create/list';//获得某人创建的团队列表（团队名称和id）
const teamUpdateUrl = '/team/update';//更新团队信息
const teamUploadPicUrl = '/team/upload/pic';//上传团队头像
export default {
    createTeam(obj) {
        let userId = obj.$store.state.userId;
        let token = obj.$cookie.get('token');
        obj.$http.post(teamCreateUrl, _.assign(obj.form, {creatorId: userId, token: token}))
            .then(res => {
                let data = res.data;
                switch (data.code) {
                    case 0:
                        obj.$message({
                            message: '创建成功',
                            type: 'success'
                        });
                        obj.currPage0 = 1;
                        obj.$store.dispatch("getCreateTeam", obj);
                        obj.$emit('closeDialog');
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
    getCreateTeamDetail(obj) {
        let userId = obj.$store.state.userId;
        let token = obj.$cookie.get('token');
        let page = obj.currPage;
        let limit = 6;
        obj.$http.post(teamGetCreateDetailUrl, {userId, token, page, limit})
            .then(res => {
                let data = res.data;
                switch (data.code) {
                    case 0:
                        obj.$store.commit('setCreateTeamDetail', data);
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
    getCreateTeam(obj) {
        let userId = obj.$store.state.userId;
        let token = obj.$cookie.get('token');
        obj.$http.post(teamGetCreateListUrl, {userId, token})
            .then(res => {
                let data = res.data;
                switch (data.code) {
                    case 0:
                        obj.$store.commit('setCreateTeam', data);
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
    updateTeam(obj) {
        let userId = obj.$store.state.userId;
        let token = obj.$cookie.get('token');
        obj.$http.post(teamUpdateUrl, _.assign(_.omit(obj.form, 'createDate'), {creatorId: userId, token: token}))
            .then(res => {
                let data = res.data;
                switch (data.code) {
                    case 0:
                        obj.$message({
                            message: '修改成功',
                            type: 'success'
                        });
                        obj.$emit('closeDialog');
                        break;
                    case 1:
                        obj.$message({
                            message: '仅有团队创建者有修改权限',
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
