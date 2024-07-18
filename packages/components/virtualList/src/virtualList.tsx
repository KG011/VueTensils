import { defineComponent } from "vue";

export default defineComponent({
    name: 'zVirtualList',
    props: {
        flattenTree: {
            type: Array,
            default: () => []
        },
        max: {
            type: Number,
            default: 8
        },
        size: {
            type: Number,
            default: 35
        }
    },
    setup(props) {
        return () => {
            return
        }
    }
})