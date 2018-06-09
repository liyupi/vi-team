<template>
    <div id="workManage">
        <el-container>
            <el-header class="header-title">工作管理</el-header>
            <el-main>
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="未分配" name="status0">
                        <el-table
                            :data="workStatus0"
                            style="width: 100%">
                            <el-table-column
                                label="工作"
                                prop="workName">
                            </el-table-column>
                            <el-table-column
                                label="详情"
                                prop="workDetail">
                            </el-table-column>
                            <el-table-column
                                label="计划开始日期"
                                prop="planStartDate">
                            </el-table-column>
                            <el-table-column
                                label="计划截至日期"
                                prop="endDate">
                            </el-table-column>
                            <el-table-column
                                label="操作"
                                prop="operate">
                                <template slot-scope="scope">
                                    <el-button-group>
                                        <el-button icon="el-icon-edit" size="mini"
                                                   @click="handleEdit(scope.$index, scope.row)"></el-button>
                                        <el-button type="danger" icon="el-icon-delete" size="mini"
                                                   @click="handleDelete(scope.$index, workStatus0)"></el-button>
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
                    <el-tab-pane label="进行中" name="status1">
                        <el-table
                            :data="workStatus1"
                            style="width: 100%">
                            <el-table-column type="expand">
                                <template slot-scope="props">
                                    <el-form label-position="left" inline class="demo-table-expand">
                                        <el-form-item label="工作详情">
                                            <span>{{ props.row.workDetail }}</span>
                                        </el-form-item>
                                        <el-form-item label="计划开始日期">
                                            <span>{{ props.row.planStartDate }}</span>
                                        </el-form-item>
                                    </el-form>
                                </template>
                            </el-table-column>
                            <el-table-column
                                label="工作"
                                prop="workName">
                            </el-table-column>
                            <el-table-column
                                label="负责人"
                                prop="username">
                            </el-table-column>
                            <el-table-column
                                label="开始日期"
                                prop="startDate">
                            </el-table-column>
                            <el-table-column
                                label="计划截至日期"
                                prop="endDate">
                            </el-table-column>
                            <el-table-column
                                label="操作"
                                prop="operate">
                                <template slot-scope="scope">
                                    <el-button-group>
                                        <el-button icon="el-icon-edit" size="mini"
                                                   @click="handleEdit(scope.$index, scope.row)"></el-button>
                                        <el-button type="danger" icon="el-icon-delete" size="mini"
                                                   @click="handleDelete(scope.$index, workStatus1)"></el-button>
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
                    <el-tab-pane label="已完成" name="status2">
                        <el-table
                            :data="workStatus2"
                            style="width: 100%">
                            <el-table-column type="expand">
                                <template slot-scope="props">
                                    <el-form label-position="left" inline class="demo-table-expand">
                                        <el-form-item label="工作详情">
                                            <span>{{ props.row.workDetail }}</span>
                                        </el-form-item>
                                        <el-form-item label="计划开始日期">
                                            <span>{{ props.row.planStartDate }}</span>
                                        </el-form-item>
                                        <el-form-item label="计划截止日期">
                                            <span>{{ props.row.endDate }}</span>
                                        </el-form-item>
                                    </el-form>
                                </template>
                            </el-table-column>
                            <el-table-column
                                label="工作"
                                prop="workName">
                            </el-table-column>
                            <el-table-column
                                label="负责人"
                                prop="username">
                            </el-table-column>
                            <el-table-column
                                label="开始日期"
                                prop="startDate">
                            </el-table-column>
                            <el-table-column
                                label="完成日期"
                                prop="finishDate">
                            </el-table-column>
                            <el-table-column
                                label="操作"
                                prop="operate">
                                <template slot-scope="scope">
                                    <el-button type="danger" icon="el-icon-delete" size="mini"
                                               @click="handleDelete(scope.$index, workStatus2)"></el-button>
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
                    <el-tab-pane label="已超时" name="timeout">
                        <el-table
                            :data="workTimeout"
                            style="width: 100%">
                            <el-table-column type="expand">
                                <template slot-scope="props">
                                    <el-form label-position="left" inline class="demo-table-expand">
                                        <el-form-item label="工作详情">
                                            <span>{{ props.row.workDetail }}</span>
                                        </el-form-item>
                                        <el-form-item label="计划开始日期">
                                            <span>{{ props.row.planStartDate }}</span>
                                        </el-form-item>
                                    </el-form>
                                </template>
                            </el-table-column>
                            <el-table-column
                                label="工作"
                                prop="workName">
                            </el-table-column>
                            <el-table-column
                                label="负责人"
                                prop="username">
                            </el-table-column>
                            <el-table-column
                                label="开始日期"
                                prop="startDate">
                            </el-table-column>
                            <el-table-column
                                label="计划截至日期"
                                prop="endDate">
                            </el-table-column>
                            <el-table-column
                                label="操作"
                                prop="operate">
                                <template slot-scope="scope">
                                    <el-button-group>
                                        <el-button icon="el-icon-edit" size="mini"
                                                   @click="handleEdit(scope.$index, scope.row)"></el-button>
                                        <el-button type="danger" icon="el-icon-delete" size="mini"
                                                   @click="handleDelete(scope.$index, workTimeout)"></el-button>
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
                    <el-tab-pane name="addWork">
                        <span slot="label"><i class="el-icon-circle-plus-outline"></i> 添加工作</span>
                        <el-form :model="form" ref="form" label-width="100px" label-position="left" id="form">
                            <el-form-item label="工作名" prop="workName">
                                <el-input v-model="form.workName"></el-input>
                            </el-form-item>
                            <el-form-item label="工作详情" prop="workDetail">
                                <el-input type="textarea" :rows="2" v-model="form.workDetail"></el-input>
                            </el-form-item>
                            <el-form-item label="计划开始日期" prop="realname">
                                <el-date-picker
                                    v-model="form.planStartDate"
                                    type="date"
                                    placeholder="选择日期">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item label="计划截至日期" prop="realname">
                                <el-date-picker
                                    v-model="form.endDate"
                                    type="date"
                                    placeholder="选择日期">
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
        <el-dialog title="修改工作信息" :visible.sync="updateDialog" width="420px">
            <el-form :model="updateForm" ref="updateForm" label-width="100px" label-position="left" id="updateForm">
                <el-form-item label="工作名称" prop="workName">
                    <el-input v-model="updateForm.workName"></el-input>
                </el-form-item>
                <el-form-item label="工作详情" prop="workDetail">
                    <el-input v-model="updateForm.workDetail"></el-input>
                </el-form-item>
                <el-form-item label="计划开始日期" prop="planStartDate">
                    <el-input v-model="updateForm.planStartDate"></el-input>
                </el-form-item>
                <el-form-item label="计划截至日期" prop="endDate">
                    <el-input v-model="updateForm.endDate"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onUpdate" id="submit">提交</el-button>
                    <el-button @click="resetForm('updateForm')" class="prev">重置</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
    import {mapState} from 'vuex'

    export default {
        name: "workManage",
        data() {
            return {
                activeName: 'status0',
                form: {
                    workName: '',
                    workDetail: '',
                    planStartDate: '',
                    endDate: ''
                },
                updateDialog: false,
                updateForm: {},
                pageSize: 10,
                currPage: 1
            };
        },
        computed: {
            ...mapState({
                createTeam: state => state.teams.createTeam,
                workStatus0: state => state.works.workStatus0,
                workStatus1: state => state.works.workStatus1,
                workStatus2: state => state.works.workStatus2,
                workTimeout: state => state.works.workTimeout,
                total: state => state.works.total
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
                if (this.activeName == 'status0') {
                    this.$store.commit("setWorkStatus0", null);
                    if (this.activeTeamId) {
                        this.$store.dispatch("getWorkStatus0", this);
                    }
                } else if (this.activeName == 'status1') {
                    this.$store.commit("setWorkStatus1", null);
                    if (this.activeTeamId) {
                        this.$store.dispatch("getWorkStatus1", {obj: this, workerId: null});
                    }
                } else if (this.activeName == 'status2') {
                    this.$store.commit("setWorkStatus2", null);
                    if (this.activeTeamId) {
                        this.$store.dispatch("getWorkStatus2", {obj: this, workerId: null});
                    }
                } else if (this.activeName == 'timeout') {
                    this.$store.commit("setWorkTimeout", null);
                    if (this.activeTeamId) {
                        this.$store.dispatch("getWorkTimeout", {obj: this, workerId: null});
                    }
                }
            },
            handleEdit(index, row) {
                this.updateForm = row;
                this.updateDialog = true;
            },
            handleDelete(index, rows) {
                this.$api.workApi.deleteTeamWork(this, index, rows);
            },
            onSubmit() {
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        this.$api.workApi.addTeamWork(this)
                    } else {
                    }
                });
            },
            onUpdate() {
                this.$refs['updateForm'].validate((valid) => {
                    if (valid) {
                        this.$api.workApi.updateTeamWork(this)
                    } else {
                    }
                });
            },
            resetForm(formName) {
                this.updateForm = _.assign({}, this.newForm);
            },
            selectTeam(val) {
                this.$store.commit("setActiveTeamId", val);
                this.currPage = 1;
                this.pageSize = 10;
                if (this.activeName == 'status0') {
                    this.$store.commit("setWorkStatus0", null);
                    this.$store.dispatch("getWorkStatus0", this);
                } else if (this.activeName == 'status1') {
                    this.$store.commit("setWorkStatus1", null);
                    this.$store.dispatch("getWorkStatus1", {obj: this, workerId: null});
                } else if (this.activeName == 'status2') {
                    this.$store.commit("setWorkStatus2", null);
                    this.$store.dispatch("getWorkStatus2", {obj: this, workerId: null});
                } else if (this.activeName == 'timeout') {
                    this.$store.commit("setWorkTimeout", null);
                    this.$store.dispatch("getWorkTimeout", {obj: this, workerId: null});
                }
            },
            changePage(val) {
                this.currPage = val;
                switch (this.activeName) {
                    case 'status0':
                        this.$state.dispatch('getWorkStatus0', this);
                        break;
                    case 'status1':
                        this.$state.dispatch('getWorkStatus1', {obj: this, workerId: null});
                        break;
                    case 'status2':
                        this.$state.dispatch('getWorkStatus2', {obj: this, workerId: null});
                        break;
                    case 'timeout':
                        this.$state.dispatch('getWorkTimeout', {obj: this, workerId: null});
                        break;
                }
            },
            changeSize(val) {
                this.pageSize = val;
                switch (this.activeName) {
                    case 'status0':
                        this.$state.dispatch('getWorkStatus0', this);
                        break;
                    case 'status1':
                        this.$state.dispatch('getWorkStatus1', {obj: this, workerId: null});
                        break;
                    case 'status2':
                        this.$state.dispatch('getWorkStatus2', {obj: this, workerId: null});
                        break;
                    case 'timeout':
                        this.$state.dispatch('getWorkTimeout', {obj: this, workerId: null});
                        break;
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

    #workManage #form {
        max-width: 400px;
        margin-top: 30px;
    }

    #workManage #submit {
        width: 100px;
    }

</style>
