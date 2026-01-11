import { createSignal, For, Show } from "solid-js";
import { plugins, categories } from "./data/plugins";
import { PluginTile } from "./components/PluginTile";
import { PluginDetail } from "./components/PluginDetail";
import type { Plugin } from "./data/types";
import "./App.css";

function App() {
  const [selectedCategory, setSelectedCategory] = createSignal<string>("all");
  const [selectedPlugin, setSelectedPlugin] = createSignal<Plugin | null>(null);

  const filteredPlugins = () => {
    const category = selectedCategory();
    if (category === "all") return plugins;
    return plugins.filter((p) => p.categories.includes(category));
  };

  const openPlugin = (plugin: Plugin) => {
    setSelectedPlugin(plugin);
  };

  const closePlugin = () => {
    setSelectedPlugin(null);
  };

  return (
    <div class="app">
      <header class="header">
        <a
          href="https://github.com/Tommertom/opencoder-plugin-marketplace"
          target="_blank"
          rel="noopener noreferrer"
          class="github-link"
          aria-label="View on GitHub"
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 16 16"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
          </svg>
        </a>
        <h1>OpenCode Plugin Marketplace</h1>
        <p>Discover and contribute plugins for OpenCode</p>
        <p class="disclaimer">
          <small>
            This is an independent, community-driven project and is not
            affiliated with, endorsed by, or officially connected to OpenCode
            (opencode.ai) or Anomaly Co.
          </small>
        </p>
      </header>

      <div class="container">
        <aside class="sidebar">
          <h2>Categories</h2>
          <ul class="category-list">
            <li>
              <button
                class={selectedCategory() === "all" ? "active" : ""}
                onClick={() => setSelectedCategory("all")}
              >
                All Plugins ({plugins.length})
              </button>
            </li>
            <For each={categories}>
              {(category) => {
                const count = plugins.filter((p) =>
                  p.categories.includes(category)
                ).length;
                return (
                  <li>
                    <button
                      class={selectedCategory() === category ? "active" : ""}
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category} ({count})
                    </button>
                  </li>
                );
              }}
            </For>
          </ul>
        </aside>

        <main class="main">
          <Show
            when={filteredPlugins().length > 0}
            fallback={
              <p class="no-results">No plugins found in this category.</p>
            }
          >
            <div class="plugin-grid">
              <For each={filteredPlugins()}>
                {(plugin) => (
                  <PluginTile
                    plugin={plugin}
                    onClick={() => openPlugin(plugin)}
                  />
                )}
              </For>
            </div>
          </Show>
        </main>
      </div>

      <Show when={selectedPlugin()}>
        <PluginDetail plugin={selectedPlugin()!} onClose={closePlugin} />
      </Show>

      <div class="footer-spacer"></div>
      <footer class="footer">
        <p>
          Want to contribute? Visit our{" "}
          <a
            href="https://github.com/Tommertom/opencoder-plugin-marketplace"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub repository
          </a>{" "}
          and submit a PR with your plugin JSON file.
        </p>
        <p class="footer-disclaimer">
          This is an independent, community-driven project and is not affiliated
          with, endorsed by, or officially connected to OpenCode (opencode.ai)
          or Anomaly Co.
        </p>
      </footer>
    </div>
  );
}

export default App;
