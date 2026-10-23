import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'

const htmlPath = '/home/migu/repos/GitHub/vue-api-restcountries/docs/evidencias_documento.html'
const imgDir = '/home/migu/repos/GitHub/vue-api-restcountries/docs/evidencias'
const targetHtml = '/home/migu/repos/GitHub/vue-api-restcountries/docs/evidencias_bundle.html'
const pdfRoot = '/home/migu/repos/GitHub/vue-api-restcountries/Evidencias_Cumplimiento_Vue_RestCountries.pdf'
const pdfDocs = '/home/migu/repos/GitHub/vue-api-restcountries/docs/Evidencias_Cumplimiento_Vue_RestCountries.pdf'

let html = fs.readFileSync(htmlPath, 'utf8')

// Reemplazar cada imagen por su Data URI en Base64
html = html.replace(/<img\s+src="([^"]+)"/g, (match, filename) => {
  const fullPath = path.join(imgDir, filename)
  if (fs.existsSync(fullPath)) {
    const ext = path.extname(filename).toLowerCase().replace('.', '')
    const mime = ext === 'png' ? 'image/png' : ext === 'jpg' ? 'image/jpeg' : 'image/webp'
    const b64 = fs.readFileSync(fullPath).toString('base64')
    return `<img src="data:${mime};base64,${b64}"`
  }
  console.warn(`Warning: Image not found: ${fullPath}`)
  return match
})

fs.writeFileSync(targetHtml, html)
console.log(`Bundle HTML written to ${targetHtml} (Size: ${(fs.statSync(targetHtml).size / 1024 / 1024).toFixed(2)} MB)`)

// Generar PDF usando Google Chrome headless
const cmd = `google-chrome-stable --headless --disable-gpu --no-sandbox --print-to-pdf-no-header --print-to-pdf="${pdfRoot}" "file://${targetHtml}"`
console.log('Running Chrome to generate PDF...')
execSync(cmd)

fs.copyFileSync(pdfRoot, pdfDocs)
console.log(`PDF successfully created at:\n- ${pdfRoot}\n- ${pdfDocs}`)
console.log(`File size: ${(fs.statSync(pdfRoot).size / 1024).toFixed(2)} KB`)
