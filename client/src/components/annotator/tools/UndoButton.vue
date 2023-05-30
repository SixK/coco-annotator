<template>
<div>
      <i v-tooltip.right="name" class="fa fa-x" :class="icon" :style="{ color: iconColor }" @click="click(execute, disabled)"></i><br>
</div>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import { useStore } from "vuex";
import { useButton } from "@/composables/toolBar/button";

const store = useStore();
// const { iconColor, click, color } = useButton();
const { iconColor, click } = useButton();

const icon = ref("fa-undo");
const disabled = ref(true);
const undoList = computed(() => store.state.undo);

const name = computed(() => {
  let length = undoList.value.length;
  if (length == 0) {
    return "Nothing to undo";
  }

  let last = undoList.value[length - 1];
  return "Undo (Last Action: " + last.name + " " + last.action + ")";
});
const execute = () => {
  store.commit("undo");
};

watch(
  undoList.value,
  () => {
    disabled.value = undoList.value.length === 0;
    /*
    iconColor.value = disabled.value
      ? color.disabled
      : color.enabled;*/
  },
  { immediate: true }
  );
  
</script>
