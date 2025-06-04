import { describe, expect, it } from 'vitest'
import { cn } from '../src/cn' // ← adjust the path as needed

describe('cn utility', () => {
  it('class name을 병합한다', () => {
    expect(cn('text-sm', 'text-center')).toBe('text-sm text-center')
  })

  it('false 값은 제거한다', () => {
    expect(cn('text-sm', undefined, null, false)).toBe('text-sm')
  })

  it('조건부로 class name을 병합한다', () => {
    expect(cn('text-sm', { 'font-bold': true, italic: false })).toBe(
      'text-sm font-bold'
    )
  })

  it('tailwindcss 충돌을 제거한다', () => {
    expect(cn('text-sm', 'text-lg')).toBe('text-lg') // text-lg overrides text-sm
    expect(cn('bg-red-500', 'bg-blue-500')).toBe('bg-blue-500') // last wins
  })

  it('배열 값을 처리한다', () => {
    expect(cn(['text-sm', ['font-medium', false]])).toBe('text-sm font-medium')
  })
})
