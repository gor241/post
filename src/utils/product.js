export const isLiked = (likes, userId) => likes.some(id => id === userId);
 
export const createMarkup = (textToHtml) => {
    return {__html: textToHtml}
} 