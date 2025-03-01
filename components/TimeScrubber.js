import React, { useState, useEffect } from 'react'

const TimeScrubber = ( {params, setParams}) => {
    const [date, setDate] = useState(params.year)

    const setYear = (e) => {
        const year = e.currentTarget.value 
        setParams({...params, year:year})
    }

    const goleft = (e) => {
        const newYear = parseInt(params.year) - parseInt(params.num_years)
		setParams({ ...params, year: newYear })
        setDate(newYear)
	}

    const goright = (e) => {
        const newYear = parseInt(params.year) + parseInt(params.num_years)
		setParams({ ...params, year: newYear })
        setDate(newYear)
	}

	return (
		<div id='scrubberContainer'>
	
			<form>
                <span className='arrow' onClick={goleft}>&larr;</span>
                <div id='tooltip'>{date}</div>
				<input
					type='range'
					id='scrubber'
                    onChange={(e) => setDate(e.currentTarget.value)}
					step='1'
					min='1894'
					max='2023'
					defaultValue={params.year}
                    onMouseUp={(e) => setYear(e)} 
                    onTouchEnd={(e) => setYear(e)}
				/>
                <span className='arrow' onClick={goright}>&rarr;</span>
			</form>
		</div>
	)
}

export default TimeScrubber
