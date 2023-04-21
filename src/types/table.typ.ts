export interface Column<T = string> {
  id: T
  label: string
  minWidth?: number
  align?: 'center' | 'left' | 'right' | 'inherit' | 'justify'
  format?: (value: number) => string
  maxWidth?: number
}
