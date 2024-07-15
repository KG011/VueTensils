import {ExtractPropTypes,PropType} from 'vue'
//递归树接口类型
export interface TreeNode extends Required<TreeOptions>{
    level:Number,
    rawNode:TreeOptions,
    children:TreeNode[],
}
//用户传参接口类型
export interface TreeOptions{
    label?:string|number,
    key?:string|number,
    children:TreeOptions[],
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
} as const
//Partial<>将对象属性设为可选属性，可传可不传
export type TreeProps=Partial<ExtractPropTypes<typeof treeProps>>