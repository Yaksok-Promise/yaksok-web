import {
  createContext,
  forwardRef,
  useContext,
  type ComponentPropsWithoutRef,
} from 'react'
import { cn } from '@yaksok/utils'
import { cva, type VariantProps } from 'class-variance-authority'

const headerVariants = cva(
  'absolute top-0 left-0 grid h-13 w-full grid-cols-[auto_1fr_auto] items-center px-5',
  {
    variants: {
      theme: {
        black: 'bg-black text-white',
        white: 'bg-white text-black',
      },
    },
    defaultVariants: {
      theme: 'white',
    },
  }
)

const HeaderThemeContext = createContext<'black' | 'white' | null>('white')
const useHeaderTheme = () => useContext(HeaderThemeContext)

export interface HeaderProps
  extends ComponentPropsWithoutRef<'div'>,
    VariantProps<typeof headerVariants> {}

const HeaderContainer = forwardRef<HTMLDivElement, HeaderProps>(
  ({ children, theme = 'white', className, ...props }, ref) => {
    return (
      <HeaderThemeContext.Provider value={theme}>
        <header
          ref={ref}
          className={cn(headerVariants({ theme }), className)}
          {...props}
        >
          {children}
        </header>
      </HeaderThemeContext.Provider>
    )
  }
)
HeaderContainer.displayName = 'Header.Container'

const LeftContent = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<'div'>>(
  ({ className, ...props }, ref) => {
    const theme = useHeaderTheme()
    const textColor = theme === 'black' ? 'text-white' : 'text-black'

    return (
      <div
        ref={ref}
        className={cn('col-start-1', textColor, className)}
        {...props}
        role=""
      >
        {props.children}
      </div>
    )
  }
)
LeftContent.displayName = 'Header.Left'

const Title = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<'div'>>(
  ({ className, ...props }, ref) => {
    const theme = useHeaderTheme()
    const textColor = theme === 'black' ? 'text-white' : 'text-black'

    return (
      <h1
        ref={ref}
        className={cn(
          'col-start-2 text-center text-subhead1',
          textColor,
          className
        )}
        {...props}
      >
        {props.children}
      </h1>
    )
  }
)
Title.displayName = 'Header.Title'

const RightContent = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<'div'>
>(({ className, ...props }, ref) => {
  const theme = useHeaderTheme()
  const textColor = theme === 'black' ? 'text-white' : 'text-black'

  return (
    <div
      ref={ref}
      className={cn('col-start-3 justify-self-end', textColor, className)}
      {...props}
    >
      {props.children}
    </div>
  )
})
RightContent.displayName = 'Header.Right'

export const Header = {
  Container: HeaderContainer,
  Left: LeftContent,
  Right: RightContent,
  Title,
}
