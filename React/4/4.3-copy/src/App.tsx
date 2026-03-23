import { useState, useEffect } from 'react'
import './App.css'
import UserApi from './api/users/UserApi'
import type { User } from './api/users/user.types'
import ProductList from './components/ProductList'
import UserComponent from './components/User'

function App() {
  const [users, setUsers] = useState<User[]>([])
  const [singleUser, setSingleUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [tokenStatus, setTokenStatus] = useState<string>('No token stored')

  const userApi = new UserApi()

  // Check for token on mount
  useEffect(() => {
    checkToken()
  }, [])

  const checkToken = () => {
    const token = localStorage.getItem('authToken')
    if (token) {
      setTokenStatus(`Token stored: ${token.substring(0, 20)}...`)
    } else {
      setTokenStatus('No token stored')
    }
  }

  const storeDummyToken = () => {
    const dummyToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.dummy-token-12345'
    localStorage.setItem('authToken', dummyToken)
    setTokenStatus(`Token stored: ${dummyToken.substring(0, 20)}...`)
    console.log('✅ Dummy token stored in localStorage:', dummyToken)
  }

  const removeToken = () => {
    localStorage.removeItem('authToken')
    setTokenStatus('No token stored')
    console.log('✅ Token removed from localStorage')
  }

  const handleGetUserById = async () => {
    setLoading(true)
    setError(null)
    setUsers([])
    try {
      const user = await userApi.getUserById(1)
      setSingleUser(user)
    } catch (err) {
      setError('Failed to fetch user with ID 1')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateUser = async () => {
    setLoading(true)
    setError(null)
    try {
      await userApi.createUser({
        name: "Shivam",
        email: "shivam@example.com",
        password: "secret123",
      })
      alert('User created successfully! Check console for request with Authorization header.')
    } catch (err) {
      setError('Failed to create user')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
     
      <h1>Vite + React - Axios Interceptors Demo</h1>
      
      {/* Token Management Section */}
      <div className="card">
        <h3>🔐 Token Management</h3>
        <p className="token-status">{tokenStatus}</p>
        <div className="button-group">
          <button onClick={storeDummyToken} disabled={loading}>
            Store Dummy Token
          </button>
          <button onClick={removeToken} disabled={loading}>
            Remove Token
          </button>
        </div>
      </div>

     
      <div className="card">
        <div className="button-group">
          <button onClick={handleGetUserById} disabled={loading}>
            {loading ? 'Loading...' : 'Get User (ID: 1)'}
          </button>
          <button onClick={handleCreateUser} disabled={loading}>
            {loading ? 'Loading...' : 'Create User'}
          </button>
        </div>
        {error && (
          <div className="error-message">
            <span>❌</span> {error}
          </div>
        )}
        
        {/* Single User Display */}
        {singleUser && (
          <div className="user-card single-user">
            <h3>👤 User Details</h3>
            <div className="user-info">
              <p><strong>ID:</strong> {singleUser.id}</p>
              <p><strong>Name:</strong> {singleUser.name}</p>
              <p><strong>Email:</strong> {singleUser.email}</p>
            </div>
          </div>
        )}
        
        {/* Users List Display */}
        {users.length > 0 && (
          <div className="users-list">
            <h3>📋 All Users ({users.length})</h3>
            <div className="user-grid">
              {users.map(user => (
                <div key={user.id} className="user-card">
                  <h4>{user.name}</h4>
                  <p>{user.email}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    
    <div>
      <p>Exercise 4</p>
      <ProductList/>
    </div>
    <div>
      <p>Exercise 6</p>
      <UserComponent/>
    </div>
    </>
  )
}

export default App

