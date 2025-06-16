import { Stack } from '@/utils/stackflow'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Suspense } from 'react'
import { ErrorProvider } from './components/common/error-boundary'
import Router from './router'
import '@yaksok/ui/styles.css'
import '@stackflow/plugin-basic-ui/index.css'
import '@yaksok/ui/styles.css'
import { Suspense } from 'react'
import { ErrorProvider } from './components/common/error-boundary'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      throwOnError: true,
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ErrorProvider>
        <Suspense fallback={<div>LOADING</div>}>
          <Router />
          <Stack />
        </Suspense>
      </ErrorProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
