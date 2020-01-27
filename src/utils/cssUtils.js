export const cssUtils = {

    getDefaultHeaderStyle(width, align) {
        return {
            width: `${width}`,
            textAlign: `${align}`,
            fontSize: '16px'
        }
    },

    getShortCellStyle() {
        return {
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
        }
    }
}


