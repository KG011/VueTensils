<script setup lang="ts">
import { AddCircle } from "@vicons/ionicons5"
import { ref, watch } from 'vue'
import { TreeOptions } from "@kg01/components/tree"
import { Key } from "../../packages/components/tree"
function createData(level=4,parentKey=''):any{
    if(!level) return []
    const arr=new Array(6-level).fill(0)
    return arr.map((_,idx:number)=>{
        const key =parentKey+level+idx
        return {
            label:createLabel(level),//显示内容
            key,//唯一性
            children:createData(level-1,key)//孩子
        }
    })
}
function createLabel(level: number): string {
    if (level === 4) return '一生一'
    if (level === 3) return '二生一'
    if (level === 2) return '三生一'
    if (level === 1) return '四生一'
    return ''
}
// function createData() {
//     return [
//         {
//             label: nextLabel(),
//             key: 1,
//             isLeaf: false
//         },
//         {
//             label: nextLabel(),
//             key: 2,
//             isLeaf: false
//         },
//     ]
// }
// function nextLabel(currentLabel?: string | number): string {
//     if (!currentLabel) return 'out of tao,one is born'
//     if (currentLabel === 'out of tao,one is born') return 'out of one,two'
//     if (currentLabel === 'out of one,two') return 'out of two,three'
//     if (currentLabel === 'out of two,three') return 'out of three,the created universe'
//     if (currentLabel === 'out of three,the created universe') return 'out of tao,one is born'
//     return ''
// }
const data = ref<any>(createData())
function handleLoad(node: TreeOptions) {
    return new Promise<TreeOptions[]>((resolve, reject) => {
        setTimeout(() => {
            resolve([{
                label: nextLabel(node.label),
                key: node.key + nextLabel(node.label),
                isLeaf: false
            }])
        }, 1000)
    })
}
const value = ref<Key[]>([])
// watch(
//     () => value.value,
//     () => {
//         console.log(value.value);
        
//     })
</script>

<template>
    <z-icon :color="'red'" :size="'14'">
        <AddCircle></AddCircle>
    </z-icon>
    <z-tree :data="data" :on-load="handleLoad" v-model:selected-keys="value" selectAble multiple>
        <!-- 允许用户自定义结构内容（传html） -->
        <template #default="{node}">{{ node?.key }}--{{ node?.label }}</template>
    </z-tree>
    <!-- <z-tree :data="data" labelField="label" keyField="key" childrenField="children"
        :defalut-expanded-key="['40', '41', '4030']">awdad</z-tree> -->
</template>

<style scoped></style>
