import React from 'react'
import EmptyListIcon from '../assets/images/empty_list.png'

function EmptyList() {
    return (
        <div className="empty_list_container flexContainer">
            <img src={EmptyListIcon} alt="Empty list" />
            <div className="empty_list_text">
                No tasks for display
                <br />
                You are all done for the day! 
                
            </div>
        </div>
    )
}

export default EmptyList
