import { Stack } from '@/utils/stackflow'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Router from './router'
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
      <Router />
      <Stack />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
