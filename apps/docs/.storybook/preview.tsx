import type { Preview } from '@storybook/react'
import '../src/index.css'
import '@yaksok/ui/styles.css'
import { ModalRoot } from '@yaksok/ui/modal'
import React, { Fragment } from 'react'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview
