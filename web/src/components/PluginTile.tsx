import { Show } from 'solid-js';
import type { Plugin } from '../data/types';

interface PluginTileProps {
  plugin: Plugin;
  stars: number | null;
  onClick: () => void;
}

export function PluginTile(props: PluginTileProps) {
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
          <Show when={props.stars !== null}>
            <span class="tile-stars">
              ⭐ {formatStars(props.stars!)}
            </span>
          </Show>
        </div>
        <span class="tile-updated">{props.plugin.lastUpdated}</span>
      </div>
    </article>
  );
}
