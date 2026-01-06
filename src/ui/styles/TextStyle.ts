export interface TextStyle {
    fontSize: number
    color: string
    font?: string
    fontWeight?: string
    letterSpacing?: number
    lineHeight?: number
    textAlign?: 'left' | 'center' | 'right' | 'justify'
    textTransform?: 'none' | 'uppercase' | 'lowercase' | 'capitalize'
    anchorX?: 'left' | 'center' | 'right'
    anchorY?: 'top' | 'middle' | 'bottom'
}

export interface BaselineStyle extends TextStyle {
    marginBottom?: string,
    textAlign?: 'left' | 'center' | 'right' | 'justify'
}

export const defaultBaselineStyle: BaselineStyle = {
    fontSize: 16,
    color: '#ffffff',
    marginBottom: '15px',
    font: '/fonts/NotoSansCJKkr-Medium.ttf',
}

export const uiBaselineStyle: BaselineStyle = {
    fontSize: 14,
    color: '#ffffff',
    font: '/fonts/NotoSansCJKkr-Medium.ttf',
    textAlign: 'center',
    anchorX: 'center',
    anchorY: 'middle',
    letterSpacing: 0.12,
}   

export const highlightedBaselineStyle: BaselineStyle = {
    fontSize: 16,
    color: '#ffcc00',
    marginBottom: '15px',
    font: '/fonts/NotoSansCJKkr-Medium.ttf',
}

export interface DescriptionStyle extends TextStyle {
    fontStyle?: 'normal' | 'italic' | 'oblique'
    marginTop?: string
    marginBottom?: string,
    lineHeight?: number,
    letterSpacing?: number,
}

export const defaultDescriptionStyle: DescriptionStyle = {
    fontSize: 14,
    color: '#cccccc',
    fontStyle: 'normal',
    marginTop: '10px',
    marginBottom: '10px',
    lineHeight: 1.5,
    letterSpacing: 0.02,
    textAlign: 'left',
    anchorX: 'left',
    anchorY: 'top',
    font: '/fonts/NotoSansCJKkr-Thin.ttf',
}

export const highlightedDescriptionStyle: DescriptionStyle = {
    fontSize: 14,
    color: '#ffcc00',
    fontStyle: 'italic',
    marginTop: '10px',
    marginBottom: '10px',
    font: '/fonts/NotoSansCJKkr-Thin.ttf',
}


export interface HeadlineStyle extends TextStyle {
    textTransform?: 'none' | 'uppercase' | 'lowercase' | 'capitalize'
    marginBottom?: string
}

export const defaultHeadlineStyle: HeadlineStyle = {
    fontSize: 32,
    color: '#dfdddd',
    textTransform: 'none',
    marginBottom: '20px',
    font: '/fonts/NotoSansCJKkr-Bold.ttf'
}

export const uiHeadlineStyle: BaselineStyle = {
    fontSize: 15,
    color: '#dfdddd',
    textTransform: 'none',
    marginBottom: '20px',
    font: '/fonts/NotoSansCJKkr-Bold.ttf',
    textAlign: 'center',
    anchorX: 'center',
    anchorY: 'middle',
    letterSpacing: 0.12,
}   

export const highlightedHeadlineStyle: HeadlineStyle = {
    fontSize: 32,
    color: '#ffcc00',
    textTransform: 'uppercase',
    marginBottom: '20px',
    font: '/fonts/NotoSansCJKkr-Bold.ttf'
}


export interface SourceCodeStyle extends TextStyle {
    backgroundColor: string
    padding: string
    borderRadius?: string
    boxShadow?: string
}

export const defaultSourceCodeStyle: SourceCodeStyle = {
    fontSize: 14,
    color: '#f8f8f2',
    backgroundColor: '#2d2d2d',
    padding: '10px',
    borderRadius: '5px',
    font: '/fonts/NotoSansMonoCJKkr-R.ttf',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
}

export const highlightedSourceCodeStyle: SourceCodeStyle = {
    fontSize: 14,
    color: '#f8f8f2',
    backgroundColor: '#393939',
    padding: '10px',
    borderRadius: '5px',
    font: '/fonts/NotoSansMonoCJKkr-R.ttf',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
}