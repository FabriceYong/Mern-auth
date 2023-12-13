import React, { useState } from 'react'
import FormContainer from '../components/FormContainer'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col, FormLabel } from 'react-bootstrap'

const RegisterScreen = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const submitHandler = async (e) => {
    e.preventDefault()
    const formData = { username, email, password }
    try {
          const res = await fetch('/api/users', {
        method: 'POST',
        'Content-Type': 'application/json',
        body: JSON.stringify(formData)
    })
    const data = await res.json()
    console.log(data)
    } catch(err) {
        setError(err.message)
        setLoading(false)
    }
  
  }

//   const signupChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.value]: e.target.value,
//     })
//   }

  return (
    <FormContainer>
      <h1>Sign Up</h1>

      <Form onSubmit={submitHandler}>
        <Form.Group className="my-2" controlId="username">
          <Form.Label>Your Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="my-2" controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            value={email}
            placeholder="Enter Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="my-2" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group className='my-2' controlId='confirmPassword'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type='password' value={confirmPassword} placeholder='Confirm Password' onChange={(e) => setConfirmPassword(e.target.value)} />
        </Form.Group>
        <Row className="py-3">
          <Col>
            Registered Customer?{' '}
            <Link to={'/login'}>
              <span className="text-underline">click here</span>
            </Link>{' '}
            to Login
          </Col>
        </Row>

        <Button type="submit" variant="primary" className="mt-3">
          Sign Up
        </Button>
      </Form>
    </FormContainer>
  )
}

export default RegisterScreen
