<template>
    <div>
        <el-container>
            <el-header class="header-title">私语</el-header>
            <el-main>
                该功能暂未开放
                <!--<el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="工作分配" name="workAssign">工作分配</el-tab-pane>
                    <el-tab-pane label="甘特图" name="gantt">甘特图</el-tab-pane>
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

                </el-tabs>-->
            </el-main>
        </el-container>
    </div>
</template>

<script>
    import {mapState} from 'vuex'

    export default {
        name: "chatPrivate",
        data() {
            return {
                activeName: 'nowPerson'
            };
        },
        computed: {
            ...mapState({
                createTeam: state => state.teams.createTeam
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
                console.log(tab, event);
            },
            selectTeam(val) {
                this.$store.commit("setActiveTeamId", val);
            },
            activated() {
                if (!this.createTeam) {
                    this.$store.dispatch("getCreateTeam", this);
                }
            }
        }
    }
</script>

<style>

</style>
