// Bumps visual-editor/package.json and adds the version section to
// docs/docs/changelog.mdx, prefilled with the commits since the last tag.
// Usage: pnpm release:prepare <patch|minor|major|X.Y.Z>
import { readFileSync, writeFileSync } from 'node:fs'
import {
  changelogPath,
  changelogSection,
  commitSubjects,
  packagePath,
  previousTag,
  readVersion,
  versionPattern,
} from './changelog.mjs'

const bump = process.argv[2]
const current = readVersion()

function nextVersion(version, kind) {
  const [major, minor, patch] = version.split('.').map(Number)
  switch (kind) {
    case 'major':
      return `${major + 1}.0.0`
    case 'minor':
      return `${major}.${minor + 1}.0`
    case 'patch':
      return `${major}.${minor}.${patch + 1}`
    default:
      return versionPattern.test(kind ?? '') ? kind : null
  }
}

if (!versionPattern.test(current)) {
  console.error(`The current version ${current} is not X.Y.Z`)
  process.exit(1)
}
const version = nextVersion(current, bump)
if (!version) {
  console.error('Usage: pnpm release:prepare <patch|minor|major|X.Y.Z>')
  process.exit(1)
}

const changelog = readFileSync(changelogPath, 'utf8')
if (
  changelogSection(changelog, version) ||
  changelog.includes(`\n## ${version} `)
) {
  console.error(`The changelog already has a ${version} section`)
  process.exit(1)
}

// Text replacement keeps the formatting of package.json
const pkg = readFileSync(packagePath, 'utf8')
writeFileSync(
  packagePath,
  pkg.replace(/("version":\s*")[^"]+(")/, `$1${version}$2`)
)

// "fix: something" becomes "- Fix: something"
const entries = commitSubjects(previousTag())
  .filter((subject) => !/^chore\(deps/.test(subject))
  .map((subject) => {
    const match = subject.match(/^(\w+)(?:\([^)]*\))?!?:\s*(.+)$/)
    if (!match) {
      return `- ${subject}`
    }
    const type = match[1].charAt(0).toUpperCase() + match[1].slice(1)
    return `- ${type}: ${match[2]}`
  })
const date = new Date().toISOString().slice(0, 10).replaceAll('-', '/')
const section = `## ${version} - ${date}\n\n${entries.join('\n') || '- '}\n\n`
const heading = '# Changelog\n\n'
if (!changelog.includes(heading)) {
  console.error(`No "# Changelog" heading in ${changelogPath}`)
  process.exit(1)
}
writeFileSync(changelogPath, changelog.replace(heading, heading + section))

console.log(`${current} -> ${version}`)
console.log(
  `Edit the changelog entries, commit "bump: ${version}" and open a pull request to main:`
)
console.log('the release is tagged and published when it is merged.')
