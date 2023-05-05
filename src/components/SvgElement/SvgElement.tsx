import React from 'react'
import { svgElementType } from './types'

export const SvgElement: React.FC<svgElementType> = (props : svgElementType) => {
    const {id ,color ,fillRule} = props
    const SvgElementPath = (props: any) => <svg width='20px' height='20px' fill={ color ? color : undefined} ><path fillRule={fillRule} d={props.path} /></svg> ;
    let svgPath;

    switch(id){
    case 'tick':
        svgPath = 'M 6.5 12 a 0.502 0.502 0 0 1 -0.354 -0.146 l -4 -4 a 0.502 0.502 0 0 1 0.708 -0.708 L 6.5 10.793 l 6.646 -6.647 a 0.502 0.502 0 0 1 0.708 0.708 l -7 7 A 0.502 0.502 0 0 1 6.5 12'
        break
    case 'cross':
        svgPath = 'M 7.293 8 L 3.146 3.854 a 0.5 0.5 0 1 1 0.708 -0.708 L 8 7.293 l 4.146 -4.147 a 0.5 0.5 0 0 1 0.708 0.708 L 8.707 8 l 4.147 4.146 a 0.5 0.5 0 0 1 -0.708 0.708 L 8 8.707 l -4.146 4.147 a 0.5 0.5 0 0 1 -0.708 -0.708 L 7.293 8 Z'
        break
    case 'calendar':
        svgPath = 'M 14 4 v -0.994 C 14 2.45 13.55 2 12.994 2 H 11 v 1 h -1 V 2 H 6 v 1 H 5 V 2 H 3.006 C 2.45 2 2 2.45 2 3.006 v 9.988 C 2 13.55 2.45 14 3.006 14 h 9.988 C 13.55 14 14 13.55 14 12.994 V 5 H 2 V 4 h 12 Z m -3 -3 h 1.994 C 14.102 1 15 1.897 15 3.006 v 9.988 A 2.005 2.005 0 0 1 12.994 15 H 3.006 A 2.005 2.005 0 0 1 1 12.994 V 3.006 C 1 1.898 1.897 1 3.006 1 H 5 V 0 h 1 v 1 h 4 V 0 h 1 v 1 Z M 4 7 h 2 v 1 H 4 V 7 Z m 3 0 h 2 v 1 H 7 V 7 Z m 3 0 h 2 v 1 h -2 V 7 Z M 4 9 h 2 v 1 H 4 V 9 Z m 3 0 h 2 v 1 H 7 V 9 Z m 3 0 h 2 v 1 h -2 V 9 Z m -6 2 h 2 v 1 H 4 v -1 Z m 3 0 h 2 v 1 H 7 v -1 Z m 3 0 h 2 v 1 h -2 v -1 Z'
        break
    case 'spin':
        svgPath = 'M 11.228 2.942 a 0.5 0.5 0 1 1 -0.538 0.842 A 5 5 0 1 0 13 8 a 0.5 0.5 0 1 1 1 0 a 6 6 0 1 1 -2.772 -5.058 Z M 14 1.5 v 3 A 1.5 1.5 0 0 1 12.5 6 h -3 a 0.5 0.5 0 0 1 0 -1 h 3 a 0.5 0.5 0 0 0 0.5 -0.5 v -3 a 0.5 0.5 0 1 1 1 0 Z'
        break
    case 'arrow':
        svgPath = 'M 13.069 5.157 L 8.384 9.768 a 0.546 0.546 0 0 1 -0.768 0 L 2.93 5.158 a 0.552 0.552 0 0 0 -0.771 0 a 0.53 0.53 0 0 0 0 0.759 l 4.684 4.61 c 0.641 0.631 1.672 0.63 2.312 0 l 4.684 -4.61 a 0.53 0.53 0 0 0 0 -0.76 a 0.552 0.552 0 0 0 -0.771 0 Z'
        break
    case 'leftArrow':
        svgPath = 'M10.843 13.069L6.232 8.384a.546.546 0 010-.768l4.61-4.685a.552.552 0 000-.771.53.53 0 00-.759 0l-4.61 4.684a1.65 1.65 0 000 2.312l4.61 4.684a.53.53 0 00.76 0 .552.552 0 000-.771z'
        break
    case 'rightArrow':
        svgPath='M5.157 13.069l4.611-4.685a.546.546 0 000-.768L5.158 2.93a.552.552 0 010-.771.53.53 0 01.759 0l4.61 4.684c.631.641.63 1.672 0 2.312l-4.61 4.684a.53.53 0 01-.76 0 .552.552 0 010-.771z'
    }

    return (
        <SvgElementPath path={svgPath} />
    )
}
