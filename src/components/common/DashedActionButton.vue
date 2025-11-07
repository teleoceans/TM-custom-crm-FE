<template>
  <button
    type="button"
    :class="[
      'flex h-10 items-center justify-center gap-6 rounded-lg border-[1.5px] border-dashed border-primary-800 bg-transparent px-4 text-base font-semibold text-primary-800 transition-colors hover:border-primary-500 hover:text-primary-500 dark:border-white dark:text-white dark:hover:border-white dark:hover:text-white dark:hover:bg-gray-700/40',
      widthClass,
    ]"
    @click="$emit('click', $event)"
  >
    <slot name="icon">
      <component :is="icon" v-if="icon" class="h-4 w-4" />
    </slot>
    <span
      ><slot>{{ label }}</slot></span
    >
  </button>
</template>

<script setup>
const props = defineProps({
  label: {
    type: String,
    default: "",
  },
  icon: {
    type: [Object, Function],
    default: null,
  },
  widthClass: {
    type: String,
    default: "w-64",
  },
});

defineEmits(["click"]);
</script>
