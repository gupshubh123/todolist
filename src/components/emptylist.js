import React from 'react'
import EmptyListIcon from '../assets/images/empty_list.png'

function EmptyList() {
    return (
        <div className="empty_list_container flexContainer">
            <img src={EmptyListIcon} alt="Empty list" />
            <div className="empty_list_text">
                No tasks for display
                <ul>
                    <li>Add tasks</li>
                    <li> Use <i>#hashtag(s)</i> in your tasks </li>
                    <li> Click <i>#hashtag(s)</i> to filter the tasks</li>
                </ul>
            </div>
        </div>
    )
}

export default EmptyList
