import { cn } from '../../utils/src/cn'

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export default function TextField({
  className,
  type = 'text',
  ...props
}: TextFieldProps) {
  return (
    <input
      style={{
        outline: 'none',
      }}
      className={cn('bg-text-body2', className)}
      {...props}
    />
  )
}
