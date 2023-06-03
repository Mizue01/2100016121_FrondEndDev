<template>
  <div class="app-container">
    <div class="app-header">
      <div class="app-title">Panda Happy Shopping</div>
    </div>
    <div class="app-content">
      <!-- Show Card Data -->
      <div class="card-container">
        <div class="card" v-for="data in posts" :key="data.id">
          <!-- Card Content -->
        </div>
      </div>
      <!-- Show Card Data -->

      <!-- Pop up modal add new -->
      <div class="modal-container" v-show="modelAdd">
        <div class="modal-background" @click="(modelAdd = false)"></div>
        <div class="modal-form">
          <div class="modal-heading">
            <h1 class="modal-title">Add New Post</h1>
          </div>
          <div class="modal-inputs">
            <input type="text" class="modal-input" placeholder="Title" v-model="data.name">
            <textarea class="modal-textarea" rows="8" cols="30" placeholder="Description" v-model="data.description"></textarea>
          </div>
          <button class="modal-button" @click="addnew">Create</button>
        </div>
      </div>
      <!-- Pop up modal add new -->

      <!-- Pop up model Update  -->
      <div class="modal-container" v-show="modelUpdate">
        <div class="modal-background" @click="(modelUpdate = false)"></div>
        <div class="modal-form">
          <div class="modal-heading">
            <h1 class="modal-title">Update Post</h1>
          </div>
          <div class="modal-inputs">
            <input type="text" class="modal-input" placeholder="Title" v-model="data.name">
            <textarea class="modal-textarea" rows="8" cols="30" placeholder="Description" v-model="data.description"></textarea>
          </div>
          <button class="modal-button" @click="updatePost">Update</button>
        </div>
      </div>
      <!-- Pop up model Update  -->
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      modelAdd: false,
      modelUpdate: false,
      data: {
        id: "",
        name: "",
        description: ""
      }
    }
  },
  computed: {
    ...mapGetters({
      posts: 'post/posts'
    })
  },
  methods: {
    addnew() {
      this.$store.dispatch('post/ADD_NEW', this.data).then(response => {
        if (response) {
          this.modelAdd = false;
          // Reset data
          this.data = {
            id: "",
            name: "",
            description: ""
          }
        }
      })
    },
    edit(id) {
      this.modelUpdate = true;
      this.$store.dispatch('post/GET_POST', id).then(response => {
        // Set data model
        this.data.id = response[0].id;
        this.data.name = response[0].name;
        this.data.description = response[0].description;
      })
    },
    updatePost() {
      this.$store.dispatch('post/UPDATE_POST', this.data).then(response => {
        if (response) {
          this.modelUpdate = false;
        }
      })
    },
    destory(id) {
      this.$store.dispatch('post/DELETE_POST', id).then(response => {
        if (response) {
          alert("ok");
        }
      })
    }
  }
}
</script>

<style scoped>
.app-container {
  font-family: Arial, sans-serif;
}

.app-header {
  padding: 20px;
  background-color: #f3f3f3;
  text-align: center;
}

.app-title {
  font-weight: bold;
  font-size: 24px;
  color: #333;
}

.app-content {
  padding: 20px;
}

.card-container {
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
}

.modal-container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.modal-form {
  position: fixed;
  top: 30%;
  left: 40%;
  background-color: #fff;
  padding: 20px;
}

.modal-heading {
  margin-bottom: 10px;
}

.modal-title {
  font-size: 18px;
  font-weight: bold;
  text-align: center;
}

.modal-inputs {
  margin-top: 10px;
}

.modal-input,
.modal-textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 10px;
}

.modal-button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background-color: #333;
  color: #fff;
  cursor: pointer;
}

.modal-button:hover {
  background-color: #444;
}

</style>
