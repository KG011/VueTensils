import { ExtractPropTypes, PropType } from "vue"
//size 组件的大小
//type 颜色类型
//round 是否为圆角
//loading 是否按钮正在加载
//disabled 是否禁用按钮
//native-type 原始类型
//icon-placement 图标位置
export type Size='small'|'normal'|'large'
export type Type='primary'|'success'|'warning'|'danger'|'info'|'default'|''
export type NativeType='button'|'submit'|'reset'
export type iconPlacement='left'|'right'
export const buttonProps={
    size:String as PropType<Size>,
    type:{
        type:String as PropType<Type>,
        validator:(val:string)=>{
            return ['primary','success','warning','danger','info','default',''].includes(val)
        },
        default:''
    },
    round:Boolean,
    loading:Boolean,
    disabled:Boolean,
    nativeType:{
        type:String as PropType<NativeType>,
        default:'button'
    },
    iconPlacement:String as PropType<iconPlacement>

} as const
export const buttonEmits={
    click:(e:MouseEvent)=>e instanceof MouseEvent,
    mousedown:(e:MouseEvent)=>e instanceof MouseEvent,
}
//使用 ExtractPropTypes<typeof buttonProps>，提取出props类型：
export type buttonProps=ExtractPropTypes<typeof buttonProps>
export type buttonEmits=typeof buttonProps