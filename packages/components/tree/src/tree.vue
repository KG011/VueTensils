<template>
  <div :class=bem.b()>
    <z-tree-node 
    v-for="node in flattenTree" 
    :key="node.key" 
    :node="node" 
    :expanded="isExpanded(node)"
    :selectKeyRef="selectKeyRef"
    @select="handleSelect"
    @toggle="toggleExpand">
    </z-tree-node>
  </div>
</template>

<script setup lang="ts">
import { computed, provide, ref, useSlots, watch } from "vue"
import { Key, treeEmits, treeInjectKey, TreeNode, TreeOptions, treeProps } from './tree'
import { createNamespace } from "@kg01/utils/create"
import ZTreeNode from './treeNode.vue'
defineOptions({
  name: 'z-tree'
})
const props = defineProps(treeProps)
const emit = defineEmits(treeEmits)
const bem = createNamespace('tree')
const tree = ref<TreeNode[]>([])

//统一用户自定义输入变量名
const treeOptions = createOptions(
  props.labelField,
  props.keyField,
  props.childrenField,
)
function createOptions(label: string, key: string | number, children: string) {
  return {
    getKey(node: TreeOptions) {

      return node.key as string
    },
    getLabel(node: TreeOptions) {
      return node[label] as string
    },
    getChildren(node: TreeOptions) {
      return node[children] as TreeOptions[]
    },
  }
}
//将用户输入的数据进行格式化
function createTree(data: TreeOptions[], parent: TreeNode | null = null) {
  function recursion(data: TreeOptions[], parent: TreeNode | null = null) {
    return data.map(node => {
      const children = treeOptions.getChildren(node) || []
      const treeNode: TreeNode = {
        label: treeOptions.getLabel(node),
        key: treeOptions.getKey(node),
        children: [],
        level: parent ? parent.level + 1 : 0,
        rawNode: node,
        isLeaf: node.isLeaf ?? children.length == 0
      }
      //递归子元素
      children.length > 0 ? treeNode.children = recursion(children, treeNode) : ''
      return treeNode
    })
  }
  const result: TreeNode[] = recursion(data, parent)
  return result
}
watch(() => props.data, (data: TreeOptions[]) => {
  tree.value = createTree(data)
}, {
  immediate: true
})

const expandedKeySet = ref(new Set(props.defalutExpandedKey))
//拍平
const flattenTree = computed(() => {
  const expandedKeys = expandedKeySet.value//默认需要展开的数组
  const flattenNodes: TreeNode[] = []//拍平最终结果
  const nodes = tree.value || []//格式化数组
  const stack: TreeNode[] = []
  for (let i = nodes.length - 1; i >= 0; i--) {
    stack.push(nodes[i])
  }
  //深度遍历
  while (stack.length) {
    const node = stack.pop()
    if (!node) continue
    flattenNodes.push(node)
    if (expandedKeys.has(node.key)) {
      const children = node.children
      for (let i = children.length - 1; i >= 0; i--) {
        stack.push(children[i])
      }
    }
  }
  return flattenNodes
})
function isExpanded(node: TreeNode): boolean {
  return expandedKeySet.value.has(node.key)
}
//折叠
function collpase(node: TreeNode) {
  expandedKeySet.value.delete(node.key)
}
//正在加载的数组
const loadingKeyRef = ref(new Set<Key>())
//异步加载children数据
function triggerLoading(node: TreeNode) {
  if (!node.children.length && !node.isLeaf) {
    const loadingKey = loadingKeyRef.value
    if (!loadingKey.has(node.key)) {
      loadingKey.add(node.key)
      const onLoad = props.onLoad
      if (onLoad) {
        onLoad(node.rawNode).then((children) => {
          node.rawNode.children = children
          node.children = createTree(children, node)
          loadingKey.delete(node.key)

        })
      }
    }
  }
}
//展开
function expand(node: TreeNode) {
  expandedKeySet.value.add(node.key)
  triggerLoading(node)
}
//切换
function toggleExpand(node: TreeNode) {
  const expandedKey = expandedKeySet.value
  if (expandedKey.has(node.key) && !loadingKeyRef.value.has(node.key)) {
    collpase(node)
  } else {
    expand(node)
  }
}
//实现选中
const selectKeyRef = ref<Key[]>([])
watch(
  () => props.selectedKeys,
  value => {
    if (value) {
      selectKeyRef.value = value
    }
  },
  {
    immediate: true
  }
)
function handleSelect(node:TreeNode){
  let keys=Array.from(selectKeyRef.value)
  if(!props.selectAble) return

  if(props.multiple){
    const index=keys.findIndex(key=>key===node.key)
    if(index>-1){
      keys.splice(index,1)
    }else{
      keys.push(node.key)
    }
  }else{
    if(keys.includes(node.key)){
      keys=[]
    }else{
      keys=[node.key]
    }
  }
  
  emit('update:selectedKeys',keys)
}
//App.vue插槽传的提供出去
provide(treeInjectKey,{
  slots:useSlots()
})
</script>

<style lang="less" scoped></style>
