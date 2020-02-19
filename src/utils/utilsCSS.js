export const utilsCSS = {

    getDefaultHeaderStyle(width, align, size) {
        return {
            width: `${width}`,
            textAlign: `${align}`,
            fontSize: `${size ? size : '16px'}`
        }
    },

    getDefaultFilterStyle(size) {
        return {
            fontSize: `${size ? size : '16px'}`
        }
    },

    getDefaultCellStyle(size) {
        return {
            fontSize: `${size ? size : '16px'}`
        }
    },

    getShortCellStyle(size) {
        return {
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            fontSize: `${size ? size : '16px'}`
        }
    },
    getShortEditorStyle(size) {
        return {
            backgroundColor: 'GhostWhite',
            fontSize: `${size ? size : '16px'}`
        }
    },
}


