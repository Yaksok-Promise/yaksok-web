import { ClassValue, clsx } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

const customTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [
        'text-head1',
        'text-head2',
        'text-head3',
        'text-head4',
        'text-head5',
        'text-head6',
        'text-subhead1',
        'text-subhead2',
        'text-subhead3',
        'text-body1',
        'text-body2',
        'text-caption1',
      ],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return customTwMerge(clsx(inputs))
}
