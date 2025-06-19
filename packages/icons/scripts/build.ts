import { readdir } from 'node:fs/promises'
import path from 'node:path'
import { exec } from 'node:child_process'
import { promisify } from 'node:util'
import { writeFile } from 'node:fs/promises'

const EXEC_ASYNC = promisify(exec)

const SVG_DIR = './svg'

const SRC_DIR = './src'

const toPascalCase = (str: string): string =>
  str
    .split(/[-_]/)
    .map(word => word[0].toUpperCase() + word.slice(1))
    .join('')

const getSvgFileNames = async (): Promise<[string[], string[]]> => {
  const files = await readdir(SVG_DIR)

  const svgOriginFileNames = files
    .filter(file => file.endsWith('.svg'))
    .map(file => path.basename(file, '.svg'))

  const svgToPascal = svgOriginFileNames.map(toPascalCase)

  return [svgOriginFileNames, svgToPascal]
}

const getSrcFileNames = async (): Promise<string[]> => {
  const files = await readdir(SRC_DIR)
  const srcNames = files
    .filter(file => file.endsWith('.tsx'))
    .map(file => path.basename(file, '.tsx'))

  return srcNames
}

const generateIndexFile = async () => {
  const files = await getSrcFileNames()

  const exports = files
    .map(name => `export { default as ${name} } from './${name}'`)
    .join('\n')

  await writeFile(path.join(SRC_DIR, 'index.ts'), exports, 'utf-8')
}

const buildSvgToSrc = async () => {
  const [svgOriginFiles, svgFiles] = await getSvgFileNames()
  const tsxFiles = await getSrcFileNames()

  const pendingTasks = svgFiles.map(async (file, index) => {
    if (!tsxFiles.includes(file)) {
      await EXEC_ASYNC(
        `pnpm dlx @svgr/cli --out-dir src --ext tsx --typescript --no-prettier --template scripts/template.cjs --index-template scripts/svgr-index-template.cjs svg/${svgOriginFiles[index]}.svg`
      )
    }
  })

  await Promise.all(pendingTasks)

  await generateIndexFile()
}

buildSvgToSrc()
