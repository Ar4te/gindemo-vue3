<template>
  <div class="toolbar">
    <el-button @click="handleRefresh" :icon="Refresh" type="primary" size="small">刷新</el-button>
    <el-button @click="handleUpload" :icon="Upload" type="primary" size="small">上传</el-button>
  </div>
  <el-table :data="tableData" style="width: 100%" highlight-current-row row-key="ID">
    <el-table-column prop="FileName" label="文件名" width="180px" />
    <el-table-column prop="CreatedAt" label="上传时间" />
    <el-table-column prop="Description" label="文件描述" />
    <el-table-column label="操作">
      <template #default="scope">
        <el-button size="small" :icon="Download" type="primary" @click="handleDownload(scope.row)">下载</el-button>
        <el-button size="small" :icon="Edit" type="warning" @click="handleEdit(scope.row)">编辑</el-button>
        <el-button size="small" :icon="Delete" type="danger" @click="handleDelete(scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

  <el-drawer v-model="drawer" ref="drawerRef" class="demo-drawer" direction="rtl" :before-close="closeDrawer"
    :title="drawerTitle">
    <!-- <template #header>
      <h4>{{ drawerTitle }}</h4>
    </template> -->
    <div class="demo-drawer__content">
      <el-form :model="articleForm" label-position="right" :label-width="formLabelWidth">
        <!-- <el-form-item label="文件名：">
          <el-input v-model="articleForm.FileName" autocomplete="off" />
        </el-form-item> -->

        <el-form-item label="文件：">
          <el-upload v-model:file-list="file" class="upload-demo" :on-remove="handleRemove" :limit="1"
            :on-exceed="handleExceed" :show-file-list="true" action="" :auto-upload="false">
            <el-button type="primary" :icon="Plus">选择文件</el-button>
            <template #tip>
              <div class="el-upload__tip">
                jpg/png files with a size less than 500KB.
              </div>
            </template>
          </el-upload>
        </el-form-item>
        <el-form-item label="文件描述：">
          <el-input v-model="articleForm.Description" autocomplete="off" type="textarea" rows="3" />
        </el-form-item>
        <el-form-item label="Area" :label-width="formLabelWidth">
          <el-select v-model="articleForm.region" placeholder="Please select activity area">
            <el-option label="Area1" value="shanghai" />
            <el-option label="Area2" value="beijing" />
          </el-select>
        </el-form-item>
      </el-form>
      <!-- <div class="demo-drawer__footer">
        <el-button @click="closeDrawer">Cancel</el-button>
        <el-button type="primary" :loading="loading">{{
          loading ? 'Submitting ...' : 'Submit'
        }}</el-button>
      </div> -->
    </div>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="closeDrawer">cancel</el-button>
        <el-button type="primary" @click="submit">confirm</el-button>
      </div>
    </template>
  </el-drawer>
</template>
<script lang="ts">
import { getAllArticles, downloadFile, uploadFile } from '@/api/articleApi';
import { ElMessage } from 'element-plus';
import { reactive, toRefs } from "vue";
import { Download, Delete, Edit, Refresh, Upload, Plus } from '@element-plus/icons-vue';
import { downloadFileFromBase64 } from "@/utils/downloadBase64File";
import type { UploadProps, UploadUserFile } from 'element-plus'
export default {
  setup() {
    const formLabelWidth = '100px';
    let files: UploadUserFile[] = [];
    const userInfo = JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem('userInfo'))));
    let data = reactive({
      tableData: [],
      drawer: false,
      drawerTitle: '',
      articleForm: {
        userId: '',
        FileName: '',
        region: '',
        Description: '',
      },
      loading: false,
      file: files,
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
    //关闭抽屉
    let closeDrawer = () => {
      data.drawer = false;
      data.loading = false;
    };
    //编辑文档
    let handleEdit = (val: any) => {
      data.drawerTitle = '编辑文档信息';
      data.drawer = true;
      data.articleForm.FileName = val.FileName;
      data.articleForm.Description = val.Description;
    };
    //上传文档
    let handleUpload = () => {
      data.drawerTitle = '上传文档信息';
      data.drawer = true;
      data.articleForm.FileName = "";
      data.articleForm.Description = "";
    };
    //删除文件
    let handleDelete = (val: any) => {
      console.log(val.ID);
    };
    //移除文件
    let handleRemove = () => {

    };
    //文件数量超出限制
    let handleExceed = () => {

    };
    //提交
    let submit = async () => {
      let _file = data.file;
      if (_file.length > 0 && _file[0].raw) {
        let article = new FormData();
        article.append('userId', userInfo.Id);
        article.append('file', _file[0].raw as File);
        article.append('description', data.articleForm.Description);
        let res = await uploadFile(article);
        if (res && res.success) {
          ElMessage.success(res.msg);
          closeDrawer();
        } else {
          ElMessage.error(res ? res.msg : "操作异常");
        }
      } else {
        ElMessage.error("请选择要上传的文件");
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
      closeDrawer,
      handleEdit,
      Upload,
      handleUpload,
      formLabelWidth,
      handleRemove,
      handleExceed,
      submit,
      Plus,
      handleDelete,
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
