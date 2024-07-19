import { ExtractPropTypes, PropType } from "vue";

export const checkboxProps={
    modelValue:{
        type:[Boolean,String,Number] as PropType<Boolean|String|Number>
    },
    disabled:Boolean,
    indeterminate:Boolean,
    label:{
        type:String as PropType<string>
    } as const
}
export const checkboxEmits={
    'update:modelValue':(val:boolean|string|number)=>true,
    'change':(val:boolean)=>true
}
export type checkboxProps=ExtractPropTypes<typeof checkboxProps>
export type checkboxEmits=ExtractPropTypes<typeof checkboxEmits>
