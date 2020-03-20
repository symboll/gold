<template>
  <div class="wrapper">
    <el-row class="form_row">
      <el-col :span='8' :offset="2" >
        <!-- <el-form :model="form" label-width="80px">
          <el-form-item label="主标题">
            <el-input v-model="form.title"></el-input>
          </el-form-item>
          <el-form-item label="副标题">
            <el-input v-model="form.subtitle"></el-input>
          </el-form-item>
          <el-form-item label="charts">
            <el-input v-model="form.seriesName"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="tagSubmit" type="primary">修改标签</el-button>
          </el-form-item>
        </el-form> -->
        <el-button type="primary" @click="modifyText">修改文案</el-button>
        <div class="tags_wrapper">
          <el-tag
            v-for="(item,index) in optionList"
            :key="item"
            closable
            :type="type[index%5]"
            :disable-transitions="false"
            @close="closeTag(item)"
          >{{item}}</el-tag>
          <el-input
            v-if="inputVisible"
            v-model="inputValue"
            ref="saveTagInput"
            @keyup.enter.native="inputConfirm"
            @blur="inputConfirm"
            class="input-new-tag"
          >
          </el-input>
          <el-button v-else @click="showInput" class="button-new-tag">增加标签</el-button>
        </div>
      </el-col>
      <el-col :span='8' :offset='4'>
        <el-button @click="addItem" type="primary">增加</el-button>
        <el-button @click="dataSubmit" type="primary">修改数据</el-button>
        <template v-for="(item,index) in list" >
          <el-input
            v-model.number="item.value"
            :key="`${index}_${item}`"
            placeholder="请输入数量"
            class="form_input">
            <el-select
              slot="prepend"
              v-model="item.key"
              placeholder="请选择"
              class="form_select">
              <el-option
                v-for="items in optionList"
                :key="items"
                :label="items"
                :value="items">
              </el-option>
            </el-select>
            <el-button
              slot="append"
              icon="el-icon-delete"
              v-if="list.length !== 1"
              @click="delateItem(index)"
            ></el-button>
          </el-input>
        </template>
      </el-col>
    </el-row>
    <el-row style="marginTop: 10px">
      <el-col :span="20" :offset="2">
        <el-table border show-summary :data="tableData" style="width:100%">
          <el-table-column type="index"></el-table-column>
          <el-table-column
            v-for="item in optionList"
            :key="item"
            :prop="item"
            :label="item"></el-table-column>
        </el-table>
      </el-col>
    </el-row>

    <el-row>
      <el-col>
        <three-pie
          :title="title"
          :subtitle="subtitle"
          :seriesName="seriesName"
          :seriesData="seriesData"
        />
      </el-col>
    </el-row>

  </div>
</template>
<script>
import ThreePie from '_c/high-charts/pie.vue'
export default {
  name: '',
  components: {
    ThreePie
  },
  data () {
    return {
      inputVisible: false,
      inputValue: '',
      type: ['', 'success', 'info', 'warning', 'danger'],
      // form: {
      //   title:'',
      //   subtitle:'',
      //   seriesName:'',
      // },
      list: [{ key: '', value: '' }],
      optionList: ['香蕉', '猕猴桃', '桃子', '橘子', '苹果', '梨', '柑橘', '橙子', '葡萄'],
      tableData: [
        { '香蕉': 8, '猕猴桃': 3, '桃子': 1, '橘子': 6, '苹果': 8, '梨': 4, '柑橘': 4, '橙子': 1, '葡萄': 1 }
      ],
      title: '每周水果消耗量',
      subtitle: '3D环形图',
      seriesName: '货物金额',
      seriesData: [
        ['香蕉', 8],
        ['猕猴桃', 3],
        ['桃子', 1],
        ['橘子', 6],
        ['苹果', 8],
        ['梨', 4],
        ['柑橘', 4],
        ['橙子', 1],
        ['葡萄', 1]
      ]
    }
  },
  watch: {
    tableData () {
      // console.log('lkh',this.tableData.length)
      this.seriesData = []
      this.optionList.forEach(item => {
        let total = 0
        this.tableData.forEach(ite => {
          if (typeof (ite[item]) === 'number') {
            total += ite[item]
          }
        })
        let arr = [item, total]
        this.seriesData.push(arr)
      })
    }
  },
  methods: {
    modifyText () {

    },
    addItem () {
      const obj = { key: '', value: '' }
      this.list.push(obj)
    },
    delateItem (index) {
      this.list.splice(index, 1)
    },
    closeTag (tag) {
      this.optionList.splice(this.optionList.indexOf(tag), 1)
    },
    inputConfirm () {
      let inputValue = this.inputValue
      if (inputValue) {
        this.optionList.push(inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
    },
    showInput () {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    dataSubmit () {
      const obj = { '香蕉': 0, '猕猴桃': 0, '桃子': 0, '橘子': 0, '苹果': 0, '梨': 0, '柑橘': 0, '橙子': 0, '葡萄': 0 }
      let flag = false
      this.list.forEach(item => {
        if (item.key && (typeof item.value === 'number')) {
          obj[item.key] = item.value
          flag = true
        }
      })
      flag && this.tableData.push(obj)
      this.list = [{ key: '', value: '' }]
    }
    // tagSubmit () {
    //   this.title = this.form.title || ''
    //   this.subtitle = this.form.subtitle || ''
    //   this.seriesName = this.form.seriesName || ''
    // }
  }
}
</script>
<style lang="scss" scoped>
.wrapper{
  box-sizing: border-box;
  padding: 20px;
}
.form_select{
  width:120px;
}
.form_input{
  margin-top: 10px;
}
.form_row {
  min-height: 200px;
}
.tags_wrapper{
  border: 1px solid #DCDFE6;
  border-radius: 4px;
  margin-top: 10px;
  padding:10px;
  display: flex;
  flex-wrap: wrap;
  .el-tag {
    margin: 4px;
  }
  .button-new-tag {
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    vertical-align: bottom;
  }
}
</style>
