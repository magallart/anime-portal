export const LATEST_AIRING_QUERY = `
  query LatestAiring($start: Int!, $end: Int!) {
    Page(perPage: 25) {
      latestAiring: airingSchedules(airingAt_greater: $start, airingAt_lesser: $end, sort: TIME) {
        airingAt
        episode
        media {
          id
          siteUrl
          title {
            english
            romaji
            native
          }
          coverImage {
            large
            medium
            extraLarge
          }
          genres
          isAdult
          startDate {
            year
            month
            day
          }
          averageScore
        }
      }
    }
  }
`;

export const SEARCH_QUERY = `
  query SearchAnime(
    $page: Int
    $perPage: Int
    $search: String
    $genre_in: [String!]
    $season: MediaSeason
    $seasonYear: Int
    $status: MediaStatus
    $format: MediaFormat
    $sort: [MediaSort!]
    $isAdult: Boolean
  ) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        perPage
        currentPage
        lastPage
        hasNextPage
      }
      media(
        search: $search
        genre_in: $genre_in
        season: $season
        seasonYear: $seasonYear
        status: $status
        format: $format
        sort: $sort
        isAdult: $isAdult
        type: ANIME
      ) {
        id
        siteUrl
        title {
          english
          romaji
          native
        }
        coverImage {
          extraLarge
          large
          medium
          color
        }
        format
        status
        averageScore
        popularity
        genres
        isAdult
        nextAiringEpisode {
          airingAt
          episode
        }
      }
    }
  }
`;

export const ANIME_DETAIL_QUERY = `
  query AnimeDetail($slug: String!) {
    Media(search: $slug, type: ANIME) {
      id
      siteUrl
      title {
        english
        romaji
        native
      }
      coverImage {
        extraLarge
        large
        medium
        color
      }
      isAdult
      bannerImage
      format
      status
      averageScore
      popularity
      genres
      nextAiringEpisode {
        airingAt
        episode
      }
      description
      episodes
      duration
      season
      seasonYear
      synonyms
      startDate {
        year
        month
        day
      }
      endDate {
        year
        month
        day
      }
      studios {
        nodes {
          id
          name
          isAnimationStudio
        }
      }
      tags {
        id
        name
        description
        rank
        isAdult
      }
      streamingEpisodes {
        title
        url
        thumbnail
      }
    }
  }
`;
