'use client'
import { useFormStatus } from 'react-dom'
import Link from 'next/link'

const Button = ({
  type = 'button',
  href,
  actionType,
  onClick,
  size = 'medium', // Default size is medium
  children,
  className = '',
  ...props
}) => {
  const { pending } = useFormStatus()

  // Determine the loading text for different actions
  const loadingText =
    {
      delete: 'Deleting...',
      submit: 'Submitting...',
      edit: 'Editing...',
    }[actionType] || 'Loading...'

  // Define size classes
  const sizeClasses = {
    small: 'px-2 py-1 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg',
    block: 'w-full px-4 py-2', // Full width button
  }

  // Define button color based on actionType
  const colorClasses =
    actionType === 'delete'
      ? 'bg-red-500 hover:bg-red-600 text-white'
      : actionType === 'submit'
      ? 'bg-green-500 hover:bg-green-600 text-white'
      : 'bg-blue-500 hover:bg-blue-600 text-white'

  // If it's a link (like Edit button), return a Link component
  if (href) {
    return (
      <Link
        href={href}
        className={`inline-flex items-center justify-center rounded-md ${sizeClasses[size]} ${colorClasses} ${className}`}
      >
        {children}
      </Link>
    )
  }

  return (
    <button
      type={type}
      disabled={pending}
      className={`flex items-center justify-center rounded-md disabled:opacity-50 disabled:cursor-not-allowed ${sizeClasses[size]} ${colorClasses} ${className}`}
      {...props}
      onClick={onClick}
    >
      {pending && (
        <svg
          className='animate-spin h-5 w-5 mr-2 text-white'
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
        >
          <circle
            className='opacity-25'
            cx='12'
            cy='12'
            r='10'
            stroke='currentColor'
            strokeWidth='4'
          ></circle>
          <path
            className='opacity-75'
            fill='currentColor'
            d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
          ></path>
        </svg>
      )}
      {pending ? loadingText : children}
    </button>
  )
}

export default Button
