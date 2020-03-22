<template>
  <div>
    <el-form :model="form" label-width="90px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="姓名">
            <el-input v-model="form.name" :disabled="purpose =='info'"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" v-if="purpose !=='info'">
          <el-form-item label="密码">
            <el-input v-model="form.password"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="年龄">
            <el-input-number
              :controls="false"
              v-model="form.age"
              :disabled="purpose =='info'"
              class="number-input_custom_style"
            ></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="性别">
            <el-select
              v-model="form.gender"
              clearable
              :disabled="purpose =='info'"
              class="select_custom_style"
            >
              <el-option
                v-for="item in genderOpts"
                :key="item.gender"
                :label="item.label"
                :value="item.gender"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="16">
          <el-form-item label="一句话简介">
            <el-input v-model="form.headline" :disabled="purpose =='info'"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="16">
          <el-form-item label="居住地">
            <el-select
              v-model="form.locations"
              multiple
              filterable
              allow-create
              default-first-option
              placeholder="请选择居住地标签"
              :disabled="purpose =='info'"
              class="select_custom_style"
            >
              <el-option
                v-for="item in cityOpts"
                :key="item"
                :label="item"
                :value="item"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="16">
          <el-form-item label="行业">
            <el-input v-model="form.business" :disabled="purpose =='info'"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="16">
          <el-form-item label="职业经历">
            <el-button v-if="purpose !=='info'" @click="addEmployment" type="primary">添加职业经历</el-button>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-for="item in form.employments" :key="item.id">
        <el-col :span="6" :offset="2">
          <el-form-item label-width="10px">
            <el-input v-model="item.company" placeholder="公司或组织名称" :disabled="purpose =='info'"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label-width="10px">
            <el-input v-model="item.job" placeholder="你的职位" :disabled="purpose =='info'"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="1" :offset="1">
          <el-button
            v-if="purpose !=='info'"
            @click="deleteEmploymentItem(item.id)"
            size="mini"
            icon="el-icon-delete"
            circle
          ></el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="16">
          <el-form-item label="教育经历">
            <el-button v-if="purpose !=='info'" @click="addEducation" type="primary">添加教育经历</el-button>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-for="item in form.educations" :key="item.id">
        <el-col :span="6" :offset="2">
          <el-form-item label-width="10px">
            <el-input v-model="item.school" placeholder="学校或教育机构名" :disabled="purpose =='info'"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label-width="10px">
            <el-input v-model="item.major" placeholder="专业方法" :disabled="purpose =='info'"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label-width="10px">
            <el-select
              v-model="item.diploma"
              placeholder="学历"
              :disabled="purpose =='info'"
              class="select_custom_style"
            >
              <el-option
                v-for="item in diplomaOpts"
                :key="item.diploma"
                :label="item.label"
                :value="item.diploma"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="2">
          <el-form-item label-width="10px">
            <el-select
              v-model="item.entrance_year"
              placeholder="入学年份"
              :disabled="purpose =='info'"
              class="select_custom_style"
            >
              <el-option v-for="item in yearOpts" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label-width="10px">
            <el-select
              v-model="item.graduation_year"
              placeholder="毕业年份"
              :disabled="purpose =='info'"
              class="select_custom_style"
            >
              <el-option v-for="item in yearOpts" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="1" :offset="1">
          <el-button
            v-if="purpose !=='info'"
            @click="deleteEducationItem(item.id)"
            size="mini"
            icon="el-icon-delete"
            circle
          ></el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
export default {
  name: 'particulars',
  props: {
    form: {
      type: Object,
      required: true
    },
    purpose: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      yearOpts: [],
      genderOpts: [
        { label: '男', gender: 'male' },
        { label: '女', gender: 'female' }
      ],
      cityOpts: ['杭州', '南京'],
      diplomaOpts: [
        { diploma: 1, label: '高中及以下' },
        { diploma: 2, label: '大专' },
        { diploma: 3, label: '本科' },
        { diploma: 4, label: '硕士' },
        { diploma: 5, label: '博士及以上' }
      ]
    }
  },
  watch: {
    // form (newVal, oldVal) {},
    // form: {
    //   deep: true,
    //   handler (newVal, oldVal) {}
    // }
  },
  methods: {
    addEmployment () {
      this.$emit('addEmployment')
    },
    deleteEmploymentItem (id) {
      this.$emit('deleteEmploymentItem', id)
    },
    addEducation () {
      this.$emit('addEducation')
    },
    deleteEducationItem (id) {
      this.$emit('deleteEducationItem', id)
    }
  },
  mounted () {
    const year = new Date().getFullYear()
    this.yearOpts = Array.from({ length: 60 }, (v, k) => year - k)
  },
  updated () {
    //
  }
}
</script>
<style lang="scss" scoped>
.select_custom_style {
  width: 100%;
}
.number-input_custom_style.el-input-number /deep/ .el-input__inner {
  text-align: left;
}
.number-input_custom_style{
  width: 100%
}
</style>
