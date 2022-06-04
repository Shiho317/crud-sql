import { useEffect, useState } from "react";
import "./App.css";
import axios from 'axios'

function App() {

  const [employees, setEmployees] = useState([])

  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [country, setCountry] = useState('')
  const [position, setPosition] = useState('')
  const [wage, setWage] = useState('')

  const submitHandler = async(e) => {
    e.preventDefault();

    const newEmployee = {
      name,
      age,
      country,
      position,
      wage
    }

    await axios.post('http://localhost:8888/create', newEmployee).then(res => {
      console.log(res)
      if(res.status === 200) {
        setName('')
      setAge('')
      setCountry('')
      setPosition('')
      setWage('')
      }
    })
  }

  console.log(employees)

  return (
    <div className="App">
      <form className="information" onSubmit={submitHandler}>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <label>Age:</label>
        <input type="number" value={age} onChange={(e) => setAge(e.target.value)}/>
        <label>Country:</label>
        <input type="text" value={country} onChange={(e) => setCountry(e.target.value)}/>
        <label>Position:</label>
        <input type="text" value={position} onChange={(e) => setPosition(e.target.value)} />
        <label>Wage(year):</label>
        <input type="number" value={wage} onChange={(e) => setWage(e.target.value)}/>
        <button>Add Employer</button>
      </form>

      
    </div>
  );
}

export default App;
