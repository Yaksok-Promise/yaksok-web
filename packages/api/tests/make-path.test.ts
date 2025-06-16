import { describe, expect, it } from 'vitest'
import { UrlOption, makePath } from '../path'

describe('makePath', () => {
  it('params와 query가 모두 없는 경우 path 그대로 반환', () => {
    const result = makePath('/posts', {})
    expect(result).toBe('/posts')
  })

  it('params만 있는 경우 path에 치환되어 반환', () => {
    const option: UrlOption = {
      params: {
        postId: '123',
      },
    }
    const result = makePath('/posts/{postId}', option)
    expect(result).toBe('/posts/123')
  })

  it('query만 있는 경우 query string이 붙어서 반환', () => {
    const option: UrlOption = {
      query: {
        page: '1',
        limit: '10',
      },
    }
    const result = makePath('/posts', option)
    expect(result).toBe('/posts?page=1&limit=10')
  })

  it('params와 query가 모두 있는 경우 치환 및 query string 포함 반환', () => {
    const option: UrlOption = {
      params: {
        postId: '123',
        commentId: '456',
      },
      query: {
        sort: 'desc',
        page: '2',
      },
    }
    const result = makePath('/posts/{postId}/comments/{commentId}', option)
    expect(result).toBe('/posts/123/comments/456?sort=desc&page=2')
  })

  it('params에 정의된 키가 path에 없는 경우 무시', () => {
    const option: UrlOption = {
      params: {
        postId: '123',
        commentId: '456',
      },
    }
    const result = makePath('/posts/{postId}', option)
    expect(result).toBe('/posts/123')
  })

  it('params에 있는 값이 path에 여러 번 등장할 경우 모두 치환', () => {
    const option: UrlOption = {
      params: {
        postId: '123',
      },
    }
    const result = makePath('/posts/{postId}/edit/{postId}', option)
    expect(result).toBe('/posts/123/edit/123')
  })
})
