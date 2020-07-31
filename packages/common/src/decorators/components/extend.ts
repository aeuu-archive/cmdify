import { ExtendMetadata, Metadata, Symbols } from '../..'

export function Extend(parent: { new (): any }): ClassDecorator {
  const components: Symbols[] = Symbols.values().filter(k =>
    Metadata.exists(k, parent.prototype)
  )

  return (Target: Function): void =>
    Metadata.addList(
      Symbols.extend,
      components.map(
        (component): ExtendMetadata => ({
          component,

          target: parent
        })
      ),
      Target.prototype
    )
}
