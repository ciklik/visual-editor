// Shared helpers for the release scripts, no dependencies
import { execFileSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

export const root = fileURLToPath(new URL('..', import.meta.url))
export const packagePath = `${root}visual-editor/package.json`
export const changelogPath = `${root}docs/docs/changelog.mdx`

export const versionPattern = /^\d+\.\d+\.\d+$/

export function readVersion() {
  return JSON.parse(readFileSync(packagePath, 'utf8')).version
}

// Body of the "## X.Y.Z - date" section, empty string when it is missing
export function changelogSection(changelog, version) {
  const lines = changelog.split('\n')
  const escaped = version.replaceAll('.', '\\.')
  const heading = new RegExp(`^## ${escaped}(\\s|$)`)
  const start = lines.findIndex((line) => heading.test(line))
  if (start === -1) {
    return ''
  }
  const next = lines.findIndex((line, i) => i > start && /^## /.test(line))
  return lines
    .slice(start + 1, next === -1 ? undefined : next)
    .join('\n')
    .trim()
}

function git(...args) {
  return execFileSync('git', args, { cwd: root, encoding: 'utf8' }).trim()
}

// Latest X.Y.Z tag reachable from ref, null when there is none
export function previousTag(ref = 'HEAD') {
  try {
    return git(
      'describe',
      '--tags',
      '--abbrev=0',
      '--match',
      '[0-9]*.[0-9]*.[0-9]*',
      ref
    )
  } catch {
    return null
  }
}

// Commit subjects in from..to (or up to "to" when from is null), oldest first
export function commitSubjects(from, to = 'HEAD') {
  const range = from ? `${from}..${to}` : to
  const out = git('log', '--reverse', '--no-merges', '--format=%s', range)
  return out ? out.split('\n') : []
}
