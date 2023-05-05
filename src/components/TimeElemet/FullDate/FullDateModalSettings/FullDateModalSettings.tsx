import React,{useState,useEffect} from 'react';
import { IFullDateModalSettingsProps,modeType } from './types';
import s from './FulldateModalSettings.module.css';
import { Calendar } from './Calendar';
import { RelativeChanger } from './RelativeChanger';

export const FullDateModalSettings = ({mode,setNowValue,timeInfo,setCalendarDate,closeModal,startFinish}:IFullDateModalSettingsProps) => {
    const [modeType, setModeType] = useState<modeType>('Now');


    useEffect(() => {
        setModeType(mode);
    },[mode])

    function closeFullDateModal(){
        closeModal();
        setNowValue(startFinish);
    }

    return (
        <div className={s.container}>
            <div className={s.header}>
                <button
                    onClick={() => setModeType('Absolute')}
                    className={`${s.headerBtn} ${modeType === 'Absolute' ? s.btnActive : null}`}
                >
                    Absolute
                </button>
                <button
                    onClick={() => setModeType('Relative')}
                    className={`${s.headerBtn} ${modeType === 'Relative' ? s.btnActive : null}`}
                >
                    Relative
                </button>
                <button
                    onClick={() => setModeType('Now')}
                    className={`${s.headerBtn} ${modeType === 'Now' ? s.btnActive : null}`}
                >
                    Now
                </button>
            </div>
            <div className={`${s.tabModalElement} ${modeType === 'Now' ? s.activeTab : null}`}>
                <div className={s.nowcontainer}>
                Setting the time to "now" means that on every refresh this time will be set to the time of the refresh.
                    <div className={s.newSetBtnContainer}>
                        <button onClick={closeFullDateModal} className={s.nowSetBtn}>Set start date and time to now</button>
                    </div>
                </div>
            </div>
            <div className={`${s.tabModalElement} ${modeType === 'Absolute' ? s.activeTab : null}`}>
                <Calendar startFinish={startFinish} closeModal={closeModal} setCalendarDate={setCalendarDate} timeInfo={timeInfo}/>
            </div>
            <div className={`${s.tabModalElement} ${modeType === 'Relative' ? s.activeTab : null}`}>
                <RelativeChanger  startFinish={startFinish} closeModal={closeModal} setCalendarDate={setCalendarDate} timeInfo={timeInfo}/>
            </div>
        </div>
    )
}

