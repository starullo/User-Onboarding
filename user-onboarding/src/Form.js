import React, {useState} from 'react';
import styled from 'styled-components';

const StyledForm = styled.form`
text-align: center;
margin: 5% auto;
`

const Input = styled.input`
margin: 2% auto;
`

const Error = styled.p`
color: red;
`
const ViewTerms = styled.a`
display: inline-block;
background-color: black;
color: white;
text-decoration: none;
margin-bottom: 2%;
transform: scale(1.1);
padding: .5%;
`

const Terms = styled.p`
width: 50%;
margin: 2% auto;
`

export default function Form(props) {
    const [termsOn, setTermsOn] = useState(false);
    const {values, submit, change, disabled, errors} = props;

    const onSubmit = e => {
        e.preventDefault();
        submit();
    }

    const onChange = e => {
        const {name, value, checked, type} = e.target;
        const newVal = type === 'checkbox' ? checked : value;
        change(name, newVal);
    }

    return (
        <StyledForm onSubmit={onSubmit}>
            <div>
                <h2>Add people using this spectacular form</h2>
                <label htmlFor='name'>Enter your name<br></br>
                    <Input
                    value={values.name}
                    onChange={onChange}
                    name='name'
                    type='text' />
                    <Error>{errors.name}</Error>
                </label>
                <label htmlFor='email'>Enter your e-mail<br></br>
                    <Input
                    value={values.email}
                    onChange={onChange}
                    name='email'
                    type='email' />
                    <Error>{errors.email}</Error>
                </label>
                <label htmlFor='password'>Enter your password<br></br>
                    <Input
                    value={values.password}
                    onChange={onChange}
                    name='password'
                    type='password' />
                    <Error>{errors.password}</Error>
                </label>
                <label htmlfor='terms'>Check the box to agree to the terms of service (you simply must)<br></br>
                    <Input
                    type='checkbox'
                    name='terms'
                    checked={values.terms}
                    onChange={onChange} />
                </label>
                <Error>{errors.terms}</Error>
                <ViewTerms href='#' onClick={(e)=>{e.preventDefault();if (termsOn) {setTermsOn(false)} else {setTermsOn(true)}}}>(Click here to view terms!)</ViewTerms><br></br>
                {termsOn && <Terms>The terms are BLAH BLAH BLAH BLAH BLAH BLAH BLAH BLAH BLAH BLAH BLAH BLAH BLAH BLAH BLAH BLAH BLAH BLAH BLAH BLAH BLAH BLAH BLAH BLAH BLAH BLAH </Terms>}
                <button disabled={disabled}>Submit</button>

            </div>
        </StyledForm>
    )
}