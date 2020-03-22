<template>
  <div class="wrapper">
    <el-row>
      <el-col :span="20">
        <el-button type="primary" @click="create" size="mini">创建</el-button>
      </el-col>
      <el-col :span="4">
        <el-button v-if="!loginedUser.name || loginedUser.name == ''" type="primary" @click="login" size="mini">登录</el-button>
        <span v-else>
          {{ loginedUser.name }}
          <el-button  type="primary" @click="logout" size="mini">退出登录</el-button>
        </span>
      </el-col>
    </el-row>

    <div style="margin: 10px auto">
      <label for="">姓名: </label>
      <el-input
        v-model="searchOpt.name" clearable
        class="search_input"
      />

      <label for="">性别: </label>
      <el-select
        v-model="searchOpt.gender" clearable
        class="search_input">
        <el-option
          v-for="item in genderOpts"
          :key="item.gender"
          :label="item.label"
          :value="item.gender"
        ></el-option>
      </el-select>

      <label for="">年龄: </label>
      <el-select v-model="searchOpt.ageLower" clearable
                class="search_input_age_left">
        <el-option v-for="item in (searchOpt.ageUpper=== ''? ageOpts: ageOpts.filter(v => v < searchOpt.ageUpper))" :key="item" :label="item" :value="item"></el-option>
      </el-select>
      <el-input value="~" class="search_input_age"></el-input>
      <el-select v-model="searchOpt.ageUpper" clearable
                class="search_input_age_right">
        <el-option v-for="item in (searchOpt.ageLower === ''? ageOpts: ageOpts.filter(v => v > searchOpt.ageLower))" :key="item" :label="item" :value="item"></el-option>
      </el-select>
      <el-button type="primary" size="mini" icon="el-icon-search"
                @click="search" class="marginl_10">
        搜索
      </el-button>
    </div>
    <el-table
      border
      stripe
      :data="userList"
      class="table_custom_style"
    >
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column  label="性别" width="180">
        <template slot-scope="scope">
          {{ scope.row.gender === 'male'? "男性":"女性" }}
        </template>
      </el-table-column>
      <el-table-column prop="age" label="年龄" width="180"></el-table-column>
      <el-table-column label="操作" width="">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="info"
            @click="getParticulars(scope.$index, scope.row)">详情</el-button>
          <el-button
            v-if="scope.row._id === loginedUser.id"
            size="mini"
            type="primary"
            @click="edit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            v-if="scope.row._id !== loginedUser.id"
            size="mini"
            type="success"
            @click="addFollower(scope.$index, scope.row)">关注</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="pagination_custom_style"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="userCount">
    </el-pagination>

    <!-- 创建 / 编辑 -->
    <el-dialog
      :title="purpose ==='create'? '创建':'编辑'"
      :visible.sync="visible"
      :destroy-on-close="true"
      :close-on-click-modal="false"
      :show-close="false"
      width="50%">
        <particulars
          :purpose="purpose"
          :form="form"
          @addEmployment="addEmployment"
          @deleteEmploymentItem="deleteEmploymentItem"
          @addEducation="addEducation"
          @deleteEducationItem="deleteEducationItem"
        />
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogCancel">取 消</el-button>
        <el-button type="primary" size="mini" @click="dialogConfirm">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 详情 -->
      <div class="particulars_wrapper" v-if="showInfo">
        <div class="particulars_wrapper_title">用户详情:</div>
        <particulars
          :form="infoForm"
          purpose="info"
          :userId="userId"
          @addEmployment="addEmployment"
          @deleteEmploymentItem="deleteEmploymentItem"
          @addEducation="addEducation"
          @deleteEducationItem="deleteEducationItem"
        />
      </div>

      <!-- 登录 -->
      <login-modal
        :visible="loginVisible"
        @login="handleLogin"
      />
  </div>
</template>
<script>
import { userList, createUser, getUserInfo, updateUser, loginApi } from '@/api/apple.js'
import Particulars from './particulars'
import LoginModal from './login'
import { setToken } from '@/lib/util'
export default {
  name: '',
  data () {
    return {
      genderOpts: [{ label: '男', gender: 'male' }, { label: '女', gender: 'female' }],
      ageOpts: Array.from({ length: 100 }, (v, k) => k),
      visible: false,
      showInfo: false,
      purpose: '',
      form: {},
      userId: 0,
      editUserId: 0,
      searchOpt: {
        name: '',
        gender: '',
        ageLower: '',
        ageUpper: ''
      },
      userList: [],
      userCount: 0,
      pageSize: 10,
      currentPage: 1,
      loginVisible: false,
      loginedUser: {
        name: '',
        id: ''
      }
      // loginedname: ''
    }
  },
  components: {
    Particulars,
    LoginModal
  },
  methods: {
    getUserList (data) {
      userList(data).then(res => {
        this.userList = res.row || []
        this.userCount = res.count || 0
      })
    },
    login () {
      this.loginVisible = true
    },
    handleLogin (form) {
      loginApi(form).then(res => {
        setToken(res.token)
        this.loginedUser = {
          name: res.name,
          id: res.id
        }
        sessionStorage.setItem('loginedUser', JSON.stringify({ name: res.name, id: res.id }))
        this.$message({
          message: '登录成功',
          type: 'success'
        })
        this.loginVisible = false
      }).catch(err => {
        this.$message({
          message: '登录失败' + err,
          type: 'error'
        })
      })
    },
    logout () {
      setToken('')
      this.loginedUser = {
        name: '',
        id: ''
      }
      sessionStorage.setItem('loginedUser', '{}')
    },
    create () {
      this.visible = true
      this.purpose = 'create'
      this.form = { employments: [], educations: [] }
    },
    addEmployment () {
      const id = Date.now() + 'emp'
      const obj = { company: '', job: '', id }
      this.form.employments.push(obj)
    },
    deleteEmploymentItem (id) {
      const index = this.form.employments.findIndex(item => item.id === id)
      this.form.employments.splice(index, 1)
    },
    addEducation () {
      const id = Date.now() + 'edu'
      const obj = { id, school: '', major: '', diploma: '', entrance_year: '', graduation_year: '' }
      this.form.educations.push(obj)
    },
    deleteEducationItem (id) {
      const index = this.form.educations.findIndex(item => item.id === id)
      this.form.educations.splice(index, 1)
    },
    dialogConfirm () {
      if (this.purpose === 'create') {
        createUser(this.form).then(res => {
          this.dialogCancel()
          this.getUserList()
          this.$message({
            message: '创建成功',
            type: 'success'
          })
        }).catch(err => {
          this.$message({
            message: '创建失败' + err,
            type: 'error'
          })
        })
      } else {
        updateUser(this.editUserId, this.form).then(() => {
          this.dialogCancel()
          this.getUserList()
          this.$message({
            message: '更新成功',
            type: 'success'
          })
        }).catch(err => {
          this.$message({
            message: '更新失败' + err,
            type: 'error'
          })
        })
      }
    },
    dialogCancel () {
      this.visible = false
      this.form = { employments: [], educations: [] }
    },
    search () {
      let { ageLower, ageUpper, ...search } = this.searchOpt
      search.age = [ ageLower || 0, ageUpper || 200 ]
      if (!search.name) {
        Reflect.deleteProperty(search, 'name')
      }
      if (!search.gender) {
        Reflect.deleteProperty(search, 'gender')
      }
      search.pageNum = this.currentPage
      search.pageSize = this.pageSize

      this.getUserList(search)
    },
    getParticulars (index, row) {
      const id = row._id
      getUserInfo(id).then(res => {
        this.showInfo = true
        this.infoForm = res
        this.userId = res._id
      })
    },
    edit (index, row) {
      this.editUserId = row._id
      getUserInfo(this.editUserId).then(res => {
        this.visible = true
        this.purpose = 'edit'
        this.form = res
      }).catch(err => {
        console.log(err)
      })
    },
    addFollower () {

    },

    handleSizeChange (val) {
      this.pageSize = val
      this.search()
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.search()
    }
  },
  mounted () {
    this.loginedUser = JSON.parse(sessionStorage.getItem('loginedUser')) || {}
    this.search()
  }
}
</script>
<style lang="scss" scoped>
@import "@/assets/global.scss";

.wrapper{
  margin:10px;
  padding: 10px;
  box-shadow: 0px 0px 10px #aaa;
  .search_input{
    width: 200px;
    margin-right: 10px;
  }
  .search_input_age{
    width: 40px;
  }
  .search_input_age_left,
  .search_input_age_right {
    width: 100px;
  }
  .particulars_wrapper{
    // margin-top: 10px;
    width: 60%;
    &_title{
      font-size: 16px;
      margin: 15px auto;
    }
  }
}
.search_input_age_left /deep/ .el-input__inner{
  border-right: none;
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
}
.search_input_age_right /deep/ .el-input__inner{
  border-left: none;
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
}
.search_input_age /deep/.el-input__inner{
  border-left: none;
  border-right: none;
  border-radius: 0px;
}
</style>
