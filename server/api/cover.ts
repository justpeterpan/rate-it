import * as v from 'valibot'

export const resultSchema = v.object({
  artistId: v.number(),
  artistName: v.string(),
  artworkUrl100: v.string(),
  collectionId: v.number(),
  collectionName: v.string(),
  collectionType: v.string(),
  releaseDate: v.string(),
  trackCount: v.number(),
})

export type Results = v.Input<typeof resultSchema>[]

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  console.log(query.search)
  const searchResults = await $fetch<string>(
    `${useRuntimeConfig().cover}?term=${
      query.search
    }&country=us&media=music&entity=album&limit=10}`
  )

  const parsedResults = JSON.parse(searchResults).results

  return v.parse(v.array(resultSchema), parsedResults)
})
