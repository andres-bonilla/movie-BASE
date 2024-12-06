export const parseSearchParams = searchString => {
  const pattern = /^\?([^=]+)=([^&]+)(?:&on=(.*))?$/; // ?*=*&on=* or ?*=*

  const match = searchString.match(pattern);
  if (match) {
    let [, type, words, page] = match;
    page = page ? Number(page) : 1;
    words = decodeURIComponent(words).replaceAll("+", " ");

    return { type, words, page };
  }

  return { type: "any", words: "", page: 1 };
};
