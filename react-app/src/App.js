import React, { Component } from 'react';
import TOC from "./components/TOC";
import ReadContent from './components/ReadContent';
import Subject from './components/Subject';
import Control from './components/Control';
import CreateContent from './components/CreateContent';
import UpdateContent from './components/UpdateContent';
import './App.css';



class App extends Component {
  constructor(props){
    super(props);
    this.max_content_id = 3;
    this.state = {
      mode:'welcome',
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
  getReadContent(){
    var i = 0;
    while(i < this.state.contents.length){
      var data = this.state.contents[i];
      if(data.id === this.state.selected_content_id) {
        return data;
        break;
      }
      i = i + 1;
    }
  }
  getContent(){
    var _title, _desc, _article =null;
    if(this.state.mode === 'welcome'){
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>
    } else if(this.state.mode === 'read'){
     var _content = this.getReadContent();
      _article = <ReadContent title={_content.title} desc={_content.desc}></ReadContent>
    //Create
    } else if (this.state.mode ==='create') {
      _article = <CreateContent onSubmit={function(_title, _desc){
        // add content to this.state.contents

        this.max_content_id = this.max_content_id+1;

        //Arr에 담아서 새로운 데이터를 생성해서 담는 방법
        //var newContents = Array.from(this.state.contents);

        //Object.assign({})에 담아서 새로운 데이터를 생성하는 방법
        //var a = {name:동영}
        //var b = Object.assign({b:1},a); = {b:1}, {name:동영}

        //push는 원본을 바꾸지만, concat은 원본을 바꾸지않는고 새로운 데이터를 만들어서 추가한다.
        // this.state.contents.push(
        //   {id:this.max_content_id, title:_title, desc:_desc}
        // );
        var _contents = Array.from(this.state.contents);
        _contents.push({id:this.max_content_id, title:_title, desc:_desc});
        this.setState({
          contents:_contents,
          mode:'read',
          selected_content_id:this.max_content_id
        });
      }.bind(this)}></CreateContent>
    //Update
    } else if (this.state.mode ==='update') {
      _content = this.getReadContent();
      _article = <UpdateContent data={_content} onSubmit={
        function(_id, _title, _desc){
          //this.state.contents의 원복을 복사한다
          //원본을 바꾸지않는 테크닉으로 나중에 성능튜닝에 필요
          var _contents = Array.from(this.state.contents);
          var i = 0;
          while(i<_contents.length) {
            if(_contents[i].id === _id) {
              _contents[i] = {id:_id, title:_title,desc:_desc};
              break;
            }
            i = i +1 ;
          }
        this.setState({
          contents:_contents,
          mode:'read'
        });

      }.bind(this)}></UpdateContent>
    }
    return _article;
  }
  render() {
   console.log('App render')
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
            //delete
            if( _mode === 'delete'){
              if(window.confirm('really?')){
                var _contents = Array.from(this.state.contents)
                var i = 0;
                while(i < _contents.length){
                  if(_contents[i].id === this.state.selected_content_id){
                    //splice 어디서부터 어디까지 삭제할지 정한다
                    _contents.splice(i,1);
                  }
                  i = i + 1;
                }
                this.setState({
                  mode:'welcome',
                  contents:_contents
                });
                alert('delete!');
              }
            } else {
            this.setState({
              //클릭했을때 mode 변경
              mode:_mode
            });
          }
          }.bind(this)}></Control>
          {this.getContent()}
      </div>
    );
    
  }
}

export default App;
