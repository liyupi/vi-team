<template>
    <div>
        <el-container>
            <el-header class="header-title" height="40px">信息修改</el-header>
            <el-main>
                <el-form :model="form" ref="form" label-width="50px" label-position="left" id="infoForm">
                    <el-form-item label="账号" prop="userId">
                        <el-input v-model="form.userId" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="昵称" prop="username">
                        <el-input v-model="form.username"></el-input>
                    </el-form-item>
                    <el-form-item label="姓名" prop="realname">
                        <el-input v-model="form.realname"></el-input>
                    </el-form-item>
                    <el-form-item label="身份" prop="identity">
                        <el-radio-group v-model="form.identity">
                            <el-radio label="学生"></el-radio>
                            <el-radio label="职工"></el-radio>
                            <el-radio label="自由人"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="性别" prop="sex">
                        <el-radio-group v-model="form.sex">
                            <el-radio label="男"></el-radio>
                            <el-radio label="女"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="年龄" prop="age">
                        <el-input-number v-model="form.age" :step="1" :min="0" :max="100"></el-input-number>
                    </el-form-item>
                    <el-form-item label="手机" prop="telnum">
                        <el-input v-model="form.telnum"></el-input>
                    </el-form-item>
                    <el-form-item label="签名" prop="signature">
                        <el-input type="textarea" :rows="4" v-model="form.signature"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit" id="infoSubmit">提交</el-button>
                    </el-form-item>
                </el-form>
            </el-main>
        </el-container>

    </div>
</template>

<script>


    export default {
        name: 'infoEdit',
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
                    signature: ''
                }
            }
        },
        methods: {
            onSubmit() {
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        this.$api.userApi.userUpdate(this);
                    }
                });
            }
        },
        activated() {
            this.$api.userApi.userGetInfo(this);
        }
    }
</script>

<style scoped>

    #infoForm {
        max-width: 400px;
    }

    #infoSubmit {
        width: 100px;
    }

</style>
