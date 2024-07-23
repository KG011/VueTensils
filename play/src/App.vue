<script setup lang="ts">
import { AddCircle } from "@vicons/ionicons5"
import { ref } from 'vue'
import { TreeOptions } from "@kg01/components/tree"
import { Key } from "../../packages/components/tree"
import { Random } from "mockjs"
import Item from './item.vue'
function createData(level = 4, parentKey = ''): any {
    if (!level) return []
    const arr = new Array(6 - level).fill(0)
    return arr.map((_, idx: number) => {
        const key = parentKey + level + idx
        return {
            label: createLabel(level),//显示内容
            key,//唯一性
            children: createData(level - 1, key)//孩子
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
const check = ref<Boolean>(true)
function handleClick() {
    console.log(1);
}
function handleChange(val: boolean) {
    console.log(val);

}

////
const totalCount = 100
interface DataType {
    id: number,
    name: string,
    desc: string,
    index: number
}
const dataList: Array<DataType> = []
let index = 0
while (index++ !== totalCount) {
    dataList.push({
        id: index,
        name: Random.name(),
        desc: Random.csentence(),
        index
    })
}
const items = ref(dataList)
</script>

<template>
    <!-- <z-button size="normal" type="primary" :round="true" :loading="false" @click="handleClick">按钮</z-button>

    <z-icon :color="'red'" :size="'14'">
        <AddCircle></AddCircle>
    </z-icon> -->
    <z-tree :data="data" :on-load="handleLoad" v-model:selected-keys="value" select-able multiple :disabled="true"
        show-checkbox>
        <template #default="{ node }">{{ node?.key }}--{{ node?.label }}</template>
</z-tree>
    <!-- <z-checkbox v-model="check" label="节点" :indeterminate="true" @change="handleChange"></z-checkbox> -->
    <z-virtual-list class="z-virtual-list" :data-soures="items" data-key="id" :keep="6" :item-size="80">
        <!-- <Item></Item> -->
    </z-virtual-list>

</template>

<style scoped>
.z-virtual-list {
    width: 100%;
    height: 500px;
    overflow-y: scroll;
    border: 3px solid red;
}
</style>
