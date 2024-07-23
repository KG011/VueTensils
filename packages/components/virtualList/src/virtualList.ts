import { DefineComponent, defineComponent, ExtractPropTypes, PropType } from "vue"

export const virtualListProps={
    dataSoures:{
        type:Array,
        required:true,
        default:()=>[] 
    },
    dataKey:{
        type:String,
        required:true
    },
    keep:{
        type:Number,
        default:30
    },
    itemSize:{
        type:Number,
        default:80
    }
    // ,
    // dateComponent:{
    //     type:[Object,Function] as PropType<DefineComponent<{},{},any>>,
    //     required:true
    // }
} as const
export type virtualListType=ExtractPropTypes<typeof virtualListProps>
export type RangeOptions={
    start:number,
    end:number,
    padFront:number,
    padBehind:number
}
export type VirtualOptions={
    keep:number,
    buffer:number,
    uniqueId:string[],
    itemSize:number
}
export type updataType=(range:RangeOptions)=>void