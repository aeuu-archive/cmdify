import { promises as fs } from 'fs'
import { join } from 'path'

import { Metadata, Symbols } from '@cmdify/common'

export async function loadComponents(
  type: 'commands' | 'listeners' | 'modules',
  path: string,
  recursive: boolean = false
): Promise<{ new (): any }[]> {
  const components: { new (): any }[] = []
  const symbol = (type === 'commands'
    ? Symbols.command
    : type === 'listeners'
    ? Symbols.listener
    : type === 'modules'
    ? Symbols.module
    : undefined)!!

  for (const file of await fs.readdir(path)) {
    const filepath = join(path, file)
    const stats = await fs.stat(filepath)

    if (recursive && stats.isDirectory())
      components.push(...(await loadComponents(type, filepath, true)))

    if (stats.isFile()) {
      const component = (await import(filepath)).default

      if (typeof component !== 'function') continue

      if (!Metadata.exists(symbol, component)) continue

      components.push(component)
    }
  }

  return components
}
