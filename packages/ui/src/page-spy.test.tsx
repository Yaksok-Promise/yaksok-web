import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react'
import { useState } from 'react'
import { PageSpy } from './page-spy'

const TestComponent = () => {
  const TOTAL_LENGTH = 10
  const [step, setStep] = useState(2)
  const increase = () => {
    setStep(prev => prev + 1)
  }
  const decrease = () => {
    setStep(prev => prev - 1)
  }

  return (
    <div>
      <button onClick={increase}>up</button>
      <button onClick={decrease}>down</button>
      <PageSpy totalLength={TOTAL_LENGTH} currentIndex={step} />
    </div>
  )
}

describe('PageSpy', () => {
  afterEach(() => {
    cleanup()
  })

  it('up 버튼을 누르면 width의 percent가 증가한다', async () => {
    render(<TestComponent />)

    const upButton = screen.getByText('up')
    fireEvent.click(upButton)

    const progressBar = await screen.findByRole('page-spy')
    const barChild = progressBar.querySelector('.bg-black01') as HTMLElement

    // 초기 step: 2 → 3 → percent = 40%
    await waitFor(() => {
      expect(barChild.style.width).toBe('40%')
    })
  })

  it('down 버튼을 누르면 width percent가 감소한다', async () => {
    render(<TestComponent />)

    const downButton = screen.getByText('down')
    fireEvent.click(downButton)

    const progressBar = await screen.findByRole('page-spy')
    const barChild = progressBar.querySelector('.bg-black01') as HTMLElement

    // 초기 step: 2 → 1 → percent = 20%
    await waitFor(() => {
      expect(barChild.style.width).toBe('20%')
    })
  })
})
