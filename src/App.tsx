import React,{useState} from 'react';
import './App.css';
import CheckboxSwitcher from './components/CheckboxSwitcher';
import Button from 'components/Button';
import TimeElement from 'components/TimeElemet';
import {commonUsed} from 'utilits/setTimes';
import SvgElement from 'components/SvgElement';

function App() {

    const [isDisabled , setIsDisabled] = useState(false);
    const [isButtonVissible, setIsButtonVissible] = useState(true);

    function changeButtonVissible(value: boolean){
        setIsButtonVissible(value);
    }

    function changeDisabled(value: boolean){
        setIsDisabled(value);
    }

    function log(value: boolean){
        console.log(value);
    }

    return (
        <div className="appContainer">
            <div>
                <div className="checkbox_container">
                    <CheckboxSwitcher label="Show update button" onClick={changeButtonVissible} startChecked={true} />
                    <CheckboxSwitcher label="Is auto-refresh only"  onClick={log} startChecked={false}/>
                    <CheckboxSwitcher label="Is disabled"  onClick={changeDisabled} startChecked={false}/>
                </div>
                <div className="times_container">
                    <TimeElement  isDisabled={isDisabled} />
                    {
                        isButtonVissible
                            ?
                            <button className='refreshBtn'>
                                <SvgElement id="spin" color="#FFF" fillRule="evenodd" />
                                Refresh
                            </button>
                            :
                            null
                    }
                </div>
            </div>
        </div>
    );
}

export default App;
