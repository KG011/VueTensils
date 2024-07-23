<template>
  <div class="item">
    <!-- <div class="head">
        <span>{{ data.index }}</span>
        <span>{{ data.name }}</span>
    </div>
    <div class="body">
        <span>{{ data.desc }}</span>
    </div> -->
    item
  </div>
</template>

<script setup>
import {} from "vue"
defineProps({
    data:{
        type:Object,
        default:()=>{}
    }
})
</script>

<style lang="less" scoped></style>
