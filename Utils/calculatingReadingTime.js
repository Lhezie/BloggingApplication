module.exports = (body) => {
    const wordsPerMinute = 200; // Average reading speed
    const wordCount = body.split(' ').length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);
    return `${readingTime} min read`;
 };
 