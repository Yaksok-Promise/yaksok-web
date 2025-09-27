import { Stack } from '@/utils/stackflow'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Suspense } from 'react'
import { ErrorProvider } from './components/common/error-boundary'
import '@yaksok/ui/styles.css'
import '@stackflow/plugin-basic-ui/index.css'

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
          <Stack />
        </Suspense>
      </ErrorProvider>
      <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-right" />
    </QueryClientProvider>
  )
}

export default App
