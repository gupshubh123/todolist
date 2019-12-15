import React, { Component } from 'react'
import Todolist from './components/todolist'
import Filterlist from './components/filterlist'
import './App.css';
import EmptyList from './components/emptylist';

class App extends Component {
  constructor(props){
    super(props)
    this.state={
      listPending:localStorage.getItem("todoList")?(JSON.parse(localStorage.getItem("todoList")).listPending):[],
      listCompleted:localStorage.getItem("todoList")?(JSON.parse(localStorage.getItem("todoList")).listCompleted):[],
      tagList:[]
    }
  }
  resetListHandler=()=>{
     // resets the complete list
    this.setState({listPending:[],listCompleted:[],tagList:[]},()=>{
      this.saveStateLocal()  
    })
  }
  resetTagFilters=()=>{
    //resets the hashtag filters appplied
    this.setState({tagList:[]},()=>{})
  }

  highlightHashTags=(s)=>{
    //macthes the pattern for #hashtag and replaces it with span
    let reg = new RegExp(/(^|\B)#(?![0-9_]+\b)([a-zA-Z0-9_]{1,30})(\b|\r)/, 'gi')
     return s.replace(reg, (str) =>'<span class="highlight_hashtag">'+str+'</span>')
  }
  addTodoItemHandler=(e)=>{
    //adds a new pending item to list, saves in localstorage
    if (e.key === 'Enter' && e.target.value.length) {
      let item = this.highlightHashTags(e.target.value)
      let templist = [...this.state.listPending]
      templist.push(item)
      this.setState({listPending:templist},()=>{
        this.resetTagFilters()
        this.saveStateLocal()  
      })
      e.target.value=""
    }
  }
  saveStateLocal=(state)=>{
    //saves the list items in local storage
    let todoList={
      listPending:this.state.listPending,
      listCompleted:this.state.listCompleted
    }
    localStorage.setItem("todoList",JSON.stringify(todoList));
  }
  markItemCompletedHandler=(index)=>{
    //removes the items from the pending list, moves to completed
    let todoPendingList = [...this.state.listPending]
    let todoCompletedList = [...this.state.listCompleted]
    let itemToBeMarkedCompleted = todoPendingList[index]
    todoPendingList.splice(index,1)
    todoCompletedList.push(itemToBeMarkedCompleted)
    this.setState({listPending:todoPendingList,listCompleted:todoCompletedList},()=>{
      this.saveStateLocal()
    })
    
  }
  render() {
    return (
      <React.Fragment>
        <header className="page_header">
            TODO
        </header>
        <main  className="container todo_container">
        
            <div className="row add_todo">
              <div className="input-group mb-3 col-sm-12 col-xs-12 col-md-8">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">Add Task</span>
                  </div>
                  <input type="text" className="form-control" placeholder="Enter text with hashtag(s)" onKeyDown={this.addTodoItemHandler}/>
              </div>
              <div className="col-sm-12 col-xs-12 col-md-4">
                  <button onClick={this.resetListHandler} className="btn custom_btn_reset">Reset list</button>
                  <button onClick={this.resetTagFilters} className="btn custom_btn_reset">Reset Filters</button>
              </div>
            </div> 
            {this.state.tagList.length?<Filterlist filters={this.state.tagList}/>:null}
            {this.state.listPending.length===0 && this.state.listCompleted.length ===0?
            <EmptyList/>
            :<Todolist 
            itemsListPending={this.state.listPending} 
            itemsListCompleted={this.state.listCompleted}
            markCompleted={this.markItemCompletedHandler}
            filters={this.state.tagList}
            />}
            
      </main>
    </React.Fragment>
    )
  }
  hashTagClicked=()=>{
    //adding event listners to span hashtags
    let component_this = this
    var hashTagLinks = document.querySelectorAll('.highlight_hashtag')
    for (let i = 0; i < hashTagLinks.length; i++) {
      hashTagLinks[i].addEventListener('click', function(event) { 
        let currentTagList = [...component_this.state.tagList]
        currentTagList.push(this.innerText)
        component_this.setState({tagList:Array.from(new Set(currentTagList))})
        event.stopPropagation()
      });
    }   
  }
  componentDidUpdate=()=>{
    this.hashTagClicked()
  }
  componentDidMount=()=>{
     this.hashTagClicked()
  }
}
export default App
