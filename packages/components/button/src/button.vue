<template>
  <button 
  :class="[
    bem.b(),
    bem.m(size),
    bem.m(type),
    bem.is('round',round),
    bem.is('loading',loading),
    bem.is('disabled',disabled),
    ]"
    :nativeType="nativeType" :disabled="disabled||loading"
    >
        <slot></slot>
    </button>
</template>

<script setup>
import { createNamespace } from "@kg01/utils/create"
import {} from "vue"
import {buttonProps,buttonEmits} from './button'
defineOptions({
  name: 'z-button'
})
const bem=createNamespace('button')
const props=defineProps(buttonProps)
const emits=defineEmits(buttonEmits)
</script>

<style lang="less" scoped></style>
