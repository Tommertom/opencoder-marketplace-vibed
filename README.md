# OpenCode Plugin Marketplace

A community-driven marketplace for discovering and sharing OpenCode plugins.

## 🌟 Features

- **Browse Plugins**: Explore plugins by category
- **Detailed Information**: View installation instructions, usage examples, and documentation
- **Community-Driven**: Anyone can contribute via Pull Requests
- **Validated Submissions**: Automatic JSON schema validation ensures quality
- **Fast & Static**: Built with SolidJS and hosted on Firebase

## 🚀 Live Site

Visit the marketplace at: `https://your-firebase-project.web.app`

## 🤝 Contributing a Plugin

Want to add your plugin to the marketplace? It's easy!

### Quick Start

1. **Fork this repository**

2. **Create a plugin JSON file** in the `plugins/` directory:
   - Filename: `your-plugin-name.plugin.json`
   - Must match the `name` field in the JSON

3. **Fill out the required information** (see schema below)

4. **Submit a Pull Request**
   - Our CI will automatically validate your submission
   - Once approved, your plugin appears on the marketplace

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed instructions.

### Plugin JSON Example

```json
{
  "name": "example-plugin",
  "displayName": "Example Plugin",
  "description": "A demonstration plugin for the marketplace.",
  "categories": ["Development", "Utilities"],
  "authors": [
    {
      "name": "John Doe",
      "url": "https://github.com/johndoe"
    }
  ],
  "license": "MIT",
  "links": {
    "repository": "https://github.com/example/example-plugin",
    "homepage": "https://example.com",
    "documentation": "https://docs.example.com"
  },
  "opencode": {
    "minimumVersion": "1.0.0"
  },
  "installation": {
    "summary": "Install via npm and configure in settings.",
    "markdown": "## Installation\n\n```bash\nnpm install example-plugin\n```"
  },
  "maintained": true,
  "lastUpdated": "2026-01-10"
}
```

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
- Productivity
- UI/UX
- Testing
- Debugging
- Documentation
- Integration
- Utilities
- AI/ML
- Other

## 📝 License

MIT License - see [LICENSE](LICENSE) for details

## 🌟 Acknowledgments

Built with:
- [SolidJS](https://www.solidjs.com/) - Reactive UI framework
- [Vite](https://vitejs.dev/) - Build tool
- [Firebase Hosting](https://firebase.google.com/docs/hosting) - Static hosting
- [solid-markdown](https://github.com/andi23rosca/solid-markdown) - Markdown rendering
- [Ajv](https://ajv.js.org/) - JSON Schema validation
