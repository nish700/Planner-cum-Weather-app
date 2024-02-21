import './App.css';
import React, {Component} from 'react';
import Modal from './components/Modal';
import axios from 'axios';

class App extends Component{
  constructor(props){
    super(props);
    this.state={
      viewCompleted : false,
      plannerList : [],
      chkplannerList : [],
      modal: false,
      activeItem:{
        title: "",
        description:"",
        completed: false,
        loc:"",
        date:"",
        weather: ""
      },
    };
  }

  componentDidMount(){
    this.refreshList();    
  }

  refreshList = () => {
    axios
    .get('/api/planners/')
    .then((res) => this.setState({plannerList: res.data,
    chkplannerList:[]}))
    .catch((err) => console.log(err))
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  handleSubmit = (item) => {
    this.toggle();

    axios
    .get('/api/planners/')
    .then((res) => this.setState({chkplannerList: res.data}))
    .catch((err) => console.log(err))

    if(item.loc===this.state.chkplannerList['loc'] && item.date === this.state.chkplannerList['date']){
      if(item.id){
          axios
          .put(`/api/planners/${item.id}/`, item)
          .then((res)=> this.refreshList());
          return;
        }
        axios
        .post('/api/planners/', item)
        .then((res)=> this.refreshList());

    }
    else{
      alert("Weather for Place already available")
    }
  };

  handleDelete = (item) => {
    axios
    .delete(`/api/planners/${item.id}/`, item)
    .then((res) => this.refreshList());

  };

  createItem = () => {
    const item = {
      title : "",
      description : "",
      completed: false,
      loc:"",
      date:"",
      weather:""
    };

    this.setState(
      {
        activeItem:item,
        modal: !this.state.modal
      }
    );
  };

  editItem = (item) => {
    this.setState({
      activeItem: item,
      modal: !this.state.modal
    });
  };


  displayCompleted = (status) => {
    if(status){
      return this.setState({viewCompleted: true});
    }

    return this.setState({viewCompleted : false});
  };

  renderTabList = () => {
    return (
      <div className='nav nav-tabs'>
        <span
        className={this.state.viewCompleted ? "nav-link active" : "nav-link"}
        onClick={() => this.displayCompleted(true)}>
          Complete
        </span>
        <span
        className={this.state.viewCompleted ? "nav-link" : "nav-link active"}
        onClick={() => this.displayCompleted(false)}>
          Incomplete
        </span>
      </div>
    );
  };

  renderItems = () => {
    const {viewCompleted} = this.state;
    const newItems = this.state.plannerList.filter(
      (item) => item.completed === viewCompleted
    );

    return newItems.map((item) => (
      
      <li
      key={item.id}
      className='list-group-item d-flex justify-content-between align-items-center'
      >
        <span className={`todo-title mr-2 ${
          this.state.viewCompleted ? "completed-todo" : ""
        }`}
        title={item.description} >
        {item.loc}
        </span>

        <span className={`todo-title mr-2 ${
          this.state.viewCompleted ? "completed-todo":""
        }`}
        title={item.loc}>
          {item.date}     
        </span>
        
        <span className={`todo-title mr-2 ${
          this.state.viewCompleted ? "completed-todo": ""
        }`}
        title={item.description}>
          {item.weather}
        </span>

        <span>
          <button
          className='btn btn-secondary mr-2'
          onClick={() => this.editItem(item)}>

            Edit
          </button>
          <button
          className='btn btn-danger'
          onClick={() => this.handleDelete(item)}>
            Delete
          </button>
        </span>

      </li>    
    ));
  };


render(){
  return(
    <main className='container'>
      <h1 className='text-black text-uppercase text-center my-4'> Planner Cum Weather App</h1>
      <div className='row'>
        <div className='col-md-9 col-sm-10 mx-auto p-0'>
          <div className='card p-3'>
            <div className='mb-4'>
              <button
              className='btn btn-primary'
              onClick={this.createItem}>
                Add Planner
              </button>
            </div>
            {this.renderTabList()}
            <ul className='list-group list-group-flush border-top-0'>
              {this.renderItems()}
            </ul>
          </div>
        </div>
      </div>
      {this.state.modal ? (
        <Modal 
        activeItem={this.state.activeItem}
        plannerList={this.state.plannerList}
        toggle={this.toggle}
        onSave = {this.handleSubmit}></Modal>
      ): null}
      
    </main>
  );
}

}


export default App;