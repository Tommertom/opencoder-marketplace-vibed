import { createSignal, onMount, Show } from 'solid-js';
import type { Plugin } from '../data/types';
import { fetchGitHubStars } from '../utils/github';

interface PluginTileProps {
  plugin: Plugin;
  onClick: () => void;
}

export function PluginTile(props: PluginTileProps) {
  const [stars, setStars] = createSignal<number | null>(null);
  const [loading, setLoading] = createSignal(true);

  onMount(async () => {
    const starCount = await fetchGitHubStars(props.plugin.links.repository);
    setStars(starCount);
    setLoading(false);
  });

  const formatStars = (count: number): string => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count.toString();
  };

  return (
    <article class="plugin-tile" onClick={props.onClick}>
      <div class="tile-header">
        <h3>{props.plugin.displayName}</h3>
        <span class={`tile-badge ${props.plugin.maintained ? 'maintained' : 'unmaintained'}`}>
          {props.plugin.maintained ? '✓' : '⚠'}
        </span>
      </div>
      
      <p class="tile-description">{props.plugin.description}</p>
      
      <div class="tile-categories">
        {props.plugin.categories.slice(0, 3).map((cat) => (
          <span class="tile-tag">{cat}</span>
        ))}
        {props.plugin.categories.length > 3 && (
          <span class="tile-tag-more">+{props.plugin.categories.length - 3}</span>
        )}
      </div>
      
      <div class="tile-footer">
        <div class="tile-footer-left">
          <span class="tile-author">{props.plugin.authors[0].name}</span>
          <Show when={!loading() && stars() !== null}>
            <span class="tile-stars">
              ⭐ {formatStars(stars()!)}
            </span>
          </Show>
        </div>
        <span class="tile-updated">{props.plugin.lastUpdated}</span>
      </div>
    </article>
  );
}
