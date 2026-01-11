import { Show, createSignal, onMount } from 'solid-js';
import { SolidMarkdown } from 'solid-markdown';
import type { Plugin } from '../data/types';
import { fetchGitHubStars, extractRepoInfo } from '../utils/github';

interface PluginDetailProps {
  plugin: Plugin;
  onClose: () => void;
}

export function PluginDetail(props: PluginDetailProps) {
  const [stars, setStars] = createSignal<number | null>(null);

  onMount(async () => {
    const starCount = await fetchGitHubStars(props.plugin.links.repository);
    setStars(starCount);
  });

  const formatStars = (count: number): string => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count.toString();
  };

  const getStarHistoryUrl = (): string | null => {
    const repoInfo = extractRepoInfo(props.plugin.links.repository);
    if (!repoInfo) return null;
    return `https://api.star-history.com/svg?repos=${repoInfo.owner}/${repoInfo.repo}&type=Date`;
  };

  const handleBackdropClick = (e: MouseEvent) => {
    if (e.target === e.currentTarget) {
      props.onClose();
    }
  };

  return (
    <div class="detail-overlay" onClick={handleBackdropClick}>
      <div class="detail-modal">
        <div class="detail-header">
          <div>
            <h2>{props.plugin.displayName}</h2>
            <p class="detail-subtitle">{props.plugin.description}</p>
          </div>
          <button class="close-btn" onClick={props.onClose}>✕</button>
        </div>

        <div class="detail-content">
          <div class="detail-sidebar">
            <div class="detail-meta-section">
              <h3>Information</h3>
              
              <div class="detail-meta-item">
                <span class="detail-meta-label">Status</span>
                <span class={`detail-badge ${props.plugin.maintained ? 'maintained' : 'unmaintained'}`}>
                  {props.plugin.maintained ? '✓ Maintained' : '⚠ Unmaintained'}
                </span>
              </div>

              <Show when={stars() !== null}>
                <div class="detail-meta-item">
                  <span class="detail-meta-label">GitHub Stars</span>
                  <span class="detail-meta-value detail-stars">
                    ⭐ {formatStars(stars()!)}
                  </span>
                </div>
              </Show>

              <div class="detail-meta-item">
                <span class="detail-meta-label">License</span>
                <span class="detail-meta-value">{props.plugin.license}</span>
              </div>

              <div class="detail-meta-item">
                <span class="detail-meta-label">Last Updated</span>
                <span class="detail-meta-value">{props.plugin.lastUpdated}</span>
              </div>

              <div class="detail-meta-item">
                <span class="detail-meta-label">OpenCode Version</span>
                <span class="detail-meta-value">
                  {props.plugin.opencode.minimumVersion}
                  {props.plugin.opencode.maximumVersion && ` - ${props.plugin.opencode.maximumVersion}`}
                </span>
              </div>
            </div>

            <Show when={getStarHistoryUrl()}>
              <div class="detail-meta-section">
                <h3>Star History</h3>
                <div class="star-history-chart">
                  <img 
                    src={getStarHistoryUrl()!} 
                    alt="Star History Chart" 
                    class="star-history-img"
                  />
                </div>
              </div>
            </Show>

            <div class="detail-meta-section">
              <h3>Authors</h3>
              {props.plugin.authors.map((author) => (
                <a href={author.url} target="_blank" rel="noopener noreferrer" class="detail-author-link">
                  {author.name}
                </a>
              ))}
            </div>

            <div class="detail-meta-section">
              <h3>Categories</h3>
              <div class="detail-categories">
                {props.plugin.categories.map((cat) => (
                  <span class="detail-tag">{cat}</span>
                ))}
              </div>
            </div>

            <div class="detail-links">
              <a href={props.plugin.links.repository} target="_blank" rel="noopener noreferrer" class="detail-btn detail-btn-primary">
                Repository
              </a>
              <Show when={props.plugin.links.homepage}>
                <a href={props.plugin.links.homepage} target="_blank" rel="noopener noreferrer" class="detail-btn">
                  Homepage
                </a>
              </Show>
              <Show when={props.plugin.links.documentation}>
                <a href={props.plugin.links.documentation} target="_blank" rel="noopener noreferrer" class="detail-btn">
                  Documentation
                </a>
              </Show>
            </div>
          </div>

          <div class="detail-main">
            <section class="detail-section">
              <h3>Installation</h3>
              <p class="detail-installation-summary">{props.plugin.installation.summary}</p>
              <div class="detail-markdown">
                <SolidMarkdown children={props.plugin.installation.markdown} />
              </div>
            </section>

            <Show when={props.plugin.usage?.markdown}>
              <section class="detail-section">
                <h3>Usage</h3>
                <div class="detail-markdown">
                  <SolidMarkdown children={props.plugin.usage!.markdown} />
                </div>
              </section>
            </Show>
          </div>
        </div>
      </div>
    </div>
  );
}
