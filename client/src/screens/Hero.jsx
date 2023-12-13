import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Card, Container, Button } from 'react-bootstrap'

const Hero = () => {
  return (
    <div className='py-5'>
        <Container className='d-flex justify-content-center hero-card bg-light w-75'>
            <Card className='p-5 d-flex flex-column align-items-center hero-card bg-light mb-4'>
                <LinkContainer to={'/'}>
                <h1 className='text-center mb-4'>MERN authentication</h1>
                </LinkContainer>
                <p>This is a boilerplate for MERN authentication that stores JWT in an HTTP-Only cookie, It also uses Redux Toolkit and the React Bootstrap library</p>
                <div className='d-flex'>
                    <LinkContainer to={'/login'}>
                    <Button variant='primary' className='me-3'>
                        Sign In
                    </Button>
                    </LinkContainer>
                    <LinkContainer to={'/register'}>
                      <Button variant='secondary'>
                        Register
                    </Button>
                    </LinkContainer>
                </div>
            </Card>
        </Container>
    </div>
  )
}

export default Hero