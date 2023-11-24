import React, { useState, useEffect } from 'react'

const TimeScrubber = ( {params, setParams, yearRange}) => {
    const [date, setDate] = useState(params.year)

    const setYear = (e) => {
        const year = e.currentTarget.value 
        setParams({...params, year:year})
    }

    const goleft = (e) => {
		let newYear = parseInt(parseInt(yearRange.min_year) - 0.4 * parseInt(params.num_years))
		newYear = Math.min(2023, newYear)
		setParams({ ...params, year: newYear })
        setDate(newYear)
	}

    const goright = (e) => {
        let newYear = parseInt(parseInt(yearRange.max_year) + 0.8 * parseInt(params.num_years))
		newYear = parseInt(Math.min(2023 - 0.4 * (params.num_years / 2), newYear))
		setParams({ ...params, year: newYear })
        setDate(newYear)
	}

	const goup= (e) => {
        const newMinRank = Math.max(1, 
			parseInt(parseInt(params.min_rank)  - parseInt(params.num_ranks))
			)
		setParams({ ...params, min_rank: newMinRank })
	}

	const godown= (e) => {
        const newMinRank = parseInt(parseInt(params.min_rank) + parseInt(params.num_ranks))
		setParams({ ...params, min_rank: newMinRank })
	}

	return (
		<div id='scrubberContainer'>
	
			<form>

			    <span className='arrow' onClick={goup}>&uarr;</span>
				<div id='tooltip'>{params.min_rank}</div>
                <span className='arrow' onClick={godown}>&darr;</span>

                <span className='arrow' onClick={goleft}>&larr;</span>
				<div id='tooltip'>{date}</div>
                <span className='arrow' onClick={goright}>&rarr;</span>

				<input
					type='range'
					id='scrubber'
                    onChange={(e) => setDate(e.currentTarget.value)}
					step='1'
					min='1894'
					max='2024'
					// defaultValue={params.year}
					value={date}
					orient='horizontal'
                    onMouseUp={(e) => setYear(e)} 
                    onTouchEnd={(e) => setYear(e)}
				/>


			</form>
		</div>
	)
}

export default TimeScrubber
