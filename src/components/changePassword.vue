<template>
    <div id="changePassword">
        <el-form :model="changePasswordForm" label-width="80px" :rules="rules" ref="changePasswordForm"
                 class="changePasswordForm">
            <el-form-item label="账号" prop="userId">
                <el-input v-model="changePasswordForm.userId" placeholder="请输入6-10位数字"></el-input>
            </el-form-item>
            <el-form-item label="原密码" prop="oldPassword">
                <el-input v-model="changePasswordForm.oldPassword" type="password" auto-complete="off"
                          placeholder="请输入原密码"></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="newPassword">
                <el-input v-model="changePasswordForm.newPassword" type="password" auto-complete="off"
                          placeholder="请输入6-18位新密码">
                </el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="confirmPassword">
                <el-input v-model="changePasswordForm.confirmPassword" type="password" auto-complete="off"
                          placeholder="请确认新密码">
                </el-input>
            </el-form-item>
            <el-form-item class="marginTop">
                <el-button type="primary" @click="submitForm('changePasswordForm')" id="changePasswordSubmit">修改
                </el-button>
                <el-button @click="resetForm('changePasswordForm')">重置</el-button>
                <el-button @click="$emit('switchDialog',0)"><i class="el-icon-back"></i> 返回</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>

    export default {
        name: 'changePassword',
        data() {
            return {
                changePasswordForm: {
                    userId: '',
                    oldPassword: '',
                    newPassword: '',
                    confirmPassword: '',
                },
                rules: {
                    userId: [
                        {required: true, message: '请输入账号', trigger: 'blur'},
                        {min: 6, max: 10, message: '长度在 6 到 10 位', trigger: 'blur'}
                    ],
                    oldPassword: [
                        {required: true, message: '请输入原密码', trigger: 'blur'}
                    ],
                    newPassword: [
                        {required: true, message: '请输入新密码', trigger: 'blur'}
                    ],
                    confirmPassword: [
                        {required: true, message: '请确认新密码', trigger: 'blur'}
                    ]
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$api.userApi.userChangePassword(this);
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
        margin-top: 35px;
    }

    #changePasswordSubmit {
        width: 100px;
    }
</style>
