<template>
  <div class="toolbar">
    <el-button @click="handleRefresh" :icon="Refresh" type="primary" size="small">刷新</el-button>
  </div>
  <el-table :data="tableData" style="width: 100%" highlight-current-row row-key="ID">
    <el-table-column prop="FileName" label="文件名" width="180px" />
    <el-table-column prop="CreatedAt" label="上传时间" />
    <el-table-column label="操作">
      <template #default="scope">
        <el-button size="small" :icon="Download" type="primary" @click="handleDownload(scope.row)">下载</el-button>
        <el-button size="small" :icon="Edit" type="warning">编辑</el-button>
        <el-button size="small" :icon="Delete" type="danger">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script lang="ts">
import { getAllArticles, downloadFile } from '@/api/articleApi';
import { ElMessage } from 'element-plus';
import { reactive, toRefs } from "vue";
import { Download, Delete, Edit, Refresh } from '@element-plus/icons-vue';
import { downloadFileFromBase64 } from "@/utils/downloadBase64File";
export default {
  setup() {
    let data = reactive({
      tableData: []
    });
    //获取全部文章
    let getAllArticle = async () => {
      let res = await getAllArticles('');
      if (res && res.success) {
        let _table = res.data;
        data.tableData = _table.data;
        ElMessage.success("操作成功");
      } else {
        ElMessage.error(res ? res.msg : '系统异常');
      }
    };
    //页面刷新
    let handleRefresh = () => {
      getAllArticle();
    };
    //下载文件
    let handleDownload = async (val: any) => {
      if (!val) {
        ElMessage.error("请选择要下载的文件");
        return;
      }
      let params = {
        fileid: val.ID,
        filename: val.FileName,
      };
      let res = await downloadFile(params);
      if (res && res.success) {
        let _stream = res.data.filestream;
        let _filename = val.FileName;
        downloadFileFromBase64(_stream, _filename);
      } else {
        ElMessage.error(res ? res.msg : "操作异常");
      }
    };
    getAllArticle();
    return {
      ...toRefs(data),
      handleRefresh,
      handleDownload,
      Download,
      Delete,
      Edit,
      Refresh,
    }
  },
}
</script>
<style scoped lang="less">
.toolbar {
  flex: 1;
  width: 100%;
}
</style>
