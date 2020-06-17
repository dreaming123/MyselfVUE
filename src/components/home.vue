<template>
  <div>
    <headTop></headTop>

    <!-- <el-card class="box-card">
      <div v-for="o in 4" :key="o" class="text item"  @click="getJson">{{'列表内容 ' + o }}</div>
      <div v-for="o in 4" :key="o">{{t1}}</div>
    </el-card>-->

    <!-- <input  v-text="查询" type="button" value="查询" @click="mounted()" /> -->

    <el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <span>详细数据：</span>

      <span v-show="rowdetail">{{rowdetail}}</span>

      <ul>
        <li v-for="(item,index) in rowdetail" :key="'li' + index">
          <span v-for="(value,name) in item" :key="'span' + name">{{name+":"+value}}</span>
          <br />
        </li>
      </ul>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <div>
      <div style="width:400px">
        <el-form
          :model="parameter"
          status-icon
          ref="parameter"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="接口名" prop="mes_name">
            <el-input type="txt" v-model="parameter.mes_name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="托盘条码" prop="mes_barcode">
            <el-input type="password" v-model="parameter.mes_barcode" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="类型" prop="mes_type">
            <el-input v-model="parameter.mes_type"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="initData()">提交</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>

      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="date" label="接口名" width="180"></el-table-column>
        <el-table-column prop="name" label="托盘条码" width="180"></el-table-column>
        <el-table-column prop="address" label="类型"></el-table-column>
        <el-table-column style="display" prop="detail" label="明细" width="180"></el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            <el-button type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--  分页 -->
    <div class="block">
      <!-- <span class="demonstration">完整功能</span> -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[2, 15, 20, 30]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import headTop from "./headTop";
import { baseUrl, api } from "../config/env.js";
export default {
  data() {
    return {
      dialogVisible: true, //对话框显示
      parameter: {
        mes_name: "",
        mes_barcode: "",
        mes_type: ""

        //  mes_station:"",
        //  mes_createtimeBegin:"",
        //  mes_createtimeEnd:""
      },
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ],
      // 分页
      parameter_q: "",
      currentPage: 1,
      total: 300, //总条数
      pagesize: 10, //初始页面大小

      rowdetail: "" //显示详细数据
    };
  },

  components: {
    headTop
  },
  created: function() {
    this.initData();
  },
  methods: {
    //初始化数据
    async initData() {
      //获取总页数
      this.total = 100;
      console.log(JSON.stringify(this.parameter));
      //初始化查询参数
      this.parameter_q = JSON.parse(JSON.stringify(this.parameter));
      this.getJson();
    },
    //查询数据，参数，页数和每页显示条数
    getJson() {
      console.log("表单数据" + JSON.stringify(this.parameter));
      console.log("查询的数据" + JSON.stringify(this.parameter_q));
      console.log("页面大小" + this.pagesize + " 当前页：" + this.currentPage);
      const axios = require("axios");
      const that = this;
      // Make a request for a user with a given ID

      axios
        .get(baseUrl + "test.json?ID=12345")
        .then(function(response) {
          // handle success

          console.log(response);
          that.t1 = 2;

          console.log(JSON.stringify(response.data));
          that.tableData = [];
          that.tableData = response.data;
        })
        .catch(function(error) {
          // handle error
          console.log(error);
        })
        .finally(function() {
          // always executed
        });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      const that = this;
      //that.$options.methods.getJson();
      this.getJson(this.pagesize, this.currentPage);
    },
    handleClick(row) {
      for (var i = 0; i < row.size; i++) {
        this.$delete(row[i], "elm");
      }
      // alert(row.detail[0].a);
      //  console.log(JSON.parse(JSON.stringify(row.detail)));
      let detail = row.detail.map(item => {
        let obj = {};
        for (const key in item) {
          if (item.hasOwnProperty(key)) {
            if(key === 'isRootInsert' || key === 'elm') {
              break;
            }
            obj[key] = item[key];
          }
        }
        return obj;
      });
      this.rowdetail = detail;
      console.log(this.rowdetail);
    }
  }
};
</script>
<style lang="less" scoped>
.box-card {
  text-align: center;
  width: 500px;
  margin: auto;
}
</style>
