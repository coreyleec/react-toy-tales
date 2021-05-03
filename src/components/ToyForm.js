import React, { Component } from 'react';

class ToyForm extends Component {

  state = {
    id: 0,
    name: "",
    image: "",
    likes: 0

  }

  submitHandler = (event) => {
    event.preventDefault()
    console.log("I submitted")

    const newToy = {
        name: this.state.name,
        weight: this.state.weight,
        sprite: this.state.sprite,
        type: this.state.type,
        description: this.state.description,
    }
//Make request Obj
    const reqObj = {}
    reqObj.headers = {"Content-Type": "application/json"}
    reqObj.method = "POST"
    reqObj.body = JSON.stringify(newToy)    
    
    console.log(reqObj)

// POST request
    fetch("http://localhost:3000/toys/", reqObj)
        .then(resp => resp.json())
        .then((newToy) => {
            this.props.createToy(newToy)
            this.setState({
              id: 0,
              name: "",
              image: "",
              likes: 0
            })
        })

}
  render() {
    return (
      <div className="container">
        <form onSubmit={this.submitHandler}  className="add-toy-form">
          <h3>Create a toy!</h3>
          <input  onChange={(event) => this.setState({name: event.target.value})} type="text" name="name" placeholder="Enter a toy's name..." className="input-text"/>
          <br/>
          <input onChange={(event) => this.setState({image: event.target.value})} type="text" name="image" placeholder="Enter a toy's image URL..." className="input-text"/>
          <br/>
          <input type="submit" name="submit" value="Create New Toy" className="submit"/>
        </form>
      </div>
    );
  }

}

export default ToyForm;
