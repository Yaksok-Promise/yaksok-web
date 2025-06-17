import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from './button'

const APP = 'GameLink'

describe('<Button />', () => {
  /** Reset a fresh mock for window.alert before every spec */
  beforeEach(() => {
    // jsdom provides window but no alert, so we stub it
    // (globalThis works the same)
    // eslint‑disable‑next‑line @typescript-eslint/ban-ts-comment
    // @ts-ignore – we are intentionally overriding it
    window.alert = vi.fn()
  })

  it('shows the correct alert message when clicked', async () => {
    render(<Button appName={APP}>Click me</Button>)

    await userEvent.click(screen.getByRole('button', { name: /click me/i }))

    expect(window.alert).toHaveBeenCalledTimes(1)
    expect(window.alert).toHaveBeenCalledWith(`Hello from your ${APP} app!`)
  })

  it('applies the given className to the button element', () => {
    render(
      <Button appName={APP} className="my-custom-class">
        Styled
      </Button>
    )

    expect(screen.getByRole('button', { name: /styled/i })).toHaveClass(
      'my-custom-class'
    )
  })
})
