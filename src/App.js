import React from 'react';
import './App.css';

import Header from './components/Header'
import ToyForm from './components/ToyForm'
import ToyContainer from './components/ToyContainer'

const toy_url = "http://localhost:3000/toys/"

class App extends React.Component{

  state = {
    display: false,
    toys: []
  }
  componentDidMount(){
    console.log("didmount")
    fetch(toy_url)
      .then(resp => resp.json())
      .then(toyData => this.setState({toys: toyData}))
     
    }
    
  createToy = (toyObj) => {
    this.setState({
      toys: [toyObj, ...this.state.toys]
    })
  }


  handleClick = () => {
    let newBoolean = !this.state.display
    this.setState({
      display: newBoolean
    })
  }

  // DELETE FUNCTION
  deleteToy = (toyObj) => {
    const newToys = this.state.toys.filter(toy => toy.id !== toyObj.id)

//tell server that delete requests

  fetch(toy_url + toyObj.id, {method: "DELETE"})
  .then(() => this.setState({
    toys: newToys
  }))
  }

toyLiker = (toyObj) => {
  const oldToy = this.state.toys.find(toy => toy.id)

  const oldIndex = this.state.pokemon.indexOf(oldToy)

  const updateLikes = {...oldToy, weight: oldToy.likes + 1}
  console.log(updateLikes)
}
  
  render(){
    return (
      <>
        <Header/>
        { this.state.display ? <ToyForm createToy={this.createToy} /> : null}
        <div className="buttonContainer">
          <button onClick={this.handleClick}> Add a Toy </button>
        </div>
        <ToyContainer deleteToy={this.deleteToy} createToy={this.createToy} toyData={this.state.toys}/>
      </>
    );
  }

}

export default App;
