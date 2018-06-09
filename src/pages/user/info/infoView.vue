<template>
    <div>
        <el-container>
            <el-header class="header-title" height="40px">个人信息</el-header>
            <el-main>
                <el-row>
                    <el-col :span="4">账号</el-col>
                    <el-col :span="20">{{form.userId}}</el-col>
                </el-row>
                <el-row>
                    <el-col :span="4">昵称</el-col>
                    <el-col :span="20">{{form.username}}</el-col>
                </el-row>
                <el-row>
                    <el-col :span="4">姓名</el-col>
                    <el-col :span="20">{{form.realname}}</el-col>
                </el-row>
                <el-row>
                    <el-col :span="4">身份</el-col>
                    <el-col :span="20">{{form.identity}}</el-col>
                </el-row>
                <el-row>
                    <el-col :span="4">性别</el-col>
                    <el-col :span="20">{{form.sex}}</el-col>
                </el-row>
                <el-row>
                    <el-col :span="4">年龄</el-col>
                    <el-col :span="20">{{form.age}}</el-col>
                </el-row>
                <el-row>
                    <el-col :span="4">手机</el-col>
                    <el-col :span="20">{{form.telnum}}</el-col>
                </el-row>
                <el-row>
                    <el-col :span="4">签名</el-col>
                    <el-col :span="20">{{form.signature}}</el-col>
                </el-row>
                <el-row>
                    <el-col :span="4">注册日期</el-col>
                    <el-col :span="20">{{registerDate}}</el-col>
                </el-row>
            </el-main>
        </el-container>
    </div>
</template>

<script>


    export default {
        name: "infoView",
        data() {
            return {
                form: {
                    userId: '',
                    username: '',
                    realname: '',
                    identity: '',
                    sex: '',
                    age: '',
                    telnum: '',
                    signature: '',
                    registerDate: ''
                }
            }
        },
        computed: {
            registerDate() {
                if (this.form.registerDate) {
                    let date = new Date(this.form.registerDate);
                    return date.getFullYear() + ' 年 ' + (date.getMonth() + 1) + ' 月 ' + date.getDate() + ' 日';
                } else {
                    return '';
                }
            }
        },
        activated() {
            this.$api.userApi.userGetInfo(this);
        }
    }
</script>

<style scoped>
    .el-row {
        margin-bottom: 25px;
        color: #606266;
        font-size: 15px;
        line-height: 1.5;
    }
</style>
