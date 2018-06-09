const commitAddUrl = '/commit/add';//为某个知识库添加贡献
const commitGetUrl = '/commit/get';//条件查询贡献（知识库id/用户id）
const commitGetByIdUrl = '/commit/get/id';//条件查询贡献（commitId）
const commitUpdateUrl = '/commit/update';//作者更新贡献
const commitDeleteUrl = '/commit/delete';//作者删除贡献

export default {
    addCommit(obj) {
        let token = obj.$cookie.get('token');
        let libId = obj.activeLibId;
        let committerId = obj.$store.state.userId;
        obj.$http.post(commitAddUrl, _.assign(obj.form, {token, libId, committerId}))
            .then(res => {
                let data = res.data;
                switch (data.code) {
                    case 0:
                        obj.$message({
                            message: '添加成功',
                            type: 'success'
                        });
                        obj.resetForm('form');
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
    getLibCommits(obj) {
        let libId = obj.activeLibId;
        let token = obj.$cookie.get('token');
        let page = obj.currPage0;
        let limit = obj.pageSize0;
        obj.$http.post(commitGetUrl, {libId,token,page,limit})
            .then(res => {
                let data = res.data;
                switch (data.code) {
                    case 0:
                        obj.$store.commit('setLibCommits', data);
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
    getMyCommits(obj) {
        let libId = obj.activeLibId;
        let committerId = obj.$store.state.userId;
        let page = obj.currPage0;
        let limit = obj.pageSize0;
        let token = obj.$cookie.get('token');
        obj.$http.post(commitGetUrl, {libId, committerId, token,page,limit})
            .then(res => {
                let data = res.data;
                switch (data.code) {
                    case 0:
                        obj.$store.commit('setMyCommits', data);
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
    getCommitById(obj, row) {
        let commitId = row.commitId;
        let token = obj.$cookie.get('token');
        obj.$http.post(commitGetByIdUrl, {commitId, token})
            .then(res => {
                let data = res.data;
                switch (data.code) {
                    case 0:
                        obj.showCommit = data.commit;
                        obj.showContentDialog = true;
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
    deleteCommit(obj, index, rows) {
        let commitId = rows[index].commitId;
        let token = obj.$cookie.get('token');
        obj.$http.post(commitDeleteUrl, {
            commitId, token
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
                            message: '该用户没有删除权限',
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
