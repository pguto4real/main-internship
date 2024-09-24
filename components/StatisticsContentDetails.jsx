import React from 'react'

function StatisticsContentDetails({ datas, seconds }) {
    return (
        <div className={`statistics__content--details ${seconds && "statistics__content--details-second"}`}>
            {
                datas.map((data) => {
                    // console.log(data)
                    <div className="statistics__data">
                        <div className="statistics__data--number">{data.number}%</div>
                        <div className="statistics__data--title">
                            {data.text}
                        </div>
                    </div>
                })
            }
            <div className="statistics__data">
                <div className="statistics__data--number">93%</div>
                <div className="statistics__data--title">
                    of Summarist members <b>significantly increase</b> reading
                    frequency.
                </div>
            </div>
            <div className="statistics__data">
                <div className="statistics__data--number">96%</div>
                <div className="statistics__data--title">
                    of Summarist members <b>establish better</b> habits.
                </div>
            </div>
            <div className="statistics__data">
                <div className="statistics__data--number">90%</div>
                <div className="statistics__data--title">
                    have made <b>significant positive</b> change to their lives.
                </div>
            </div>
        </div>
    )
}

export default StatisticsContentDetails