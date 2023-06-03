<template>
  <div class="upload-files">
    <div v-if="currentFile" class="progress">
      <div
        class="progress-bar"
        role="progressbar"
        :aria-valuenow="progress"
        aria-valuemin="0"
        aria-valuemax="100"
        :style="{ width: progress + '%' }"
      >
        {{ progress }}%
      </div>
    </div>

    <div class="file-input">
      <label class="custom-file-upload">
        <input type="file" ref="file" @change="selectFile" />
        Select File
      </label>
    </div>

    <button class="upload-button" :disabled="!selectedFiles" @click="upload">
      Upload
    </button>

    <div class="alert" role="alert">{{ message }}</div>

    <div class="table-list">
      <div class="table-header">List of Files</div>
      <ul class="table-items">
        <li
          class="table-item"
          v-for="(file, index) in fileInfos"
          :key="index"
        >
          <a :href="file.url" :download="file.name">{{ file.name }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import UploadService from "./services/UploadFilesService";

export default {
  name: "upload-files",
  data() {
    return {
      selectedFiles: undefined,
      currentFile: undefined,
      progress: 0,
      message: "",

      fileInfos: [],
    };
  },
  methods: {
    selectFile() {
      this.selectedFiles = this.$refs.file.files;
    },

    upload() {
      this.progress = 0;

      this.currentFile = this.selectedFiles.item(0);
      UploadService.upload(this.currentFile, (event) => {
        this.progress = Math.round((100 * event.loaded) / event.total);
      })
        .then((response) => {
          this.message = response.data.message;
          return UploadService.getFiles();
        })
        .then((files) => {
          this.fileInfos = files.data;
        })
        .catch(() => {
          this.progress = 0;
          this.message = "Could not upload the file!";
          this.currentFile = undefined;
        });

      this.selectedFiles = undefined;
    },
  },
  mounted() {
    UploadService.getFiles().then((response) => {
      this.fileInfos = response.data;
    });
  },
};
</script>

<style scoped>
.upload-files {
  font-family: Arial, sans-serif;
}

.progress {
  margin-bottom: 10px;
}

.progress-bar {
  height: 10px;
  background-color: #f3f3f3;
  width: 0;
  transition: width 0.3s ease-in-out;
}

.file-input {
  margin-bottom: 20px;
}

.custom-file-upload {
  display: inline-block;
  padding: 6px 12px;
  cursor: pointer;
  border: 1px solid #ccc;
  background-color: #f3f3f3;
  color: #333;
}

a {
  color: rgb(54, 54, 54);
}

.upload-button {
  display: block;
  margin-bottom: 10px;
  padding: 6px 12px;
  background-color: #28a745;
  color: #fff;
  border: none;
  cursor: pointer;
  margin-left: auto;
  margin-right: auto;
}

.alert {
  margin-top: 10px;
}

.table-list {
  margin-top: 20px;
  background-color: #fff;
  color: #333;
  border-radius: 4px;
  padding: 10px;
}

.table-header {
  font-weight: bold;
  margin-bottom: 10px;
}

.table-items {
  list-style-type: none;
  padding-left: 0;
}

.table-item {
  padding: 10px;
  border-bottom: 1px solid #ccc;
}

.table-item:last-child {
  border-bottom: none;
}
</style>
