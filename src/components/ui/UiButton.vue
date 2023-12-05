<script setup lang="ts">
const props = defineProps(['type', 'title', 'onClick'])

let color = 'px-4 rounded-md '
if (props.type === 'delete') {
  color += 'bg-red-200 border-2 border-red-200 hover:bg-red-300 hover:border-red-300'
} else if (props.type === 'edit') {
  color += 'bg-violet-200 border-2 border-violet-200 hover:border-violet-300 hover:bg-violet-300 '
} else if (props.type === 'save') {
  color += 'bg-green-200 border-2 border-green-200 hover:border-green-300 hover:bg-green-300'
} else if (props.type === 'cancel') {
  color += 'border-2 border-gray-200 hover:border-gray-300'
}
</script>
<template>
  <button @click="$emit('click')" :class="color">{{ title }}</button>
</template>
