<template>
    <div id="libManage">
        <el-container>
            <el-header class="header-title">知识库管理</el-header>
            <el-main>
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="知识库列表" name="status0">
                        <el-table
                            :data="libStatus0"
                            style="width: 100%">
                            <el-table-column
                                label="名称"
                                prop="libName">
                            </el-table-column>
                            <el-table-column
                                label="简介"
                                prop="libProfile">
                            </el-table-column>
                            <el-table-column
                                label="创建日期"
                                prop="createDate">
                            </el-table-column>
                            <el-table-column
                                label="操作"
                                prop="operate">
                                <template slot-scope="scope">
                                    <el-button size="mini" @click="handleEdit(scope.$index,scope.row)">修改</el-button>
                                    <el-button size="mini" type="danger"
                                               @click="handleDelete(scope.$index, libStatus0)">
                                        删除
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
                    <el-tab-pane label="回收站" name="status1">
                        <el-table
                            :data="libStatus1"
                            style="width: 100%">
                            <el-table-column
                                label="名称"
                                prop="libName">
                            </el-table-column>
                            <el-table-column
                                label="简介"
                                prop="libProfile">
                            </el-table-column>
                            <el-table-column
                                label="创建日期"
                                prop="createDate">
                            </el-table-column>
                            <el-table-column
                                label="操作"
                                prop="operate">
                                <template slot-scope="scope">
                                    <el-button
                                        size="mini"
                                        @click="handleRestore(scope.$index, libStatus1)">还原
                                    </el-button>
                                    <el-button
                                        size="mini"
                                        type="danger"
                                        @click="handleForeverDelete(scope.$index, libStatus1)">删除
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
                    <el-tab-pane name="create">
                        <span slot="label"><i class="el-icon-circle-plus-outline"></i> 添加知识库</span>
                        <el-form :model="form" ref="form" label-width="60px" label-position="left" id="form">
                            <el-form-item label="名称" prop="libName">
                                <el-input v-model="form.libName"></el-input>
                            </el-form-item>
                            <el-form-item label="简介" prop="libProfile">
                                <el-input type="textarea" :rows="4" v-model="form.libProfile"></el-input>
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
        <el-dialog title="修改工作信息" :visible.sync="updateDialog" width="420px">
            <el-form :model="updateForm" ref="updateForm" label-width="100px" label-position="left" id="updateForm">
                <el-form-item label="名称" prop="libName">
                    <el-input v-model="updateForm.libName"></el-input>
                </el-form-item>
                <el-form-item label="简介" prop="libProfile">
                    <el-input v-model="updateForm.libProfile"></el-input>
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
        name: "libManage",
        data() {
            return {
                activeName: 'status0',
                currPage: 1,
                pageSize: 10,
                form: {
                    libName: '',
                    libProfile: ''
                },
                updateForm: {},
                updateDialog: false
            };
        },
        computed: {
            ...mapState({
                createTeam: state => state.teams.createTeam,
                libStatus0: state => state.libs.libStatus0,
                libStatus1: state => state.libs.libStatus1,
                total: state => state.libs.total
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
                    this.$store.commit("setLibStatus0", null);
                    if (this.activeTeamId) {
                        this.$store.dispatch("getLibStatus0", this);
                    }
                } else if (this.activeName === 'status1') {
                    this.$store.commit("setLibStatus1", null);
                    if (this.activeTeamId) {
                        this.$store.dispatch("getLibStatus1", this);
                    }
                }
            },
            onSubmit() {
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        this.$api.libApi.addTeamLib(this);
                    } else {
                    }
                });
            },
            onUpdate() {
                this.$refs['updateForm'].validate((valid) => {
                    if (valid) {
                        this.$api.libApi.updateTeamLib(this)
                    } else {
                    }
                });
            },
            resetForm(formName) {
                this.updateForm = _.assign({}, this.newForm);
            },
            handleEdit(index, row) {
                this.updateForm = row;
                this.updateDialog = true;
            },
            handleDelete(index, rows) {
                this.$api.libApi.updateTeamLibStatus(this, index, rows, 1);
            },
            handleRestore(index, rows) {
                this.$api.libApi.updateTeamLibStatus(this, index, rows, 0);
            },
            handleForeverDelete(index, rows) {
                this.$api.libApi.deleteTeamLib(this, index, rows);
            },
            changePage(val) {
                this.currPage = val;
                if (this.activeName === 'status0') {
                    this.$store.dispatch("getLibStatus0", this);
                } else if (this.activeName === 'status1') {
                    this.$store.dispatch("getLibStatus1", this);
                }
            },
            changeSize(val) {
                this.pageSize = val;
                if (this.activeName === 'status0') {
                    this.$store.dispatch("getLibStatus0", this);
                } else if (this.activeName === 'status1') {
                    this.$store.dispatch("getLibStatus1", this);
                }
            },
            selectTeam(val) {
                this.$store.commit("setActiveTeamId", val);
                this.currPage = 1;
                this.pageSize = 10;
                if (this.activeName === 'status0') {
                    this.$store.commit("setLibStatus0", null);
                    this.$store.dispatch("getLibStatus0", this);
                } else if (this.activeName === 'status1') {
                    this.$store.commit("setLibStatus1", null);
                    this.$store.dispatch("getLibStatus1", this);
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
    #libManage #form {
        max-width: 400px;
        margin-top: 30px;
    }

    #libManage #submit, #libManage #updateSubmit {
        width: 100px;
    }
</style>
