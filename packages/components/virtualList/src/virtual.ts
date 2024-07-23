import { RangeOptions, updataType, VirtualOptions } from "./virtualList";

export function initVirtual(param:VirtualOptions,update:updataType){
    let offsetValue=0//没滚动前的偏移量
    const range:RangeOptions={
        start:0,
        end:0,
        padFront:0,
        padBehind:0
    }
    function getPadFront(){
        return param.itemSize*range.start
    }
    function getPadBehind(){
        const lastIndex=param.uniqueId.length-1
        return (lastIndex-range.end)*param.itemSize
    }
    function updateRange(start:number,end:number){
        range.start=start
        range.end=end
        range.padFront=getPadFront()
        range.padBehind=getPadBehind()
        update({...range})
    }
    function checkRange(start:number,end:number){
        
        const total=param.uniqueId.length
        const keep=param.keep
        if(total<keep){
            start=0
            start=total-1
        }else if(end-start<=keep-1){
            start=end-keep+1
        }
        updateRange(start,end)
    }
    function getScrollOvers(){
        return Math.floor(offsetValue/param.itemSize)
    }
    function getEndByStart(start:number){
        const computEnd=start+param.keep-1+param.buffer;
        const end=Math.min(computEnd,param.uniqueId.length-1)
        return end
    }
    function handleFront(){
        //划过多少个
        const overs=getScrollOvers()
        if(overs>range.start){
            return
        }
        const start=Math.max(overs-param.buffer,0)
        checkRange(start,getEndByStart(overs))
    }
    function handleBehind(){
        const overs=getScrollOvers()
        if(overs<range.start+param.buffer){
            return
        }
        checkRange(overs-param.buffer,getEndByStart(overs))
    }
    function handleScroll(offset:number){
        const direction=offset<offsetValue?'FRONT':'BEHIND'
        offsetValue=offset
        if(direction==='FRONT'){
            handleFront()
        }else if(direction==='BEHIND'){
            handleBehind()
        }
    }
    checkRange(0,param.keep-1+param.buffer)
    return{
        handleScroll
    }
}