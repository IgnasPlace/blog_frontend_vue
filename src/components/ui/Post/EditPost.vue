<script setup lang="ts">
import { ref } from 'vue'
import UiButton from '../UiButton.vue'

const updating = ref(false)
const updateFailed = ref(false)

const updatePostHandler = () => {}
</script>
<template>
  <div>
    <h3>Edit Post</h3>
    <form @submit="updatePostHandler">
      <div className="{styles.inputContainer}">
        <label for="title">Title:</label>
        <textarea id="title" />
        <span>Please add the title</span>
      </div>
      <div>
        <label for="content">Content:</label>
        <textarea id="content" />
        <span> Please add the content </span>
      </div>
      <h2 v-if="updating">Updating...</h2>
      <div v-else className="{styles.actions}">
        <UiButton title="Cancel" type="cancel" />
        <UiButton title="Save" type="save" class="editConfirm" />
      </div>
      <h4 v-if="updateFailed">{{ updateFailed }}</h4>
    </form>
  </div>
</template>
