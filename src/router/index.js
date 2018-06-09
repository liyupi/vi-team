import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/index'
import Team from '@/pages/team'
import User from '@/pages/user'
import ManagePerson from '@/pages/team/manage/managePerson'
import ManageTeam from '@/pages/team/manage/manageTeam'
import WorkManage from '@/pages/team/work/workManage'
import WorkAssign from '@/pages/team/work/workAssign'
import LibCommit from '@/pages/team/lib/libCommit'
import LibManage from '@/pages/team/lib/libManage'
import InfoManage from '@/pages/team/info/infoManage'
import TeamChatPublic from '@/pages/team/chat/chatPublic'
import TeamChatPrivate from '@/pages/team/chat/chatPrivate'
import InfoView from '@/pages/user/info/infoView'
import InfoEdit from '@/pages/user/info/infoEdit'
import TeamInfo from '@/pages/user/team/teamInfo'
import TeamView from '@/pages/user/team/teamView'
import TeamLib from '@/pages/user/team/teamLib'
import WorkView from '@/pages/user/work/workView'
import CommitView from '@/pages/user/commit/commitView'
import UserChatPublic from '@/pages/user/chat/chatPublic'
import UserChatPrivate from '@/pages/user/chat/chatPrivate'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'index',
            component: Index
        },
        {
            path: '/team',
            component: Team,
            children: [{
                path: 'manage/team',
                component: ManageTeam
            }, {
                path: 'manage/person',
                component: ManagePerson
            }, {
                path: 'work/manage',
                component: WorkManage
            }, {
                path: 'work/assign',
                component: WorkAssign
            }, {
                path: 'lib/manage',
                component: LibManage
            }, {
                path: 'lib/commit',
                component: LibCommit
            }, {
                path: 'info/manage',
                component: InfoManage
            }, {
                path: 'chat/public',
                component: TeamChatPublic
            }, {
                path: 'chat/private',
                component: TeamChatPrivate
            }]
        },
        {
            path: '/user',
            component: User,
            children: [{
                path: 'info/view',
                component: InfoView
            }, {
                path: 'info/edit',
                component: InfoEdit
            }, {
                path: 'team/view',
                component: TeamView
            }, {
                path: 'team/info',
                component: TeamInfo
            }, {
                path: 'team/lib',
                component: TeamLib
            },{
                path: 'work/view',
                component: WorkView
            }, {
                path: 'commit/view',
                component: CommitView
            }, {
                path: 'chat/public',
                component: UserChatPublic
            }, {
                path: 'chat/private',
                component: UserChatPrivate
            }]
        }

    ]
})
