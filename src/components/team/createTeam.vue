<template>
    <div id="createTeam">
        <el-steps :active="step">
            <el-step title="填写信息" icon="el-icon-edit"></el-step>
            <el-step title="上传头像" icon="el-icon-picture"></el-step>
            <el-step title="完成" icon="el-icon-success"></el-step>
        </el-steps>
        <transition name="el-fade-in-linear" mode="out-in">
            <div v-if="step === 1" key="step1">
                <div class="content">
                    <el-form :model="form" ref="form" label-width="50px">
                        <el-form-item label="名称" prop="teamName">
                            <el-input v-model="form.teamName"></el-input>
                        </el-form-item>
                        <el-form-item label="类别" prop="type">
                            <el-input v-model="form.type"></el-input>
                        </el-form-item>
                        <el-form-item label="简介" prop="profile">
                            <el-input v-model="form.profile"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="control">
                    <el-button @click="resetForm('form')" class="prev">重置</el-button>
                    <el-button @click="onSubmit" class="next">下一步 <i class="el-icon-arrow-right"></i></el-button>
                </div>
            </div>
            <div v-if="step === 2" key="step2">
                <div class="content">
                    <el-upload
                        class="avatar-uploader"
                        action="http://localhost:8080/team/upload/pic"
                        :data="{token:token}"
                        :show-file-list="false"
                        :on-success="handleUploadSuccess"
                        :before-upload="beforePicUpload">
                        <img v-if="form.headPic" :src="form.headPic" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                    <div class="tip"><span style="color: red;">* </span>图片必须小于1M，且为jpg格式</div>
                </div>
                <div class="control">
                    <el-button @click="step--" class="prev"><i class="el-icon-arrow-left"></i> 上一步</el-button>
                    <el-button @click="onUploadImage" class="next">下一步 <i class="el-icon-arrow-right"></i></el-button>
                </div>
            </div>
            <div v-if="step === 3" key="step3">
                <div class="content teamCard">
                    <el-card :body-style="{ padding: '0px'}">
                        <el-popover
                            placement="top"
                            title="简介"
                            width="200"
                            trigger="hover"
                            :content="form.profile">
                            <img :src="form.headPic" class="image" slot="reference"/>
                        </el-popover>

                        <div class="teamInfo">
                            <p>
                                <span class="teamName">{{form.teamName}}</span>
                                <el-tag size="mini" class="right teamType">{{form.type}}</el-tag>
                            </p>
                            <p class="bottom">
                                <span class="nowDate">{{nowDate}}</span>
                                <span class="right">
                                    <span class="iconfont icon-people"></span>
                                    <span class="workerNum">1</span>
                                </span>
                            </p>
                        </div>
                    </el-card>
                </div>
                <div class="control">
                    <el-button @click="step--" class="prev"><i class="el-icon-arrow-left"></i> 上一步</el-button>
                    <el-button @click="createTeam" class="next">创建 <i class="el-icon-arrow-right"></i></el-button>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import teamApi from '@/api/teamApi'

    export default {
        name: "createTeam",
        data() {
            return {
                step: 1,
                form: {
                    teamName: '',
                    type: '',
                    profile: '',
                    headPic: ''
                },
                newForm: {
                    teamName: '',
                    type: '',
                    profile: '',
                    headPic: ''
                }
            }
        },
        methods: {
            onSubmit() {
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        this.step++;
                    } else {
                        this.$message({
                            type: 'error',
                            message: '请先完善团队信息'
                        });
                    }
                });
            },
            resetForm(formName) {
                this.form=_.assign({},this.newForm);
            },
            createTeam() {
                teamApi.createTeam(this);
            },
            handleUploadSuccess(res, file) {
                switch (res.code) {
                    case 0:
                        this.form.headPic = res.src;
                        break;
                    case 2:
                        this.$api.teamApi.loginTimeout(this);
                        break;
                    default:
                        obj.$message({
                            message: '请求异常',
                            type: 'error'
                        });
                        break;

                }
                this.$message({
                    type: 'success',
                    message: '上传成功，请继续下一步'
                });
            },
            beforePicUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt1M = file.size / 1024 / 1024 < 1;
                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt1M) {
                    this.$message.error('上传头像图片大小不能超过 1MB!');
                }
                return isJPG && isLt1M;
            },
            onUploadImage() {
                if (this.form.headPic != '') {
                    this.step++;
                } else {
                    this.$message({
                        type: 'error',
                        message: '请先上传团队头像'
                    });
                }
            }
        },
        computed: {
            nowDate() {
                let date = new Date();
                let month = date.getMonth() + 1;
                let day = date.getDate();
                return date.getFullYear() + "-" + (month < 10 ? "0" + month : month) + "-" + (day < 10 ? "0" + day : day);
            },
            token() {
                return this.$cookie.get('token');
            }
        }
    }
</script>

<style>
    #createTeam .el-steps {
        margin-bottom: 40px;
    }

    #createTeam .el-form {
        padding-right: 15px;
    }

    #createTeam .el-input__inner {
        border-width: 0 0 1px 0;
        border-radius: 0;
    }

    #createTeam .control {
        padding: 0 10px;
        margin-top: 40px;
    }

    #createTeam .next {
        float: right;
    }

    /*团队图片上传*/
    #createTeam .avatar-uploader {
        text-align: center;
    }

    #createTeam .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        overflow: hidden;
    }

    #createTeam .avatar-uploader .el-upload:hover {
        border-color: green;
    }

    #createTeam .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }

    #createTeam .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }

    #createTeam .tip {
        margin-top: 15px;
        text-align: center;
    }

</style>
