export const utilsCSS = {

    getDefaultHeaderStyle(width: string, align: string, size: number = 16): any {
        return {
            width: `${width}`,
            textAlign: `${align}`,
            fontSize: `${size ? size : '16px'}`
        }
    },

    getDefaultFilterStyle(size: number): any {
        return {
            fontSize: `${size ? size : '16px'}`
        }
    },

    getDefaultCellStyle(size: number): any {
        return {
            fontSize: `${size ? size : '16px'}`
        }
    },

    getShortCellStyle(size: number): any {
        return {
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            maxWidth: '350px',
            fontSize: `${size ? size : '16px'}`
        }
    },

    getShortEditorStyle(size: number): any {
        return {
            backgroundColor: 'GhostWhite',
            fontSize: `${size ? size : '16px'}`
        }
    }
}


