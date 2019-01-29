export default (text) =>
  text.toString().toLowerCase()
    .replace(/\s+/g, '-')
    // eslint-disable-next-line
    .replace(/[^\w\-]+/g, '')
    // eslint-disable-next-line
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');