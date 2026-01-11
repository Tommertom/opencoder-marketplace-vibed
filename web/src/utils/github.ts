const CACHE_KEY = 'github_stars_cache';
const CACHE_DURATION = 1000 * 60 * 60 * 24 * 5; // 5 days

interface CacheEntry {
  stars: number;
  timestamp: number;
}

interface Cache {
  [repo: string]: CacheEntry;
}

function getCache(): Cache {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    return cached ? JSON.parse(cached) : {};
  } catch {
    return {};
  }
}

function setCache(cache: Cache): void {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
  } catch {
    // Ignore storage errors
  }
}

export function extractRepoInfo(repoUrl: string): { owner: string; repo: string } | null {
  try {
    const match = repoUrl.match(/github\.com\/([^\/]+)\/([^\/\?#]+)/);
    if (match) {
      return {
        owner: match[1],
        repo: match[2].replace(/\.git$/, '')
      };
    }
  } catch {
    // Ignore parse errors
  }
  return null;
}

export async function fetchGitHubStars(repoUrl: string): Promise<number | null> {
  const repoInfo = extractRepoInfo(repoUrl);
  if (!repoInfo) return null;

  const cacheKey = `${repoInfo.owner}/${repoInfo.repo}`;
  const cache = getCache();
  
  // Check cache
  const cached = cache[cacheKey];
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.stars;
  }

  try {
    const response = await fetch(
      `https://api.github.com/repos/${repoInfo.owner}/${repoInfo.repo}`,
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
        },
      }
    );

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    const stars = data.stargazers_count || 0;

    // Update cache
    cache[cacheKey] = {
      stars,
      timestamp: Date.now(),
    };
    setCache(cache);

    return stars;
  } catch {
    return null;
  }
}
