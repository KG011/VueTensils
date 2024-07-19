<template>
  <div :class="[bem.b(),bem.is('selected',isSelect)]">
    <div :class="bem.e('content')" :style="{paddingLeft:`${node.level*16}px`}">
        <span v-if="!node.isLeaf"  :class="[bem.e('expanded-icon'), {expanded:expanded&&!node?.isLeaf}]" @click="changeExpand">></span>
        <ZCheckbox v-if="showCheckbox" 
        :model-value="checked"
        :disabled="disabled"
        :indeterminate="indeterminate"
        @change="handleChange"
        ></ZCheckbox>
        <span class="test-mixin" @click="handleSelected">
          <zTreeNodeContent :node="node"></zTreeNodeContent>
        </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import {treeInjectKey, treeNodeProps,treeToggleEmits } from './tree'
import { AddCircle } from "@vicons/ionicons5"
import { createNamespace } from "@kg01/utils/create"
import { computed, inject } from 'vue'
import { handleError } from 'vue';
import zTreeNodeContent from './treeNodeContent'
import ZCheckbox from '@kg01/components/checkbox'
const props=defineProps(treeNodeProps)
const emit=defineEmits(treeToggleEmits)
defineOptions({
  name: 'z-tree-node'
})
function changeExpand(){
  emit('toggle',props.node)
}
const bem=createNamespace('tree-node')
const isSelect=computed(()=>{
  // console.log(props.node.key);
  return props.selectKeyRef.includes(props.node.key)
})
function handleChange(val:boolean){
  emit('change',props.node,val)

}
function handleSelected(){
  emit('select',props.node)
}
const treeContext = inject(treeInjectKey)
// 使用可选链和类型检查
if (treeContext?.slots.default && typeof treeContext.slots.default === 'function') {
  console.log(treeContext.slots.default(props.node))
} else {
  console.log('Default slot is not a function')
}
</script>

