import React , {useState} from 'react';
import s from './TimeSettingsModal.module.css';
import Select from 'components/Select';
import { ITimeSettingsModalProps } from './types';
import { currentDates, pastDates, lastNextDateSelect, timeVarinatsDateSelect } from './constants';
import NumberInput from 'components/NumberInput';
import { IGetTime,commonUsedTimeType,timeVariantsType } from 'types';
import SvgElement from 'components/SvgElement';



export const TimeSettingsModal = ({setCommonUsed , getTime,usedDataRanges,changeByRange} :ITimeSettingsModalProps) => {
    const [lastNext , setLastNext] = useState<commonUsedTimeType>('last');
    const [timeVariantType , setTimerVariantType] = useState<timeVariantsType>('seconds');
    const [timeValue , setTimeValue] = useState<number>(0)

    function changeLastNextValue(value:any){
        setLastNext(value)
    }
    function changeTimeVariantTypeValue(value:any){
        setTimerVariantType(value)
    }
    function changeTimeValue(value:any){
        setTimeValue(value)
    }

    return (
        <div className={s.container}>
            <div>
                <div className={s.headerContainer}>
                    <div>
                        <h5>Quick select</h5>
                    </div>
                    <div className={s.arrowsBtnContainer}>
                        <button className={s.btnArrow} onClick={()=> changeByRange({previousNext:'previous'})}>
                            <SvgElement id="leftArrow" color="#005c9b" fillRule="nonzero" />
                        </button>
                        <button className={s.btnArrow}  onClick={()=> changeByRange({previousNext:'next'})}>
                            <SvgElement id="rightArrow" color="#005c9b" fillRule="nonzero" />
                        </button>
                    </div>
                </div>
                <div className={s.selectContainer}>
                    <Select data={lastNextDateSelect} onChange={changeLastNextValue}/>
                    <NumberInput  onChange={changeTimeValue}/>
                    <Select data={timeVarinatsDateSelect}  onChange={changeTimeVariantTypeValue}/>
                    <button className={s.btn} onClick={() => getTime({lastNext:lastNext ,timeVariant:timeVariantType , value:timeValue })}>Apply</button>
                </div>
                <hr className={s.divider} />
            </div>
            <div>
                <h5>Commonly used</h5>
                <div className={s.commonValuesContainer}>
                    <div>
                        {
                            currentDates.map((data,index) => (
                                <div className={s.blueText} onClick={() => setCommonUsed('next', data.id, data.value)} key={index}> {data.value} </div>
                            ))
                        }
                    </div>
                    <div>
                        {
                            pastDates.map((data,index) => (
                                <div className={s.blueText} onClick={() => setCommonUsed('last', data.id, data.value)} key={index}> {data.value} </div>
                            ))
                        }
                    </div>
                </div>
            </div>
            <div>
                <h5>Recently used date ranges</h5>
                {
                    usedDataRanges?.length ?
                        usedDataRanges.map((value) => (
                            <div>{value.text}</div>
                        ))
                        : null
                }
            </div>
        </div>
    )
}
