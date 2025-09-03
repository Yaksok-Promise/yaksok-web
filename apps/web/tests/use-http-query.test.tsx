// use-http-query.test.tsx
import { describe, it, vi, expect } from 'vitest'
import { cleanup, render, screen, waitFor } from '@testing-library/react'
import {
  QueryClient,
  QueryClientProvider,
  UseQueryOptions,
} from '@tanstack/react-query'
import { useHttpQuery } from '../src/hooks/tanstak/use-http-query'
import { http, PathType } from '@yaksok/api'
import React from 'react'

// http.get 모킹
vi.mock('@yaksok/api', () => {
  return {
    http: {
      get: vi.fn(),
    },
  }
})

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: 0,
      gcTime: 0,
    },
  },
})

// 테스트용 컴포넌트
function TestComponent() {
  const { data } = useHttpQuery(
    ['test-key'],
    '/api/test' as PathType,
    { params: { foo: 'bar' } },
    { suspense: false } as Omit<
      UseQueryOptions<unknown, unknown, unknown, string[]>,
      'queryKey' | 'queryFn'
    >
  )
  return <div>{data as string}</div>
}

describe('useHttpQuery', () => {
  afterEach(() => {
    cleanup()
    queryClient.clear()
  })

  it('http.get이 올바른 인자로 호출되는지 확인한다', async () => {
    ;(http.get as ReturnType<typeof vi.fn>).mockResolvedValueOnce('mocked-data')

    render(
      <QueryClientProvider client={queryClient}>
        <TestComponent />
      </QueryClientProvider>
    )

    await waitFor(() => {
      expect(screen.getByText('mocked-data')).toBeInTheDocument()
    })

    expect(http.get).toHaveBeenCalledWith('/api/test', {
      params: { foo: 'bar' },
    })
  })

  it('http.get에서 반환된 데이터가 화면에 렌더링되는지 확인한다', async () => {
    ;(http.get as ReturnType<typeof vi.fn>).mockResolvedValueOnce('hello-world')

    render(
      <QueryClientProvider client={queryClient}>
        <TestComponent />
      </QueryClientProvider>
    )

    await waitFor(() => {
      expect(screen.getByText('hello-world')).toBeInTheDocument()
    })
  })
})
