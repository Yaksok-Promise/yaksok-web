import { cn } from '@yaksok/utils'
import { type VariantProps, cva } from 'class-variance-authority'
import {
  type ComponentPropsWithoutRef,
  createContext,
  forwardRef,
  useContext,
} from 'react'

const headerVariants = cva(
  'fixed top-0 left-0 grid h-13 w-full grid-cols-[auto_1fr_auto] items-center px-5',
  {
    variants: {
      theme: {
        black: '',
        white: '',
      },
      blur: {
        true: 'backdrop-blur-[50px]',
        false: '',
      },
    },
    compoundVariants: [
      {
        theme: 'black',
        blur: true,
        class: 'bg-black01 text-white',
      },
      {
        theme: 'black',
        blur: false,
        class: 'bg-black01 text-white',
      },
      {
        theme: 'white',
        blur: true,
        class: 'bg-white/30 text-black01',
      },
      {
        theme: 'white',
        blur: false,
        class: 'bg-white text-black01',
      },
    ],
    defaultVariants: {
      theme: 'white',
      blur: false,
    },
  }
)

const HeaderThemeContext = createContext<'black' | 'white' | null>('white')
const useHeaderTheme = () => useContext(HeaderThemeContext)

export interface HeaderProps
  extends ComponentPropsWithoutRef<'div'>,
    VariantProps<typeof headerVariants> {}

const HeaderContainer = forwardRef<HTMLDivElement, HeaderProps>(
  ({ children, theme = 'white', blur = false, className, ...props }, ref) => {
    return (
      <HeaderThemeContext.Provider value={theme}>
        <nav
          ref={ref}
          className={cn(headerVariants({ theme, blur }), className)}
          {...props}
        >
          {children}
        </nav>
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
      >
        {props.children}
      </div>
    )
  }
)
LeftContent.displayName = 'Header.Left'

const Title = forwardRef<HTMLHeadingElement, ComponentPropsWithoutRef<'h1'>>(
  ({ className, ...props }, ref) => {
    const theme = useHeaderTheme()
    const textColor = theme === 'black' ? 'text-white' : 'text-black'

    return (
      <h1
        ref={ref}
        className={cn(
          '-translate-x-1/2 absolute left-1/2 text-center text-subhead1',
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
