import { computed, defineComponent, inject } from "vue";
import { treeNodeContentProps } from "./tree";
import { treeInjectKey } from './tree'
export default defineComponent({
    name: 'zTreeNodeContent',
    props: treeNodeContentProps,
    setup(props) {
        const treeContext = inject(treeInjectKey)
        const node = computed(()=>props.node)
        return () => {
            return treeContext?.slots.default?treeContext?.slots.default({node:node.value}):node.value?.label
        }
    }
})