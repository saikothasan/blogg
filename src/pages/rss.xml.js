import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { sortPostsByDate } from '../utils/date';

export async function GET(context) {
  const posts = await getCollection('blog');
  const sortedPosts = sortPostsByDate(posts);

  return rss({
    title: 'Your Blog',
    description: 'A blog about web development, technology, and more',
    site: context.site,
    items: sortedPosts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: `/blog/${post.slug}/`,
    })),
  });
}