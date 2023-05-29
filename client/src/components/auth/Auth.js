import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login, register } from '../../actions/auth'
import './style.css'
import {
  Text,
  Title,
  Link,
  StyledButton,
  ButtonAnimate,
  RectangleMain,
  RectangleFirst,
  RectangleSecond,
  StyledForm,
  StyledInput,
} from './styles'

const initialState = {
  firstName: '',
  lastName: '',
  userType: '',
  userName: '',
  email: '',
  password: '',
  confirmedPassword: '',
}

function Auth() {
  const [isSignup, setIsSignup] = useState(false)
  const [formData, setFormData] = useState(initialState)
  const [errors, setErrors] = useState({})
  const history = useNavigate()
  const dispatch = useDispatch()
  const error = null

  const handleSubmit = e => {
    e.preventDefault()
    if (validate()) {
      if (isSignup) {
        dispatch(register(formData, history))
      } else {
        dispatch(login(formData, history))
      }
    }
  }

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    validate({ [e.target.name]: e.target.value })
  }

  const switchMode = () => {
    setIsSignup(prevIsSignup => !prevIsSignup)
  }

  const [click, setClick] = useState(false)
  const handleClick = () => {
    setClick(!click)
    switchMode()
  }

  const resetForm = () => {
    setFormData(initialState)
    setErrors({})
  }
  const validate = (formValues = formData) => {
    let temp = { ...errors }
    if ('email' in formValues)
      temp.email = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formValues.email)
        ? ''
        : 'Email is not valid.'
    if ('password' in formValues)
      temp.password =
        formValues.password.length > 3 ? '' : 'Password is not valid.'

    setErrors({
      ...temp,
    })

    return Object.values(temp).every(x => x === '')
  }

  return (
    <>
      {' '}
      <RectangleMain clicked={click}>
        <ButtonAnimate clicked={click} onClick={handleClick}></ButtonAnimate>
        <StyledForm
          onSubmit={handleSubmit}
          // sx={{ marginRight: '150px' }}
          className="login">
          <Title>Sign In</Title>
          <StyledInput
            name="email"
            id="emailIdLog"
            onChange={handleChange}
            placeholder="Email address"
            {...(errors.email && { error: true, helperText: errors.email })}
          />
          <StyledInput
            name="password"
            id="passwordIdLog"
            placeholder="Password"
            onChange={handleChange}
            {...(errors.password && {
              error: true,
              helperText: errors.password,
            })}
          />
          {/*<Link href="#">Forgot Your Password?</Link>*/}
          <StyledButton type="submit">Sign In</StyledButton>
          <StyledButton onClick={resetForm}>Reset</StyledButton>
        </StyledForm>

        <StyledForm
          onSubmit={handleSubmit}
          sx={{ marginLeft: '50px' }}
          className="register">
          <Title>Sign Up</Title>
          <StyledInput
            type="text"
            name="firstName"
            id="firstNameId"
            placeholder="First Name"
            onChange={handleChange}
          />

          <StyledInput
            type="text"
            name="lastName"
            id="lastNameId"
            placeholder="Last Name"
            onChange={handleChange}
          />

          <StyledInput
            type="text"
            name="userType"
            id="userTypedId"
            placeholder="User type"
            onChange={handleChange}
          />

          <StyledInput
            type="text"
            name="userName"
            id="userNameId"
            placeholder="User Name"
            onChange={handleChange}
          />

          <StyledInput
            type="email"
            name="email"
            id="emailIdReg"
            placeholder="Email address"
            onChange={handleChange}
          />

          <StyledInput
            name="password"
            id="passwordIdReg"
            placeholder="Password"
            onChange={handleChange}
          />

          <StyledInput
            type="password"
            name="confirmedPassword"
            id="confirmedPasswordId"
            placeholder="Repeat password"
            onChange={handleChange}
          />

          <Link href="#" onClick={handleClick}>
            Already have an Account?
          </Link>
          <StyledButton type="submit">Sign Up</StyledButton>
        </StyledForm>

        <Text className="text1" clicked={click}>
          <h1>Welcome!</h1>
          Don't have an account?
          <br />
          <span className="attention">Click on Logo</span>
          <span className="attention-icon">⤶</span>
        </Text>

        <Text className="text2" clicked={click}>
          <h1>Hi There!</h1>
          Already have an account?
          <br />
          <span className="attention">Click on Logo</span>
          <span className="attention-icon">⤷</span>
        </Text>

        <RectangleFirst clicked={click} />
        <RectangleSecond clicked={click} />
      </RectangleMain>
    </>
  )
}

export default Auth
