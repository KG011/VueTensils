import {ExtractPropTypes,PropType} from 'vue'
//递归树接口类型
export type Key=string|number
export interface TreeNode extends Required<TreeOptions>{
    level:number,
    rawNode:TreeOptions,
    children:TreeNode[],
    isLeaf:boolean
}
//用户传参接口类型
export interface TreeOptions{
    label?:Key,
    key?:Key,
    children?:TreeOptions[],
    isLeaf:boolean,
    [key:string]:unknown
}
//用户传参接口props
export const treeProps={
    data:{
        type:Array as PropType<TreeOptions[]>,
        default:()=>[]
    },
    labelField:{
        type:String,
        default:'label'
    },
    keyField:{
        type:String,
        default:'label'
    },
    childrenField:{
        type:String,
        default:'children'
    },
    defalutExpandedKey:{// 需要默认展开的树s
        type:Array as PropType<Key[]>,
        default:()=>[]
    },
    selectedKeys:{
        type:Array as PropType<Key[]>,
    },
    selectAble:{
        type:Boolean,
        default:true

    },
    multiple:{
        type:Boolean,
        default:true
    },
    onLoad:Function as PropType<(node:TreeOptions)=>Promise<TreeOptions[]>>
} as const
export const treeNodeProps={
    node:{
        type:Object as PropType<TreeNode>,
        required:true,
        default: () => ({ level: 0 })
    },
    expanded:{
        type:Boolean,
        required:true
    },
    selectKeyRef:{
        type:Array as PropType<Key[]>,
        default:()=>[]
    }
} as const
export const treeToggleEmits={
    toggle:(node:TreeNode)=>node,
    select:(node:TreeNode)=>node,
}
//同步响应式数据
export const treeEmits={
    'update:selectedKeys':(keys:Key[])=>{
        return keys
    }
}
//Partial<>将对象属性设为可选属性，可传可不传
export type TreeProps=Partial<ExtractPropTypes<typeof treeProps>>
export type TreeNodeProps=Partial<ExtractPropTypes<typeof treeNodeProps>>