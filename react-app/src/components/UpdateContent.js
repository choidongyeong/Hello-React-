import React, { Component } from 'react';

class UpdateContent extends Component {
   //props => state
   // props는 값은 바뀌지 않는다 그래서 가변적데이터 state화 한다
    constructor(props){
      super(props);
      this.state = {
        id:this.props.data.id,
        title:this.props.data.title,
        desc:this.props.data.desc
      }
      this.inputFormHandler = this.inputFormHandler.bind(this);
    }
    inputFormHandler(e){
      this.setState({[e.target.name]:e.target.value});
    }
    render(){
      console.log(this.props.data);
      console.log('UpdateContent render');
      return(
        <article>
          <h2>Update</h2>
          <form action='/create_process' method='post'
            onSubmit={function(e){
              e.preventDefault();
              this.props.onSubmit(
                this.state.id,
                this.state.title,
                this.state.desc
              );
            }.bind(this)}
          >
              <input type="hidden" name="id" value={this.state.id}></input>
              <p>
                <input 
                  type="text" 
                  name="title" 
                  placeholder='title'
                  value={this.state.title}
                  onChange={this.inputFormHandler}
                ></input></p>
              <p>
                <textarea 
                onChange={this.inputFormHandler}
                name="desc" 
                placeholder='ddescription' 
                value={this.state.desc}></textarea>
              </p>
              <p>
                <input type="submit"></input>
              </p>
          </form>
        </article>
      );
    }
  }

  export default UpdateContent;