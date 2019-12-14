import React from 'react'

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
            <div className="task_list_heading">
                Your Task List: 
            </div>
            <ul className="list-group">
                {itemsListPending}
                {itemsListCompleted}
            </ul>
        </div>
    )
}

export default Todolist
