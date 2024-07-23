<template>
  <div  @scroll="onScroll" ref="root">
    <div :style="paddingStyle" >
      <div v-for="item in slots" :key="item.key" :data-index="item.key" style="height:80px">
        <span>{{ item.key }}-{{ item.dataSoure.desc }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, onMounted, reactive, ref } from "vue"
import { RangeOptions, updataType, virtualListProps, VirtualOptions } from './virtualList'
import { initVirtual } from './virtual'
defineOptions({
  name: 'z-virtual-list'
})
const props = defineProps(virtualListProps)
const range = ref<RangeOptions>({
  start: 0,
  end: 0,
  padFront: 0,
  padBehind: 0
})
const slots = ref()
const paddingStyle = computed(() => {
  return {
    padding: `${range.value.padFront}px 0 ${range.value.padBehind}px 0`
    // padding: `800px 0 ${range.value.padBehind}px 0`
  };
});
let virtual: ReturnType<typeof initVirtual>
const update: updataType = (newRange) => {
  range.value = newRange
  slots.value = getRenderComponent()

}
const getUniqueId = (): string[] => {
  const { dataSoures, dataKey } = props
  return dataSoures.map((dataSoure) => (dataSoure as any)[dataKey as any]) as string[]
}
const installVirtual = () => {
  virtual = initVirtual({
    keep: props.keep,
    buffer: Math.round(props.keep / 3),//缓冲区
    uniqueId: getUniqueId(),
    itemSize: props.itemSize
  }, update)

}
function getRenderComponent() {
  const slots = []
  const { start, end } = range.value!
  const { dataSoures, dataKey } = props
  for (let i = start; i <= end; i++) {
    const dataSoure = dataSoures[i]
    const uniqueId = (dataSoure as any)[dataKey]
    if (dataSoure) {
      slots.push({ key: uniqueId, dataSoure })
      // slots.push(<dateComponent></dateComponent>)
    }
  }
  return slots
}
const root = ref<HTMLElement | null>()
function onScroll() {
  if (root.value) {
    const offset = root.value.scrollTop
    virtual.handleScroll(offset)
  }
}
onBeforeMount(() => {
  installVirtual()
})
// onMounted(() => {
//   slots.value = getRenderComponent()

// })
</script>

<style lang="less" scoped></style>
