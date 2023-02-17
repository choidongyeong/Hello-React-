import React, { Component } from 'react';
import TOC from "./components/TOC";
import ReadContent from './components/ReadContent';
import Subject from './components/Subject';
import Control from './components/Control';
import CreateContent from './components/CreateContent';
import './App.css';



class App extends Component {
  constructor(props){
    super(props);
    this.max_content_id = 3;
    this.state = {
      mode:'create',
      selected_content_id:2,
      Subject:{title:'WEB', sub:'World Wid Web!'},
      welcome:{title:'Wecome', desc:'Hello, React!!'},
      contents:[
        {id:1, title:'HTML', desc:'HTML is for information'},
        {id:2, title:'CSS', desc:'CSS is for design'},
        {id:3, title:'JavaScript', desc:'JavaScript is for interactive'}
      ]
    }
  }
  render() {
    var _title, _desc, _article =null;
    if(this.state.mode === 'welcome'){
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>
    } else if(this.state.mode === 'read'){
      var i = 0;
      while(i < this.state.contents.length){
        var data = this.state.contents[i];
        if(data.id === this.state.selected_content_id) {
          _title = data.title;
          _desc = data.desc;
          break;
        }
        i = i + 1;
      }
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>
    } else if (this.state.mode ==='create') {
      _article = <CreateContent onSubmit={function(_title, _desc){
        // add content to this.state.contents

        this.max_content_id = this.max_content_id+1;
        
        //Arr에 담아서 새로운 데이터를 생성해서 담는 방법
        //var newContents = Array.from(this.state.contents);

        //Object.assign({})에 담아서 새로운 데이터를 생성하는 방법
        //var a = {name:동영}
        //var b = Object.assign({b:1},a);

        //push는 원본을 바꾸지만, concat은 원본을 바꾸지않는고 새로운 데이터를 추가한다.
        // this.state.contents.push(
        //   {id:this.max_content_id, title:_title, desc:_desc}
        // );

        var _contents = this.state.contents.concat(
          {id:this.max_content_id, title:_title, desc:_desc}
        );

        this.setState({
          contents:_contents
        });
      }.bind(this)}></CreateContent>
    }
    return (
      <div className="App">
          <Subject 
            title={this.state.Subject.title} 
            sub={this.state.Subject.sub}
            onChangePage={function(){
              this.setState({mode:'welcome'});
            }.bind(this)}  
          >
          </Subject>
          <TOC onChangePage={function(id){
            this.setState({

              mode:'read',
              selected_content_id:Number(id)
            });
          }.bind(this)} 
          data={this.state.contents}></TOC> 
          <Control onChangeMode={function(_mode){
            this.setState({
              //클릭했을때 mode 변경
              mode:_mode
            })
          }.bind(this)}></Control>
          {_article}
      </div>
    );
    
  }
}

export default App;
