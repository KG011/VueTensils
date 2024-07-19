import {ExtractPropTypes,InjectionKey,PropType, SetupContext} from 'vue'
//递归树接口类型
export type Key=string|number
export interface TreeNode extends Required<TreeOptions>{
    level:number,
    rawNode:TreeOptions,
    children:TreeNode[],
    isLeaf:boolean,
    parentKey:Key|undefined
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
        default:'key'
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
    showCheckbox:{
        type:Boolean,
        default:false
    },
    defaultCheckedKeys:{
        type:Array as PropType<Key[]>,
        default:()=>[]
    },
    disabled:Boolean,
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
    },
    showCheckbox:{
        type:Boolean,
        default:false
    },
    checked:Boolean,
    disabled:Boolean,
    indeterminate:Boolean
} as const
export const treeNodeContentProps={
    node:{
        type:Object as PropType<TreeNode>,
        required:true
    }
}
export const treeToggleEmits={
    toggle:(node:TreeNode)=>node,
    select:(node:TreeNode)=>node,
    change:(node:TreeNode,val:boolean)=>typeof val=='boolean',
}
//同步响应式数据
export const treeEmits={
    'update:selectedKeys':(keys:Key[])=>{
        return keys
    }
}
//接收插槽
export interface TreeContext{
    slots:SetupContext['slots']
}
//插槽名称，拿来提供出去
export const treeInjectKey:InjectionKey<TreeContext>=Symbol()
//Partial<>将对象属性设为可选属性，可传可不传
export type TreeProps=Partial<ExtractPropTypes<typeof treeProps>>
export type TreeNodeProps=Partial<ExtractPropTypes<typeof treeNodeProps>>