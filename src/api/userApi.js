const userLoginUrl = '/user/login';//用户登录
const userChangePasswordUrl = '/user/changePassword';//修改密码
const userRegisterUrl = '/user/register';//用户注册
const userLogoutUrl = '/user/logout';//用户注销
const userUpdateUrl = '/user/update';//更新用户
const userGetInfoUrl = '/user/getInfo';//获取用户个人信息
const userSearchUrl = '/user/search';//查找用户
export default {
    userLogin(obj) {
        obj.$http.post(userLoginUrl, obj.loginForm)
            .then(res => {
                let data = res.data;
                let user = data.user;
                switch (data.code) {
                    case 0:
                        obj.$message({
                            message: '登录成功',
                            type: 'success'
                        });
                        obj.$store.commit('setUserId', user.userId);
                        obj.$store.commit('setUsername', user.username);
                        obj.$store.commit('setHasLogin', true);
                        obj.$cookie.set('userId', user.userId);
                        obj.$cookie.set('username', user.username);
                        obj.$cookie.set('token', data.token);
                        obj.$emit('closeDialog');
                        break;
                    case 2:
                        obj.$message({
                            message: '账号或密码错误',
                            type: 'error'
                        });
                        break;
                    default:
                        obj.$message({
                            message: '请求异常',
                            type: 'error'
                        });
                }
            })
            .catch(err => {
                obj.$message("请求失败");
            });
    },
    userLogout(obj) {
        var token = obj.$cookie.get('token');
        obj.$http.post(userLogoutUrl, {userId: obj.userId, token: token})
            .then(res => {
                var data = res.data;
                switch (data.code) {
                    case 0:
                        obj.$message({
                            message: '注销成功',
                            type: 'success'
                        });
                        break;
                    case 2:
                        obj.$message({
                            message: '用户未登录或会话超时',
                            type: 'error'
                        });
                        break;
                    default:
                        obj.$message({
                            message: '请求异常',
                            type: 'error'
                        });
                }
                this.clearLogin(obj);
            }).catch(err => {
            obj.$message("请求失败");
            this.clearLogin(obj);
        });
    },
    userChangePassword(obj) {
        obj.$http.post(userChangePasswordUrl, obj.changePasswordForm)
            .then(res => {
                var data = res.data;
                switch (data.code) {
                    case 0:
                        obj.$message({
                            message: '修改成功',
                            type: 'success'
                        });
                        obj.$emit('switchDialog', 0);
                        break;
                    case 2:
                        obj.$message({
                            message: '账号或密码错误',
                            type: 'error'
                        });
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
    userRegister(obj) {
        obj.$http.post(userRegisterUrl, obj.registerForm)
            .then(res => {
                var data = res.data;
                switch (data.code) {
                    case 0:
                        obj.$message({
                            message: '注册成功',
                            type: 'success'
                        });
                        obj.$emit('switchDialog', 0);
                        break;
                    case 2:
                        obj.$message({
                            message: '该账号已被注册',
                            type: 'error'
                        });
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
    userUpdate(obj) {
        var token = obj.$cookie.get('token');
        obj.$http.post(userUpdateUrl, _.assign(obj.form, {token: token}))
            .then(res => {
                var data = res.data;
                switch (data.code) {
                    case 0:
                        obj.$message({
                            message: '修改成功',
                            type: 'success'
                        });
                        obj.$store.commit('setUsername', obj.form.username);
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
    userGetInfo(obj) {
        var userId = obj.$store.state.userId;
        var token = obj.$cookie.get('token');
        obj.$http.post(userGetInfoUrl, {userId: userId, token: token})
            .then(res => {
                var data = res.data;
                switch (data.code) {
                    case 0:
                        obj.form = _.pick(data.user, _.keys(obj.form));
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
    searchUser(obj) {
        var userId = obj.inviteId;
        var token = obj.$cookie.get('token');
        obj.$http.post(userSearchUrl, {userId: userId, token: token})
            .then(res => {
                var data = res.data;
                switch (data.code) {
                    case 0:
                        obj.user = data.user;
                        break;
                    case 2:
                        this.loginTimeout(obj);
                        break;
                    case 4:
                        obj.$message("该用户不存在");
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
