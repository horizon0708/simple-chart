
export function followWidthOnResize(idToChange: string, targetClassName: string){
    window.addEventListener("resize", ()=>{
        let change = document.getElementById(idToChange);
        const targetWidths = Array.prototype.map.call(document.getElementsByClassName(targetClassName), (x:any)=>x.clientWidth);
        if(targetWidths.length>0){
            const sum = targetWidths.reduce((a:number,b:number)=> a+b);
            if(change !== null){
                console.log("fired");
                change.style.width = `${sum}px`
            }
        }

    } ,true);
}

export function initialResize(idToChange: string , targetClassName: string){
    let change = document.getElementById(idToChange);
    const targetWidths = Array.prototype.map.call(document.getElementsByClassName(targetClassName), (x:any)=>x.clientWidth);
    if(targetWidths.length>0){
        const sum = targetWidths.reduce((a:number,b:number)=> a+b);
        if(change !== null){
            change.style.width = `${sum}px`
        }
    }
}