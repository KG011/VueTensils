export function createNamespace(name: string) {
    const prefixName = `z-${name}`
    return createBEM(prefixName)
}
function createBEM(prefixName: string = '') {
    const b = (block: string = '') => StringSplicing(prefixName, block, '', '')
    const e = (element: string = '') => element ? StringSplicing(prefixName, '', element, '') : ''
    const m = (modifier: string = '') => modifier ? StringSplicing(prefixName, '', '', modifier) : ''
    const be = (block: string = '', element: string = '') => block && element ? StringSplicing(prefixName, block, element, '') : ''
    const bm = (block: string = '', modifier: string = '') => block && modifier ? StringSplicing(prefixName, block, '', modifier) : ''
    const em = (element: string = '', modifier: string = '') => element && modifier ? StringSplicing(prefixName, '', element, modifier) : ''
    const bem = (block: string = '', element: string = '', modifier: string = '') => block && element && modifier ? StringSplicing(prefixName, block, element, modifier) : ''
    const is=(name:string,state:string|boolean)=>state?`is-${name}`:''
    return {
        b,
        e,
        m,
        be,
        bm,
        em,
        bem,
        is
    }
}
function StringSplicing(prefixName: string, block: string, element: string, modifier: string) {
    if (block) {
        return prefixName += `-${block}`
    }
    if (element) {
        return prefixName += `__${element}`
    }
    if (modifier) {
        return prefixName += `--${modifier}`
    }
    return prefixName
}