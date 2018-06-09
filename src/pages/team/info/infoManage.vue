<template>
    <div id="infoManage">
        <el-container>
            <el-header class="header-title">通知管理</el-header>
            <el-main>
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="待发布" name="status0">
                        <el-table
                            :data="infoStatus0"
                            style="width: 100%">
                            <el-table-column type="expand">
                                <template slot-scope="props">
                                    <el-form label-position="left" inline class="demo-table-expand">
                                        <el-form-item label="内容">
                                            <span>{{ props.row.infoContent }}</span>
                                        </el-form-item>
                                    </el-form>
                                </template>
                            </el-table-column>
                            <el-table-column
                                label="名称"
                                prop="infoName">
                            </el-table-column>
                            <el-table-column
                                label="过期时间"
                                prop="expireTime">
                            </el-table-column>
                            <el-table-column
                                label="操作"
                                prop="operate">
                                <template slot-scope="scope">
                                    <el-button-group>
                                        <el-button icon="el-icon-upload2" size="mini"
                                                   @click="publish(scope.$index, scope.row)"></el-button>
                                        <el-button icon="el-icon-edit" size="mini"
                                                   @click="handleEdit(scope.$index, scope.row)"></el-button>
                                        <el-button type="danger" icon="el-icon-delete" size="mini"
                                                   @click="handleDelete(scope.$index, infoStatus0)"></el-button>
                                    </el-button-group>
                                </template>
                            </el-table-column>
                        </el-table>
                        <el-pagination
                            @size-change="changeSize"
                            @current-change="changePage"
                            :current-page="currPage"
                            :page-sizes="[10, 20, 30]"
                            :page-size="pageSize"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="total">
                        </el-pagination>
                    </el-tab-pane>
                    <el-tab-pane label="已发布" name="status1">
                        <el-table
                            :data="infoStatus1"
                            style="width: 100%">
                            <el-table-column type="expand">
                                <template slot-scope="props">
                                    <el-form label-position="left" inline class="demo-table-expand">
                                        <el-form-item label="内容">
                                            <span>{{ props.row.infoContent }}</span>
                                        </el-form-item>
                                    </el-form>
                                </template>
                            </el-table-column>
                            <el-table-column
                                label="名称"
                                prop="infoName">
                            </el-table-column>
                            <el-table-column
                                label="发布时间"
                                prop="publishTime">
                            </el-table-column>
                            <el-table-column
                                label="过期时间"
                                prop="expireTime">
                            </el-table-column>
                            <el-table-column
                                label="操作"
                                prop="operate">
                                <template slot-scope="scope">
                                    <el-button-group>
                                        <el-button icon="el-icon-edit" size="mini"
                                                   @click="handleEdit(scope.$index, scope.row)"></el-button>
                                        <el-button type="danger" icon="el-icon-delete" size="mini"
                                                   @click="handleDelete(scope.$index,infoStatus1)"></el-button>
                                    </el-button-group>
                                </template>
                            </el-table-column>
                        </el-table>
                        <el-pagination
                            @size-change="changeSize"
                            @current-change="changePage"
                            :current-page="currPage"
                            :page-sizes="[10, 20, 30]"
                            :page-size="pageSize"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="total">
                        </el-pagination>
                    </el-tab-pane>
                    <el-tab-pane label="已过期" name="timeout">
                        <el-table
                            :data="infoTimeout"
                            style="width: 100%">
                            <el-table-column type="expand">
                                <template slot-scope="props">
                                    <el-form label-position="left" inline class="demo-table-expand">
                                        <el-form-item label="内容">
                                            <span>{{ props.row.infoContent }}</span>
                                        </el-form-item>
                                    </el-form>
                                </template>
                            </el-table-column>
                            <el-table-column
                                label="名称"
                                prop="infoName">
                            </el-table-column>
                            <el-table-column
                                label="发布时间"
                                prop="publishTime">
                            </el-table-column>
                            <el-table-column
                                label="过期时间"
                                prop="expireTime">
                            </el-table-column>
                            <el-table-column
                                label="操作"
                                prop="operate">
                                <template slot-scope="scope">
                                    <el-button
                                        size="mini"
                                        type="danger"
                                        @click="handleDelete(scope.$index, infoTimeout)">删除
                                    </el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <el-pagination
                            @size-change="changeSize"
                            @current-change="changePage"
                            :current-page="currPage"
                            :page-sizes="[10, 20, 30]"
                            :page-size="pageSize"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="total">
                        </el-pagination>
                    </el-tab-pane>
                    <el-tab-pane name="createInfo">
                        <span slot="label"><i class="el-icon-circle-plus-outline"></i> 新建通知</span>
                        <el-form :model="form" ref="form" label-width="80px" label-position="left" id="form">
                            <el-form-item label="通知标题" prop="workName">
                                <el-input v-model="form.infoName"></el-input>
                            </el-form-item>
                            <el-form-item label="通知内容" prop="workDetail">
                                <el-input type="textarea" :rows="2" v-model="form.infoContent"></el-input>
                            </el-form-item>
                            <el-form-item label="过期时间" prop="realname">
                                <el-date-picker
                                    v-model="form.expireTime"
                                    type="datetime"
                                    value-format="yyyy-MM-dd HH:mm:ss"
                                    placeholder="选择过期时间">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="onSubmit" id="submit">提交</el-button>
                                <el-button @click="resetForm('form')" class="prev">重置</el-button>
                            </el-form-item>
                        </el-form>

                    </el-tab-pane>
                    <el-tab-pane name="selectTeam">
                        <span slot="label">
                            <el-select v-model="activeTeamId" filterable placeholder="请选择团队" size="small"
                                       @change="selectTeam">
                                <el-option
                                    v-for="team in createTeam"
                                    :key="team.teamId"
                                    :label="team.teamName"
                                    :value="team.teamId">
                                </el-option>
                            </el-select>
                        </span>
                    </el-tab-pane>

                </el-tabs>
            </el-main>
        </el-container>
        <el-dialog title="修改通知" :visible.sync="updateDialog" width="420px">
            <el-form :model="updateForm" ref="updateForm" label-width="100px" label-position="left" id="updateForm">
                <el-form-item label="名称" prop="infoName">
                    <el-input v-model="updateForm.infoName"></el-input>
                </el-form-item>
                <el-form-item label="内容" prop="infoContent">
                    <el-input v-model="updateForm.infoContent"></el-input>
                </el-form-item>
                <el-form-item label="过期时间" prop="expireTime">
                    <el-date-picker
                        v-model="updateForm.expireTime"
                        type="datetime"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        placeholder="选择过期时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onUpdate" id="updateSubmit">提交</el-button>
                    <el-button @click="resetForm('updateForm')" class="prev">重置</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
    import {mapState} from 'vuex'

    export default {
        name: "infoManage",
        data() {
            return {
                activeName: 'status0',
                currPage: 1,
                pageSize: 10,
                form: {
                    infoName: '',
                    infoContent: '',
                    expireTime: ''
                },
                updateForm: '',
                updateDialog: false
            };
        },
        computed: {
            ...mapState({
                createTeam: state => state.teams.createTeam,
                infoStatus0: state => state.infos.infoStatus0,
                infoStatus1: state => state.infos.infoStatus1,
                infoTimeout: state => state.infos.infoTimeout,
                total: state => state.infos.total
            }),
            activeTeamId: {
                get() {
                    return this.$store.state.teams.activeTeamId;
                },
                set() {
                }
            }
        },
        methods: {
            handleClick(tab, event) {
                this.currPage = 1;
                this.pageSize = 10;
                if (this.activeName === 'status0') {
                    this.$store.commit("setInfoStatus0", null);
                    if (this.activeTeamId) {
                        this.$store.dispatch("getInfoStatus0", this);
                    }
                } else if (this.activeName === 'status1') {
                    this.$store.commit("setInfoStatus1", null);
                    if (this.activeTeamId) {
                        this.$store.dispatch("getInfoStatus1", this);
                    }
                } else if (this.activeName === 'timeout') {
                    this.$store.commit("setInfoTimeout", null);
                    if (this.activeTeamId) {
                        this.$store.dispatch("getInfoTimeout", this);
                    }
                }
            },
            publish(index, row) {
                this.$api.infoApi.publishInfo(this, index, row);
            },
            handleEdit(index, row) {
                this.updateForm = row;
                this.updateDialog = true;
            },
            handleDelete(index, rows) {
                this.$api.infoApi.deleteTeamInfo(this, index, rows)
            },
            selectTeam(val) {
                this.$store.commit("setActiveTeamId", val);
                this.currPage = 1;
                this.pageSize = 10;
                if (this.activeName === 'status0') {
                    this.$store.commit("setInfoStatus0", null);
                    this.$store.dispatch("getInfoStatus0", this);
                } else if (this.activeName === 'status1') {
                    this.$store.commit("setInfoStatus1", null);
                    this.$store.dispatch("getInfoStatus1", this);
                } else if (this.activeName === 'timeout') {
                    this.$store.commit("setInfoTimeout", null);
                    this.$store.dispatch("getInfoTimeout", this);
                }
            },
            onSubmit() {
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        this.$api.infoApi.addTeamInfo(this);
                    } else {
                    }
                });
            },
            onUpdate() {
                this.$refs['updateForm'].validate((valid) => {
                    if (valid) {
                        this.$api.infoApi.updateTeamInfo(this);
                    } else {

                    }
                });
            },
            resetForm(formName) {
                this.updateForm = _.assign({}, this.newForm);
            },
            changePage(val) {
                this.currPage = val;
                if (this.activeName === 'status0') {
                    this.$store.dispatch("getInfoStatus0", this);
                } else if (this.activeName === 'status1') {
                    this.$store.dispatch("getInfoStatus1", this);
                } else if (this.activeName === 'timeout') {
                    this.$store.dispatch("getInfoTimeout", this);
                }
            },
            changeSize(val) {
                this.pageSize = val;
                if (this.activeName === 'status0') {
                    this.$store.dispatch("getInfoStatus0", this);
                } else if (this.activeName === 'status1') {
                    this.$store.dispatch("getInfoStatus1", this);
                } else if (this.activeName === 'timeout') {
                    this.$store.dispatch("getInfoTimeout", this);
                }
            }
        },
        activated() {
            if (!this.createTeam) {
                this.$store.dispatch("getCreateTeam", this);
            }
        }
    }
</script>

<style>
    #infoManage #form {
        max-width: 400px;
        margin-top: 30px;
    }

    #infoManage #submit {
        width: 100px;
    }
</style>
