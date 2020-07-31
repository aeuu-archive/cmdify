export interface CommandMetadata {
  name: string

  description?: string
  category?: string
  usage?: string

  aliases?: string[]
}
