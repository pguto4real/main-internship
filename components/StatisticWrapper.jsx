import React, { useEffect, useRef, useState } from 'react'

function StatisticWrapper({ datas, seconds }) {
   
    const ElementRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [activeData, setActiveData] = useState('');

    useEffect(() => {
        const elementCount = ElementRef.current?.childNodes.length || 0;

        // Update the activeData whenever the activeIndex changes
        if (ElementRef.current && elementCount > 0) {
            const activeElement = ElementRef.current.childNodes[activeIndex];
            setActiveData(activeElement.textContent); // Get text content of the active element
        }
    }, [activeIndex]);

    useEffect(() => {
        const elementCount = ElementRef.current?.childNodes.length || 0;

        if (elementCount > 0) {
            const intervalId = setInterval(() => {
                setActiveIndex((prevIndex) => (prevIndex + 1) % elementCount);
            }, 2000); // Change every second

            return () => clearInterval(intervalId); // Cleanup on unmount
        }
    }, []);

    return (

        <div ref={ElementRef}
            className={`statistics__content--header ${seconds && "statistics__content--header-second"}`}
        >
            {
                datas.map((data, index) => (
                    <div key={index}  className={`statistics__heading ${activeIndex === index && "statistics__heading--active"}`}>{data}</div>
                ))
            }


        </div>

    );
}

export default StatisticWrapper