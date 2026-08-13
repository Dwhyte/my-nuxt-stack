#!/usr/bin/env node

import { execSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const projectRoot = resolve(__dirname, '..')
const certsDir = resolve(projectRoot, 'certs')
const keyPath = resolve(certsDir, 'key.pem')
const certPath = resolve(certsDir, 'cert.pem')

const defaultPort = process.env.NUXT_PORT?.trim() || '3000'

function checkCommand(command) {
  try {
    execSync(`which ${command}`, { stdio: 'ignore' })
    return true
  } catch {
    return false
  }
}

function runCommand(command, description) {
  try {
    console.log(`\n📦 ${description}...`)
    execSync(command, { stdio: 'inherit', cwd: projectRoot })
    return true
  } catch (error) {
    console.error(`\n❌ Failed to ${description.toLowerCase()}`)
    console.error(error.message)
    return false
  }
}

console.log('🔒 Setting up local HTTPS certificates for nuxt-frontend\n')

if (!checkCommand('mkcert')) {
  console.log('⚠️  mkcert is not installed.')
  console.log('\n📝 To install mkcert:')
  console.log('   macOS: brew install mkcert')
  console.log('   Linux: sudo apt install libnss3-tools && brew install mkcert')
  console.log('   Windows: choco install mkcert')
  process.exit(1)
}

console.log('✅ mkcert is installed')

console.log('\n🔐 Installing local Certificate Authority...')
try {
  execSync('mkcert -install', { stdio: 'pipe' })
  console.log('✅ Certificate Authority installed')
} catch (error) {
  const output = error.stdout?.toString() || ''
  if (output.includes('already installed') || output.includes('trust store')) {
    console.log('✅ Certificate Authority already installed')
  } else {
    console.log('⚠️  Could not verify CA installation (may already be installed)')
  }
}

if (!existsSync(certsDir)) {
  console.log('\n📁 Creating certs directory...')
  execSync(`mkdir -p "${certsDir}"`, { stdio: 'inherit' })
}

if (existsSync(keyPath) && existsSync(certPath)) {
  console.log('\n✅ Certificates already exist')
  console.log(`   Key: ${keyPath}`)
  console.log(`   Cert: ${certPath}`)
  console.log('\n💡 To regenerate certificates, delete them and run this script again.')
} else {
  console.log('\n📜 Generating new certificates...')
  const success = runCommand(
    'mkcert -key-file certs/key.pem -cert-file certs/cert.pem localhost 127.0.0.1 ::1',
    'Generate certificates'
  )

  if (success) {
    console.log('\n✅ Certificates generated successfully!')
    console.log(`   Key: ${keyPath}`)
    console.log(`   Cert: ${certPath}`)
  } else {
    process.exit(1)
  }
}

console.log('\n🎉 HTTPS setup complete!')
console.log('\n📝 Next steps:')
console.log('   1. In apps/nuxt-frontend/.env set:')
console.log(`      NUXT_PUBLIC_SITE_URL=https://localhost:${defaultPort}`)
console.log('      NUXT_PUBLIC_API_URL=https://localhost:4000')
console.log('   2. Run: pnpm setup:https (root) to also cert api-node, or pnpm setup:https:api')
console.log('   3. Run: pnpm dev')
console.log(`   4. Visit: https://localhost:${defaultPort}\n`)
