<template>
  <div>
    <a-upload
      :customRequest="handleUpload"
      :fileList="fileList"
      :remove="handleRemove"
      :beforeUpload="beforeUpload"
    >
      <a-button>
        <a-icon type="upload" />Upload
      </a-button>
    </a-upload>

    <!-- 进度条 -->
    <div style="padding-top:10px;">
      <a-progress v-show="showProgress" size="small" :percent="uploadPercent" />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      currentFile: null,
      fileList: [],
      uploadPercent: 0,
      showProgress: false
    };
  },
  methods: {
    handleRemove(file) {
      const index = this.fileList.indexOf(file);
      const newFileList = this.fileList.slice();
      newFileList.splice(index, 1);
      this.fileList = newFileList;
    },
    handleChange({ file, fileList }) {
      if (file.status !== "uploading") {
        console.log(file, fileList);
      }
      console.log(this.defaultFileList);
    },
    beforeUpload(file) {
      console.log(file);
      const isXls =
        file.type ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
        file.type === "application/vnd.ms-excel"; //文件格式限制
      if (!isXls) {
        this.$message.error("You can only upload Xls file!");
      }
      const isLt2M = file.size / 1024 / 1024 < 2; //大小限制
      if (!isLt2M) {
        this.$message.error("Image must smaller than 2MB!");
      }
      return isXls && isLt2M;
    },
    handleUpload(e) {
      var that = this;
      var file = e.file;
      console.log(file);
      const formData = new FormData();
      formData.append("file", file);
      var config = {
        onUploadProgress: progressEvent => {
          that.showProgress = true;
          var complete =
            ((progressEvent.loaded / progressEvent.total) * 100) | 0;
          that.uploadPercent = complete;
        }
      };
      this.axios
        .post(
          "http://jsonplaceholder.typicode.com/posts/",
          {
            data: formData
          },
          config
        )
        .then(function(response) {
          that.showProgress = false;
          that.$message.success("upload successfully.");
          that.fileList = [...that.fileList, file];
          console.log(response);
        })
        .catch(function(error) {
          that.showProgress = false;
          console.log(error);
        });
    }
  }
};
</script>