import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col, FormLabel } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'

const LoginScreen = () => {
    const [ formData, setFormData] = useState({})
    const [ loading, setLoading] = useState(false)
    const [ error, setError] = useState(null)

    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            const res = await fetch('/api/users/auth', {
                method: 'POST',
                'Content-Type': 'application/json',
                body: JSON.stringify(formData)
            })

            const data = await res.json()
            console.log(data)

            if(data.success) {
                setLoading(false)
                setError(data.error)
            }
        } catch (err) {
            setLoading(false)
            setError(err.message)
        }
    }

    const loginChange = (e) => {
        setFormData({
            ...formData,
            [e.target.controlId]: e.target.value
        })
    }

  return (
    <FormContainer>
        <h1>Sign In</h1>

        <Form onSubmit={ submitHandler }>
            <Form.Group className='my-2' controlId='email'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control type='email' placeholder='Enter Email' onChange={loginChange} />
            </Form.Group>
            <Form.Group className='my-2' controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control type='password' placeholder='Enter Password' onChange={loginChange} />
            </Form.Group>

            <Row className='py-3'>
                <Col>New Customer? <Link to={'/register'}><span className='text-underline'>click here</span></Link> to Register</Col>
            </Row>

            <Button type='submit' variant='primary' className='mt-3'>Submit</Button>
        </Form>
    </FormContainer>
  )
}

export default LoginScreen