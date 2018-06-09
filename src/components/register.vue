<template>
    <div id="register">
        <el-form :model="registerForm" label-width="80px" :rules="rules" ref="registerForm" class="registerForm">
            <el-form-item label="账号" prop="userId">
                <el-input v-model="registerForm.userId" placeholder="请输入6-10位数字"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="registerForm.password" type="password" auto-complete="off"
                          placeholder="请输入6-18位密码"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="confirmPassword">
                <el-input v-model="registerForm.confirmPassword" type="password" auto-complete="off"
                          placeholder="请确认密码"></el-input>
            </el-form-item>
            <el-form-item class="marginTop">
                <el-button type="primary" @click="submitForm('registerForm')" id="registerSubmit">注册</el-button>
                <el-button @click="resetForm('registerForm')">重置</el-button>
                <el-button @click="$emit('switchDialog',0)"><i class="el-icon-back"></i> 返回</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>


    export default {
        name: 'register',
        data() {
            return {
                registerForm: {
                    userId: '',
                    password: '',
                    confirmPassword: ''
                },
                rules: {
                    userId: [
                        {required: true, message: '请输入账号', trigger: 'blur'},
                        {min: 6, max: 10, message: '长度在 6 到 10 位', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'}
                    ],
                    confirmPassword: [
                        {required: true, message: '请确认密码', trigger: 'blur'}
                    ]
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$api.userApi.userRegister(this);
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

    #registerSubmit {
        width: 100px;
    }
</style>
