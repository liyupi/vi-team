<template>
    <div>
        <el-container>
            <el-header class="header-title">团队通知</el-header>
            <el-main>
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="当前通知" name="status1">
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
                    <el-tab-pane label="过期通知" name="timeout">
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
                    <el-tab-pane name="selectTeam">
                        <span slot="label">
                            <el-select filterable v-model="activeTeamId" placeholder="请选择团队" size="small"
                                       @change="selectTeam">
                                <el-option
                                    v-for="team in joinTeam"
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
    </div>
</template>

<script>
    import {mapState} from 'vuex'

    export default {
        name: "teamInfo",
        data() {
            return {
                activeName: 'status1',
                currPage: 1,
                pageSize: 10
            };
        },
        computed: {
            ...mapState({
                joinTeam: state => state.teams.joinTeam,
                infoStatus1: state => state.infos.infoStatus1,
                infoTimeout: state => state.infos.infoTimeout,
                total: state => state.infos.total
            }),
            activeTeamId: {
                get() {
                    return this.$store.state.teams.activeJoinId;
                },
                set() {
                }
            }
        },
        methods: {
            handleClick(tab, event) {
                this.currPage = 1;
                this.pageSize = 10;
                if (this.activeName == 'status1') {
                    this.$store.commit("setInfoStatus1", null);
                    if (this.activeTeamId) {
                        this.$store.dispatch("getInfoStatus1", this);
                    }
                } else if (this.activeName == 'timeout') {
                    this.$store.commit("setInfoTimeout", null);
                    if (this.activeTeamId) {
                        this.$store.dispatch("getInfoTimeout", this);
                    }
                }
            },
            selectTeam(val) {
                this.$store.commit("setActiveJoinId", val);
                this.currPage = 1;
                this.pageSize = 10;
                if (this.activeName === 'status1') {
                    this.$store.commit("setInfoStatus1", null);
                    this.$store.dispatch("getInfoStatus1", this);
                } else if (this.activeName === 'timeout') {
                    this.$store.commit("setInfoTimeout", null);
                    this.$store.dispatch("getInfoTimeout", this);
                }
            },
            changePage(val) {
                this.currPage0 = val;
                if (this.activeName === 'status1') {
                    this.$store.commit("setInfoStatus1", null);
                    this.$store.dispatch("getInfoStatus1", this);
                } else if (this.activeName === 'timeout') {
                    this.$store.commit("setInfoTimeout", null);
                    this.$store.dispatch("getInfoTimeout", this);
                }
            },
            changeSize(val) {
                this.pageSize0 = val;
                if (this.activeName === 'status1') {
                    this.$store.commit("setInfoStatus1", null);
                    this.$store.dispatch("getInfoStatus1", this);
                } else if (this.activeName === 'timeout') {
                    this.$store.commit("setInfoTimeout", null);
                    this.$store.dispatch("getInfoTimeout", this);
                }
            }
        },
        activated() {
            if (!this.joinTeam) {
                this.$store.dispatch("getJoinTeamList", this);
            }
        }
    }
</script>

<style>

</style>
