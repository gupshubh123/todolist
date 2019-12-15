import React from 'react'
/*
    Acccepts Pending and Completed task items. Filters, if applied , only renders the filtered list.
    Pending Task list is shown in reverse order as per the requirement.

*/
const Todolist=(props) =>{
    let filterByTags=props.filters
    let hasFilters = filterByTags.length?true:false
    let itemsListPending = props.itemsListPending.map((item,index)=>{
        if(hasFilters){
            let hasAllHashTags=true
            filterByTags.forEach((hashTag)=>{
                if(item.indexOf(hashTag) === -1){
                    hasAllHashTags =false
                }
            })
            if(hasAllHashTags){
                return(<li className="list-group-item todo_item_pending" key={index} onClick={()=>{props.markCompleted(index)}} dangerouslySetInnerHTML={{__html: item}}></li>)
            }else{
                return null
            }
        }
        return(<li className="list-group-item todo_item_pending" key={index} onClick={()=>{props.markCompleted(index)}} dangerouslySetInnerHTML={{__html: item}}></li>)
        
    }).reverse()
    let itemsListCompleted = props.itemsListCompleted.map((item,index)=>{
        if(hasFilters){
            let hasAllHashTags=true
            filterByTags.forEach((hashTag)=>{
                if(item.indexOf(hashTag) === -1){
                    hasAllHashTags =false
                }
            })
            if(hasAllHashTags){
                return(<li className="list-group-item todo_item_completed" key={index} dangerouslySetInnerHTML={{__html: item}}></li>)
            }else{
                return null
            }
        }
        return(<li className="list-group-item todo_item_completed" key={index} dangerouslySetInnerHTML={{__html: item}}></li>)
    })
    return (
        <div className="render_list">
            <div className="task_list_stats">
                <div className="stat all_tasks">
                    {'All: '+Number(itemsListPending.length+itemsListCompleted.length)}
                </div>
                <div className="stat pending_tasks">
                    {'Pending: '+itemsListPending.length}
                </div>
                <div className="stat completed_tasks">
                    {'Completed: '+itemsListCompleted.length}
                </div>
            </div>
            <ul className="list-group render_list_ul">
                {itemsListPending}
                {itemsListCompleted}
            </ul>
        </div>
    )
}

export default Todolist
