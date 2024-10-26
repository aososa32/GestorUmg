import { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  var port = process.env.PORT || 3000
  return [
    {
      url: `${process.env.host}:${port}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    }
  ]
}