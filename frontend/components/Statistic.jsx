import React from 'react'
import StatisticsContentDetails from './StatisticsContentDetails'
import StatisticWrapper from './StatisticWrapper'

function Statistic() {
    const statistic_content_details = [
        {
            number: '93',
            text: `of Summarist members <b>significantly increase</b> reading
                  frequency.`
        },
        {
            number: '96',
            text: `of Summarist members <b>establish better</b> habits.`
        },
        {
            number: '90',
            text: `have made <b>significant positive</b> change to their lives.`
        },

    ]
    const statistic_content_details2 = [
        {
            number: '91',
            text: ` of Summarist members <b>report feeling more productive</b> 
            after incorporating the service into their daily routine.`
        },
        {
            number: '94',
            text: ` of Summarist members have <b>noticed an improvement</b> in
                            their overall comprehension and retention of information.`
        },
        {
            number: '88',
            text: ` of Summarist members <b>feel more informed</b> about current
                            events and industry trends since using the platform.`
        },

    ]

    const statistics_content_header = [
        "Enhance your knowledge",
        "Achieve greater success",
        "Improve your health",
        "Develop better parenting skills",
        "Increase happiness",
        " Be the best version of yourself!",
    ]
    const statistics_content_header2 = [
        "Expand your learning",
        "Accomplish your goals",
        "Strengthen your vitality",
        "Become a better caregiver",
        "Improve your mood",
        "Maximize your abilities",
    ]
    return (
        <>
            <div className="statistics__wrapper">

                <StatisticWrapper datas={statistics_content_header} />
                <StatisticsContentDetails datas={statistic_content_details} />

            </div>
            <div className="statistics__wrapper">
                <StatisticsContentDetails datas={statistic_content_details2} seconds={true} />
                <StatisticWrapper datas={statistics_content_header2} seconds={true} />
            </div>
        </>
    )
}

export default Statistic