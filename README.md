# OpenCode Plugin Marketplace

> **Note:** This is an independent, community-driven project and is not affiliated with, endorsed by, or officially connected to OpenCode (opencode.ai) or Anomaly Co.

A community-driven marketplace for discovering and sharing OpenCode plugins.

## 🌟 Features

- **Browse Plugins**: Explore plugins by category
- **Detailed Information**: View installation instructions, usage examples, and documentation
- **Community-Driven**: Anyone can contribute via Pull Requests
- **Validated Submissions**: Automatic JSON schema validation ensures quality
- **Fast & Static**: Built with SolidJS and hosted on Firebase

## 🚀 Live Site

Visit the marketplace at: [https://opencode-plugin-market.web.app](https://opencode-plugin-market.web.app)

## 🤝 Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed instructions.

## 📋 JSON Schema

All plugin submissions must validate against `schema/plugin.schema.json`.

### Required Fields

- `name` - Unique plugin identifier (lowercase, alphanumeric, hyphens)
- `displayName` - Human-readable name
- `description` - 10-500 characters
- `categories` - Array of categories
- `authors` - Array with name and URL
- `license` - SPDX license identifier
- `links.repository` - Git repository URL
- `opencode.minimumVersion` - Minimum OpenCode version (semver)
- `installation.summary` - Brief summary (10-200 chars)
- `installation.markdown` - Detailed instructions (Markdown)
- `maintained` - Boolean for maintenance status
- `lastUpdated` - Date in YYYY-MM-DD format

### Optional Fields

- `links.homepage` - Plugin website
- `links.documentation` - Docs URL
- `opencode.maximumVersion` - Max compatible version
- `usage.markdown` - Usage guide (Markdown)

### Available Categories

- Development
- Documentation
- Integration
- Productivity
- Providers
- Utilities

## 📝 License

MIT License - see [LICENSE](LICENSE) for details

## 🌟 Acknowledgments

Built with:
- [SolidJS](https://www.solidjs.com/) - Reactive UI framework
- [Vite](https://vitejs.dev/) - Build tool
- [Firebase Hosting](https://firebase.google.com/docs/hosting) - Static hosting
- [solid-markdown](https://github.com/andi23rosca/solid-markdown) - Markdown rendering
- [Ajv](https://ajv.js.org/) - JSON Schema validation
