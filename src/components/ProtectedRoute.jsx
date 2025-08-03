import { useUser } from '@clerk/clerk-react'
import React, { useEffect, useRef } from 'react'
import { Navigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const ProtectedRoute = ({ children }) => {
  const { user } = useUser()
  const hasShownToast = useRef(false);

  useEffect(() => {
    if (!user && !hasShownToast.current) {
      toast.error('Please sign in and then add to cart', {
        position: 'top-center',
        autoClose: 3000,
      });
      hasShownToast.current = true;
    }
  }, [user])

  return (
    <div>
      {
        user ? children : <Navigate to={'/'} />
      }
    </div>
  )
}

export default ProtectedRoute
