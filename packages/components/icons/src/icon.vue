<template>
  <i :class=bem.b() :style="style">
    <slot></slot>
  </i>
</template>
<script setup>
import {createNamespace} from "@kg01/utils/create"
import { computed } from "vue"
import { iconProps } from "./icon"
defineOptions({
    name:'z-icon'
})
const bem=createNamespace('icon')
const props=defineProps(iconProps)
const style=computed(()=>{
    if(!props.size&&!props.color) return{}
    return{
        ...(props.size?{"font-size":props.size+'px'}:''),
        ...(props.color?{"color":props.color}:'')
    }
})
</script>

<style lang="less" scoped></style>
