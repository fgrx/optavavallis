<script lang="ts" setup>
import { computed, toRef } from "vue";

interface Props {
  color?: string;
  textColor?: string;
  disabled?: boolean;
  to?: string;
}

const props = withDefaults(defineProps<Props>(), {
  color: "primary",
  textColor: "white",
  typeButton: "button",
  disabled: false,
  to: "#",
});

const { color, textColor, typeButton, to } = props;

const disabledRef = toRef(props, "disabled");

const emits = defineEmits(["click", "btn-click"]);
const clickAction = () => emits("click", "btn-click");

const bgColorComputed = computed(() =>
  disabledRef.value ? "disabled" : color
);

const textColorComputed = computed(() =>
  disabledRef.value ? "light" : textColor
);
</script>

<template>
  <div class="my-3">
    <button
      @click="clickAction"
      :type="typeButton"
      :disabled="disabled"
      :class="`inline-block pulse px-6 py-3 text-md font-medium leading-6 text-center text-${textColorComputed}  transition bg-${bgColorComputed}  rounded shadow ripple focus:outline-none `"
    >
      <span class="uppercase">
        <slot></slot>
      </span>
      <span class="text-xs"><slot name="subText"></slot></span>
    </button>
  </div>
</template>

<style lang="scss" scoped>
button {
  display: inline-block;
  padding: 0.75rem 1.25rem;
  text-transform: uppercase;
  font-size: 1rem;
  transition: all 0.3s;
  position: relative;
  overflow: hidden;
  z-index: 1;
  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -2;
  }
  &:before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0%;
    height: 100%;
    transition: all 0.3s;
    z-index: -1;
  }
  &:hover {
    &:before {
      width: 100%;
    }
  }
}
</style>
