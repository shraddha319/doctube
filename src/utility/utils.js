function capitalizeString(str, delim = ' ') {
  if (typeof str !== 'string') return str;
  let strArray = str.toLowerCase().split(delim);
  return strArray
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(' ');
}

function lowerCaseHyphenate(str) {
  return str
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');
}

function getFilteredList(videos, filter) {
  let filteredDocs = [...videos];
  if (filter.genre.length > 0)
    filteredDocs = filteredDocs.filter(
      (video) =>
        video.genre.some((g) => filter.genre.includes(g.toLowerCase())) ||
        video.genre.some((g) => filter.genre.includes(g.toLowerCase()))
    );

  if (filter.language.length > 0)
    filteredDocs = filteredDocs.filter((video) =>
      video.language.some((l) => filter.language.includes(l.toLowerCase()))
    );

  if (filter.country.length > 0)
    filteredDocs = filteredDocs.filter((video) =>
      video.country.some((c) => filter.country.includes(c))
    );

  if (filter.year.length > 0)
    filteredDocs = filteredDocs.filter((video) =>
      filter.year.includes(video.releaseDate.year.toString())
    );

  switch (filter.sort) {
    case 'IMDB':
      filteredDocs.sort((a, b) => b.stats.rating.imdb - a.stats.rating.imdb);
      break;
    case 'RECENTLY RELEASED':
      filteredDocs.sort((a, b) => b.releaseDate.year - a.releaseDate.year);
      break;
    case 'NAME':
      filteredDocs.sort((a, b) => {
        let str1 = a.title.toLowerCase(),
          str2 = b.title.toLowerCase();
        if (str1 < str2) return -1;
        if (str2 > str1) return 1;
        return 0;
      });
      break;
    default:
  }
  return filteredDocs;
}

function getSearchedList(videos, searchStr) {
  let filteredDocs = [...videos],
    search = searchStr.toLowerCase();
  if (search !== '')
    return filteredDocs.filter(
      (video) =>
        video.tags.some((t) => t.toLowerCase().includes(search)) ||
        video.genre.some((t) => t.toLowerCase().includes(search)) ||
        video.title.toLowerCase().includes(search)
    );
  return filteredDocs;
}

function getFilteredAndSearchedList(videos, filter) {
  return getSearchedList(getFilteredList(videos, filter), filter.search);
}

function stringifyFilterObj(obj) {
  return Object.entries(obj)
    .reduce(
      (arr, [key, value]) =>
        value.length > 0
          ? arr.concat([
              `${key}${Array.isArray(value) ? '[]' : ''}=${value.toString()}`,
            ])
          : arr,
      []
    )
    .join('&');
}

function parseURLParamStr(str) {
  return decodeURIComponent(str)
    .slice(1)
    .split('&')
    .reduce((obj, elem) => {
      let [key, value] = elem.split('=');
      let isArray = /\[\]/.test(key);
      key = key.replace('[]', '');
      value = value.split(',');
      return {
        ...obj,
        [key]: isArray ? value : value.toString(),
      };
    }, {});
}

function isVideoInPlaylist(videoId, playlist) {
  return playlist.videos.find((vid) => vid._id === videoId) ? true : false;
}

export {
  capitalizeString,
  lowerCaseHyphenate,
  getFilteredList,
  getSearchedList,
  getFilteredAndSearchedList,
  stringifyFilterObj,
  parseURLParamStr,
  isVideoInPlaylist,
};
