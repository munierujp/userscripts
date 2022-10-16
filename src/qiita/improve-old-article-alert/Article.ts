export interface Article {
  '@type': 'Article'
  'dateModified': string
}

export const isArticle = (value: any): value is Article => {
  return typeof value === 'object' && value !== null && value['@type'] === 'Article' && typeof value.dateModified === 'string'
}
