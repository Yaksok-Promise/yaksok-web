/// <reference types="vitest/globals" />
/// <reference types="@testing-library/jest-dom" />

import { uiConfig } from '@yaksok/test-config/ui'
import { defineProject, mergeConfig } from 'vitest/config'

const config = mergeConfig(
  uiConfig,
  defineProject({
    test: {
      setupFiles: ['./setup.ts'],
      globals: true,
    },
  })
)

export default config
