// Prints the release notes of a version: its changelog section, or the
// commit subjects since the previous tag when the changelog has none.
// Usage: node scripts/release-notes.mjs <version> [ref]
import { readFileSync } from 'node:fs'
import {
  changelogPath,
  changelogSection,
  commitSubjects,
  previousTag,
  versionPattern,
} from './changelog.mjs'

const [version, ref = 'HEAD'] = process.argv.slice(2)
if (!versionPattern.test(version ?? '')) {
  console.error('Usage: node scripts/release-notes.mjs <X.Y.Z> [ref]')
  process.exit(1)
}

const section = changelogSection(readFileSync(changelogPath, 'utf8'), version)
if (section) {
  console.log(section)
} else {
  // The tag of the version itself may already exist: start from the one before
  const from = previousTag(`${ref}^`)
  const subjects = commitSubjects(from, ref)
  console.log(
    subjects.map((subject) => `- ${subject}`).join('\n') ||
      '- No changes listed'
  )
}
