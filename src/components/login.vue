<template>
    <div id="login">
        <el-form :model="loginForm" label-width="60px" :rules="rules" ref="loginForm" class="loginForm">
            <el-form-item label="账号" prop="userId">
                <el-input v-model="loginForm.userId" placeholder="请输入6-10位数字"
                          @keyup.enter.native="submitForm('loginForm')">
                    <el-button slot="append" @click="$emit('switchDialog',1)">注册</el-button>
                </el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="loginForm.password" type="password" auto-complete="off" placeholder="请输入密码"
                          @keyup.enter.native="submitForm('loginForm')">
                    <el-button slot="append" @click="$emit('switchDialog',2)">修改</el-button>
                </el-input>
            </el-form-item>
            <el-form-item class="marginTop">
                <el-button type="primary" @click="submitForm('loginForm')" id="loginSubmit">登录</el-button>
                <el-button @click="resetForm('loginForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>


    export default {
        name: 'login',
        data() {
            return {
                loginForm: {
                    userId: '',
                    password: ''
                },
                rules: {
                    userId: [
                        {required: true, message: '请输入账号', trigger: 'blur'},
                        {min: 6, max: 10, message: '长度在 6 到 10 位', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'}
                    ]
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$api.userApi.userLogin(this);
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>
<style scoped>
    .el-form-item.marginTop {
        margin-top: 40px;
    }

    #loginSubmit {
        width: 100px;
    }
</style>
