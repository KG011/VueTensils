<script setup lang="ts">
import { AddCircle } from "@vicons/ionicons5"
import {ref} from 'vue'
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
function createLabel(level:number):string{
    if(level===4) return '道生一'
    if(level===3) return '二生一'
    if(level===2) return '三生一'
    if(level===1) return '四生一'
    return ''
}
const data=ref<any>(createData())
</script>

<template>
    <z-icon :color="'red'" :size="'14'">
        <AddCircle></AddCircle>
    </z-icon>
    <z-tree :data="data" labelField="label" keyField="key" childrenField="children" >awdad</z-tree>
</template>

<style scoped></style>
