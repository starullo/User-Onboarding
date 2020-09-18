import React, {useState, useEffect} from 'react';
import './App.css';
import Form from './Form';
import schema from './formSchema';
import axios from 'axios';
import * as yup from 'yup';
import styled from 'styled-components';


const H1 = styled.h1`
font-size: 3rem;
text-align: center;
`

const Pre = styled.pre`
display: block;
width: 40%;
margin: auto;
`

const initialFormValues = {
  name: '',
  email: '',
  password: '',
  terms: '',
}

const initialFormErrors = {
  name: '',
  email: '',
  password: '',
  terms: ''
}

const initialPeople = [];
const initialDisabled = true;


function App() {
  /*setting state */
  const [people, setPeople] = useState(initialPeople);
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [disabled, setDisabled] = useState(initialDisabled);

  /* functions */

  
  const postNewPerson = newPerson => {
    axios.post('https://reqres.in/api/users', newPerson)
    .then(res=>{
      setPeople([...people, {id: res.data.id,...newPerson}])
      setFormValues(initialFormValues);
    })
    .catch(err=>{
      alert(err)
    })
  }

  const validate = (name, value) => {
    yup
    .reach(schema, name)
    .validate(value)
    .then(valid=>{
      setFormErrors({
        ...formErrors,
        [name]: ""
      })
    })
    .catch(err=>{
      setFormErrors({
        ...formErrors,
        [name]: err.errors[0]
      });
    });
  }

  /* event handlers */
  const inputChange = (name, value) => {
    validate(name, value);
    setFormValues({
      ...formValues,
      [name]: value
    })
  }

  const formSubmit = () => {
    const newPerson = {
      name: formValues.name.trim(),
      email: formValues.email.trim(),
      password: formValues.password.trim(),
      terms: true
    }
    postNewPerson(newPerson)
  }

  useEffect(()=>{
    axios.get('https://reqres.in/api/users')
    .then(res=>{
      setPeople(res.data.data)
    })
    .catch(err=>{
      alert(err);
    })
  }, []);

  /*seeing if 'disabled' needs to be adjusted when values are changed */
  useEffect(()=>{
    schema.isValid(formValues)
    .then(valid=>{
      setDisabled(!valid);
    })
  }, [formValues])
  return (
    <div>
      <H1>Users List/Info</H1>
      {people.map(person=>{
        console.log(person);
        return (
          <Pre>{JSON.stringify(person, null, 4)}</Pre>
        )
      })}
      <Form values={formValues} submit={formSubmit} change={inputChange} disabled={disabled} errors={formErrors}/>
    </div>
  );
}

export default App;
