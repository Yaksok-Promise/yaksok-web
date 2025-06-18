import { ReactNode } from 'react'
import { ErrorBoundary, FallbackProps } from 'react-error-boundary'

function fallbackRender({ error, resetErrorBoundary }: FallbackProps) {
  // Call resetErrorBoundary() to reset the error boundary and retry the render.

  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre className="text-red01">{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
}

export const ErrorProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ErrorBoundary
      fallbackRender={fallbackRender}
      onReset={details => {
        // Reset the state of your app so the error doesn't happen again
        console.log(details)
      }}
    >
      {children}
    </ErrorBoundary>
  )
}
