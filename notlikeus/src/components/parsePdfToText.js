// parsePdfToText.js (Optionally place this in the same file or in a helper utils file)

export async function parsePdfToText(file) {
    if (!file) return ''
  
    // Dynamically import pdfjs-dist so we don't need complicated worker setup.
    const pdfjsLib = await import('pdfjs-dist/legacy/build/pdf')
  
    // Convert the PDF file to an ArrayBuffer
    const data = await file.arrayBuffer()
  
    // Load the PDF
    const pdf = await pdfjsLib.getDocument({ data }).promise
  
    let extractedText = ''
    // Loop through all pages
    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum)
      const textContent = await page.getTextContent()
      // Concatenate all items on the page (their "str" property) into one string
      const pageText = textContent.items.map((item) => item.str).join(' ')
      extractedText += pageText + '\n'
    }
  
    return extractedText
  }