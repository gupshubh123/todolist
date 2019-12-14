import React from 'react'

const Filterlist=(props)=> {
    let filterList = props.filters
    return (
        <div className="row tag_filter_ctn">
            Filter by :
          {filterList.map((item,index)=>{
            return (<div className="tag" key={index}>{item}</div>)
          })}
        </div>
    )
}

export default Filterlist
