import utils from '@/utils/utils.js'

const addLibUrl = '/lib/add';//为某个团队创建知识库
const getLibByTeamUrl = '/lib/get/team';//获得某个团队的所有知识库
const getLibByLibIdUrl = '/lib/get/libId';//根据libId获得单个lib的信息
const updateLibUrl = '/lib/update';//更新
const deleteLibUrl = '/lib/delete';//删除某个团队的知识库

export default {
    getTeamLibStatus0(obj) {
        let teamId = obj.activeTeamId;
        let token = obj.$cookie.get('token');
        let page = obj.currPage || 0;
        let limit = obj.pageSize || 0;
        obj.$http.post(getLibByTeamUrl, {teamId, status: 0, token, page, limit})
            .then(res => {
                let data = res.data;
                switch (data.code) {
                    case 0:
                        obj.$store.commit('setLibStatus0', data);
                        break;
                    case 2:
                        this.loginTimeout(obj);
                        break;
                    case 4:
                        obj.$message('该团队暂无知识库');
                        obj.$store.commit('setLibStatus0', null);
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
    getTeamLibStatus1(obj) {
        let teamId = obj.activeTeamId;
        let token = obj.$cookie.get('token');
        let page = obj.currPage;
        let limit = obj.pageSize;
        obj.$http.post(getLibByTeamUrl, {teamId, status: 1, token, page, limit})
            .then(res => {
                let data = res.data;
                switch (data.code) {
                    case 0:
                        obj.$store.commit('setLibStatus1', data);
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
    getLibByLibId(obj) {
        let libId = obj.activeLibId;
        let token = obj.$cookie.get('token');
        obj.$http.post(getLibByLibIdUrl, {libId, token})
            .then(res => {
                let data = res.data;
                switch (data.code) {
                    case 0:
                        data.lib.createDate = utils.toDateStr(data.lib.createDate);
                        obj.libInfo = data.lib;
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
    addTeamLib(obj) {
        let token = obj.$cookie.get('token');
        let teamId = obj.activeTeamId;
        obj.$http.post(addLibUrl, _.assign(obj.form, {token, teamId}))
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
    updateTeamLib(obj) {
        let token = obj.$cookie.get('token');
        obj.$http.post(updateLibUrl, _.assign(_.omit(obj.updateForm, "createDate"), {token}))
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
    updateTeamLibStatus(obj, index, rows, status) {
        let libId = rows[index].libId;
        let token = obj.$cookie.get('token');
        obj.$http.post(updateLibUrl, {libId, token, status})
            .then(res => {
                let data = res.data;
                switch (data.code) {
                    case 0:
                        if (status === 0) {
                            obj.$message({
                                message: '还原成功',
                                type: 'success'
                            });
                        } else {
                            obj.$message({
                                message: '删除成功，已放入回收站',
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
    deleteTeamLib(obj, index, rows) {
        let libId = rows[index].libId;
        let token = obj.$cookie.get('token');
        obj.$http.post(deleteLibUrl, {
            libId, token
        })
            .then(res => {
                let data = res.data;
                switch (data.code) {
                    case 0:
                        obj.$message({
                            message: '彻底删除成功',
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

