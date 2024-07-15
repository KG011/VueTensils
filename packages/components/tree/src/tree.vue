<template>
  <div :class=bem.b()>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue"
import { TreeNode, TreeOptions, treeProps } from './tree'
import { createNamespace } from "@kg01/utils/create"
defineOptions({
  name: 'z-tree'
})
const props = defineProps(treeProps)
const bem = createNamespace('tree')
const tree = ref<TreeNode[]>([])


//统一用户自定义输入变量名
const treeOptions = createOptions(
  props.labelField,
  props.keyField,
  props.childrenField,
)
function createOptions(label: string, key: string, children: string) {
  return {
    getKey(node: TreeOptions) {
      return node[key] as string
    },
    getLabel(node: TreeOptions) {
      return node[label] as string
    },
    getChildren(node: TreeOptions) {
      return node[children] as TreeOptions[]
    },
  }
}
function createTree(data: TreeOptions[]){
  function recursion(data: TreeOptions[]) {
    return data.map(node=> {
      const children=treeOptions.getChildren(node)||[]
      const treeNode:TreeNode = {
        label: treeOptions.getLabel(node),
        key: treeOptions.getKey(node),
        //递归子元素
        children: children.length>0?recursion(children):[],
        level:1,
        rawNode:node
      }
      // if(children.length>0){
      //   treeNode.children=recursion(children)
      //   console.log(children);
      // }
      // children.length>0?treeNode.children=recursion(children):''
      return treeNode
    })
  }
  const result: TreeNode[] = recursion(data)
  return result
}
watch(() => props.data, (data: TreeOptions[]) => {
  tree.value = createTree(data)
  console.log(data);
  
  console.log(tree.value);
}, {
  immediate: true
})
</script>

<style lang="less" scoped></style>
