declare module 'troika-three-text' {
  import * as THREE from 'three'

  export class Text extends THREE.Mesh {
    text: string
    font?: string
    fontSize?: number
    color?: THREE.ColorRepresentation

    anchorX?: number | 'left' | 'center' | 'right'
    anchorY?: number | 'top' | 'middle' | 'bottom'

    maxWidth?: number
    lineHeight?: number
    letterSpacing?: number

    outlineWidth?: number
    outlineColor?: THREE.ColorRepresentation

    sync(): void
  }
}