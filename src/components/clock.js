import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks'

const DigitalClock = () => {
    const [time, setTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    const [classname, setClassname] = useState('tick') 
    const tick = () => {
        setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))
        
        if(classname === 'tick'){
            setClassname('tock')
        } else {
            setClassname('tick')
        }
    }

    

    useEffect(() => {
        const interval = setInterval(() => {
            tick()
        }, 1000);
        return () => clearInterval(interval);
    }, [classname]);

    return (
        <h1 className={classname}>{time}</h1>
    );
}

export default DigitalClock;
