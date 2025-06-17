// tests/use-funnel.test.tsx
/// <reference types="vitest/globals" />
/// <reference types="@testing-library/jest-dom" />
import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { describe, expect, it } from 'vitest'
import { useFunnel } from '../src/hooks/use-funnel'

const TestComponent = ({ defaultStep }: { defaultStep: string }) => {
  const { Funnel, Step, currentStep, setStep } = useFunnel(defaultStep)

  return (
    <div>
      <div>currentStep: {currentStep}</div>
      <button onClick={() => setStep('step2')}>Go to Step 2</button>
      <Funnel>
        <Step name="step1">
          <div>Step 1 Content</div>
        </Step>
        <Step name="step2">
          <div>Step 2 Content</div>
        </Step>
      </Funnel>
    </div>
  )
}

describe('useFunnel', () => {
  render(<TestComponent defaultStep="step1" />)

  it('초기 step이 올바르게 설정되어야 한다', () => {
    expect(screen.getByText('currentStep: step1')).toBeInTheDocument()
    expect(screen.getByText('Step 1 Content')).toBeInTheDocument()
    expect(screen.queryByText('Step 2 Content')).not.toBeInTheDocument()
  })

  it('setStep을 호출하면 다른 step이 렌더링되어야 한다', () => {
    const button = screen.getByRole('button', { name: 'Go to Step 2' })
    fireEvent.click(button)

    expect(screen.getByText('currentStep: step2')).toBeInTheDocument()
    expect(screen.getByText('Step 2 Content')).toBeInTheDocument()
    expect(screen.queryByText('Step 1 Content')).not.toBeInTheDocument()
  })
})
