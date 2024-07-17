<template>
  <div :class="[bem.b(),bem.is('selected',isSelect)]">
    <div :class="bem.e('content')" :style="{paddingLeft:`${node.level*16}px`}">
        <span v-if="!node.isLeaf"  :class="[bem.e('expanded-icon'), {expanded:expanded&&!node?.isLeaf}]" @click="changeExpand">></span>
        <span class="test-mixin" @click="handleSelected">{{ node?.label }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import {treeNodeProps,treeToggleEmits } from './tree'
import { AddCircle } from "@vicons/ionicons5"
import { createNamespace } from "@kg01/utils/create"
import { computed } from 'vue'
import { handleError } from 'vue';

const props=defineProps(treeNodeProps)
const emit=defineEmits(treeToggleEmits)
function changeExpand(){
  emit('toggle',props.node)
}
const bem=createNamespace('tree-node')
const isSelect=computed(()=>{
  // console.log(props.node.key);
  return props.selectKeyRef.includes(props.node.key)
})
function handleSelected(){
  emit('select',props.node)
}
</script>

