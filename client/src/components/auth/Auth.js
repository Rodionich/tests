import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login, register } from '../../actions/auth'
import './style.css'
import {
  Text,
  Title,
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

  const handleSubmit = e => {
    e.preventDefault()
    if (isSignup) {
      dispatch(register(formData, history))
    } else {
      dispatch(login(formData, history))
    }
  }

  const handleChange = e => {
    const name =
      e.target.name === 'password2' || e.target.name === 'email2'
        ? e.target.name.slice(0, -1)
        : e.target.name
    validate({ [e.target.name]: e.target.value })
    setFormData({ ...formData, [name]: e.target.value })
  }

  const switchMode = () => {
    setIsSignup(prevIsSignup => !prevIsSignup)
  }

  const [click, setClick] = useState(false)
  const handleClick = () => {
    setClick(!click)
    switchMode()
  }

  const validate = (formValues = formData) => {
    const temp = { ...errors }

    if (formValues.email === '') {
      delete temp.email
      return setErrors({ ...temp })
    }

    if (formValues.password === '') {
      delete temp.password
      return setErrors({ ...temp })
    }

    if ('email' in formValues)
      temp.email = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formValues.email)
        ? ''
        : 'Email is not valid.'
    if ('email2' in formValues)
      temp.email2 = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formValues.email)
        ? ''
        : 'Email is not valid.'
    if ('password' in formValues)
      temp.password = formValues.password.length > 7 ? '' : 'Length > 7'
    if ('password2' in formValues)
      temp.password2 = formValues.password2.length > 7 ? '' : 'Length > 7'
    if ('firstName' in formValues)
      temp.firstName = formValues.firstName.length > 3 ? '' : 'Length > 3'
    if ('lastName' in formValues)
      temp.lastName = formValues.lastName.length > 3 ? '' : 'Length > 3'
    if ('userType' in formValues)
      temp.userType =
        formValues.userType === 'Student' || formValues.userType === 'Teacher'
          ? ''
          : 'Student or Teacher'
    if ('userName' in formValues)
      temp.userName = formValues.userName.length > 7 ? '' : 'Length > 7'
    if ('confirmedPassword' in formValues)
      temp.confirmedPassword =
        formValues.confirmedPassword === formData.password
          ? ''
          : 'Passwords dont match'
    setErrors({
      ...temp,
    })

    return Object.values(temp).every(x => x === '')
  }

  return (
    <>
      <RectangleMain clicked={click}>
        <ButtonAnimate clicked={click} onClick={handleClick}></ButtonAnimate>
        <StyledForm onSubmit={handleSubmit} className="login">
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
            type="password"
            id="passwordIdLog"
            placeholder="Password"
            onChange={handleChange}
            {...(errors.password && {
              error: true,
              helperText: errors.password,
            })}
          />
          <StyledButton type="submit">Sign In</StyledButton>
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
            {...(errors.firstName && {
              error: true,
              helperText: errors.firstName,
            })}
          />

          <StyledInput
            type="text"
            name="lastName"
            id="lastNameId"
            placeholder="Last Name"
            onChange={handleChange}
            {...(errors.lastName && {
              error: true,
              helperText: errors.lastName,
            })}
          />

          <StyledInput
            type="text"
            name="userType"
            id="userTypedId"
            placeholder="User type"
            onChange={handleChange}
            {...(errors.userType && {
              error: true,
              helperText: errors.userType,
            })}
          />

          <StyledInput
            type="text"
            name="userName"
            id="userNameId"
            placeholder="User Name"
            onChange={handleChange}
            {...(errors.userName && {
              error: true,
              helperText: errors.userName,
            })}
          />

          <StyledInput
            type="email"
            name="email2"
            id="emailIdReg"
            placeholder="Email address"
            onChange={handleChange}
            {...(errors.email2 && {
              error: true,
              helperText: errors.email2,
            })}
          />

          <StyledInput
            name="password2"
            type="password"
            id="passwordIdReg"
            placeholder="Password"
            onChange={handleChange}
            {...(errors.password2 && {
              error: true,
              helperText: errors.password2,
            })}
          />

          <StyledInput
            type="password"
            name="confirmedPassword"
            id="confirmedPasswordId"
            placeholder="Repeat password"
            onChange={handleChange}
            {...(errors.confirmedPassword && {
              error: true,
              helperText: errors.confirmedPassword,
            })}
          />

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
