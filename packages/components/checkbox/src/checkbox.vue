<template>
  <label class="">
    <span :class="bem.e('input')">
        <input type="checkbox" v-model="checkboxModel" ref="inputRef" :disabled=disabled @change="handleChange">
    </span>
    <span v-if="$slots.default||label" :class="bem.e('label')"> 
        <slot></slot>
        <template v-if="!$slots.default">{{label }}</template>
    </span>
  </label> 
</template>

<script setup lang="ts">
import { createNamespace } from "@kg01/utils/create"
import { computed,onMounted,ref,watch } from "vue" 
import { checkboxProps,checkboxEmits } from "./checkbox";
defineOptions({
    name:'z-checkbox'
})
const bem=createNamespace('checkbox')
const props=defineProps(checkboxProps)
const emits=defineEmits(checkboxEmits)
const checkboxModel=computed<any>({
  get(){
    return props.modelValue
  },
  set(val){
    emits('update:modelValue',val)
  }
})
const inputRef=ref<HTMLInputElement>()
function indeterminate(val:boolean){
  inputRef.value!.indeterminate=val

}
watch(() => props.indeterminate, indeterminate)
function handleChange(e:Event){
  const target=e.target as HTMLInputElement
  const value=target.checked?true:false
  emits('change',value)
}
onMounted(()=>{
  indeterminate(props.indeterminate)
})
</script>

<style lang="less" scoped></style>
