import { useState } from 'react'
import './App.css'
import Nav from './components/Nav.jsx'
import Card from './components/Card.jsx'
function App() {
  return (
    <>
    <Nav/>
    <div className='box'>
      <Card title={"card 1"} content={"This is a first card Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ea, consectetur error. Perspiciatis expedita rerum distinctio saepe, nam illo natus accusamus deleniti in eos odit iure enim iste error magnam quasi" 
      } />
      <Card title={"card 2"} content={"This is a first card Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ea, consectetur error. Perspiciatis expedita rerum distinctio saepe, nam illo natus accusamus deleniti in eos odit iure enim iste error magnam quasi" 
      }/>
      <Card title={"card 3"} content={"This is a first card Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ea, consectetur error. Perspiciatis expedita rerum distinctio saepe, nam illo natus accusamus deleniti in eos odit iure enim iste error magnam quasi" 
      }/>
    </div>
    </>
  )
}

export default App
