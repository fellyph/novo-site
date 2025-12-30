import './style.css'

interface Post {
  id: number;
  title: { rendered: string };
  excerpt: { rendered: string };
  link: string;
  date: string;
}

async function fetchPosts() {
  const blogContainer = document.getElementById('blog-posts');
  if (!blogContainer) return;

  try {
    const response = await fetch('https://blog.fellyph.com.br/wp-json/wp/v2/posts?per_page=6');
    if (!response.ok) throw new Error('Failed to fetch posts');
    
    const posts: Post[] = await response.json();
    
    blogContainer.innerHTML = '';
    
    posts.forEach(post => {
      const card = document.createElement('article');
      card.className = 'blog-card';
      
      const date = new Date(post.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

      card.innerHTML = `
        <span class="post-date" style="font-size: 0.8rem; color: var(--text-muted);">${date}</span>
        <h3>${post.title.rendered}</h3>
        <div class="post-excerpt">${post.excerpt.rendered}</div>
        <a href="${post.link}" target="_blank" class="read-more">Read More →</a>
      `;
      
      blogContainer.appendChild(card);
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    blogContainer.innerHTML = '<p class="error">Failed to load blog posts. Please try again later.</p>';
  }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  fetchPosts();
});
