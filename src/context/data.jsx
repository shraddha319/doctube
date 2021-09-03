import { createContext, useContext, useReducer } from 'react';
import dataReducer from './reducer/data';

const DataContext = createContext();

export function DataProvider({ children }) {
  const [data, dispatchData] = useReducer(dataReducer, {
    videos: [],
    playlists: [
      {
        _id: 'pl1',
        name: 'Watch Later',
        videos: [
          {
            _id: 'v1',
            youtubeId: 'iX8GxLP1FHo',
            imdbPage: 'https://www.imdb.com/title/tt4736550/',
            imageURL:
              'https://m.media-amazon.com/images/M/MV5BMGViZWEwOGItMGZlMC00YzE1LTk5ZWItMGYxYjhhMjBmNDMwXkEyXkFqcGdeQXVyNDg4NjY5OTQ@._V1_.jpg',
            title: 'The Great Hack',
            description:
              'The Great Hack uncovers the dark world of data exploitation through the compelling personal journeys of players on different sides of the explosive Cambridge Analytica/Facebook data scandal.',
            tagline: 'They Took Your Data. Then They Took Control.',
            genre: ['history', 'technology'],
            language: ['English'],
            country: ['United States'],
            stats: {
              likes: '66K',
              dislikes: '1.7K',
              rating: {
                imdb: 7.1,
                rottenTomatoes: 87,
              },
            },
            tags: [
              'biography',
              'history',
              'trending',
              'data',
              'information',
              'crime',
            ],
            officialSite: 'Netflix',
            releaseDate: {
              day: 26,
              year: 2019,
              month: 1,
            },
            director: ['Karim Amer', 'Jehane Noujaim'],
            durationMin: 139,
          },
          {
            _id: 'v2',
            youtubeId: 'gBaXUU8c-Mk',
            imdbPage: 'https://www.imdb.com/title/tt3810760/',
            imageURL:
              'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSiXS_V4WBvve0o_k8g7YketsVisafx0PcvxovRfQRMRrDY9azz',
            title: 'Minimalism',
            tagline: 'Imagine a life with less.',
            description:
              'How might your life be better with less? Minimalism: A Documentary About the Important Things examines the many flavors of minimalism by taking the audience inside the lives of minimalists from all walks of life -- families, entrepreneurs, architects, artists, journalists, scientists, and even a former Wall Street broker -- all of whom are striving to live a meaningful life with less.',
            genre: ['life style'],
            language: ['English'],
            country: ['United States'],
            stats: {
              likes: '',
              dislikes: '',
              rating: {
                imdb: 6.7,
                rottenTomatoes: 52,
              },
            },
            tags: ['life style', 'people', 'minimalism', 'life', 'less'],
            officialSite: 'Netflix',
            releaseDate: {
              day: 26,
              year: 2020,
              month: 11,
            },
            director: ["Matt D'Avella"],
            durationMin: 79,
          },
        ],
      },
      {
        _id: 'pl2',
        name: 'Liked',
        videos: [
          {
            _id: 'v1',
            youtubeId: 'iX8GxLP1FHo',
            imdbPage: 'https://www.imdb.com/title/tt4736550/',
            imageURL:
              'https://m.media-amazon.com/images/M/MV5BMGViZWEwOGItMGZlMC00YzE1LTk5ZWItMGYxYjhhMjBmNDMwXkEyXkFqcGdeQXVyNDg4NjY5OTQ@._V1_.jpg',
            title: 'The Great Hack',
            description:
              'The Great Hack uncovers the dark world of data exploitation through the compelling personal journeys of players on different sides of the explosive Cambridge Analytica/Facebook data scandal.',
            tagline: 'They Took Your Data. Then They Took Control.',
            genre: ['history', 'technology'],
            language: ['English'],
            country: ['United States'],
            stats: {
              likes: '66K',
              dislikes: '1.7K',
              rating: {
                imdb: 7.1,
                rottenTomatoes: 87,
              },
            },
            tags: [
              'biography',
              'history',
              'trending',
              'data',
              'information',
              'crime',
            ],
            officialSite: 'Netflix',
            releaseDate: {
              day: 26,
              year: 2019,
              month: 1,
            },
            director: ['Karim Amer', 'Jehane Noujaim'],
            durationMin: 139,
          },
        ],
      },
    ],
  });

  function getVideo(ytId) {
    return data.videos.find((video) => video.youtubeId === ytId);
  }

  return (
    <DataContext.Provider value={{ data, dispatchData, getVideo }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  return useContext(DataContext);
}
