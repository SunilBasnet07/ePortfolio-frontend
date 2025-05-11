'use client'
import ResetPassword from '@/components/ResetPassword'
import { useSearchParams } from 'next/navigation'
import React from 'react'

const ResetPasswordPage = ({ params }) => {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const unwrappedParams = React.use(params)
  const userId = unwrappedParams.userId

  return (
    <div>
      <ResetPassword userId={userId} token={token} />
    </div>
  )
}

export default ResetPasswordPage