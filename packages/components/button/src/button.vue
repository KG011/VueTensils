<template>
  <button 
  :class="[
    bem.b(),
    bem.m(size),
    bem.m(type),
    bem.is('round',round),
    bem.is('loading',loading),
    bem.is('disabled',disabled||loading),
    ]"
    :nativeType="nativeType" :disabled="disabled||loading"
    @click="emitClick"
    @mousedown="emitMousedown"
    >
        <slot></slot>
    </button>
</template>

<script setup lang="ts">
import { createNamespace } from "@kg01/utils/create"
import {} from "vue"
import {buttonProps,buttonEmits} from './button'
defineOptions({
  name: 'z-button'
})
const bem=createNamespace('button')
const props=defineProps(buttonProps)
const emits=defineEmits(buttonEmits)
function emitClick(e:MouseEvent){
  emits('click',e)
}
function emitMousedown(e:MouseEvent){
  emits('mousedown',e)
}
</script>

<style lang="less" scoped></style>
