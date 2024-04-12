export const useAlbum = () =>
  useState<{ artist?: string; album?: string; date?: string; cover?: string }>(
    'album',
    () => ({})
  )

export const useSearch = () => useState<boolean>('search', () => false)
