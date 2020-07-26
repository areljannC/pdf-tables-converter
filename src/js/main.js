// http://www.garysieling.com/blog/building-a-full-text-index-in-javascript/

// load PDF
// const loadPDF = pdfjsLib.getDocument('../data/pse_20200723.pdf')
const loadPDF = pdfjsLib.getDocument('../data/tsx_20200723.pdf')

let stocks = []
let symbol,
  name,
  volume,
  value,
  trades,
  close,
  last_sale,
  high,
  low = ''
let columnIndex = 0

const func = async () => {
  await loadPDF.promise.then(async (pdf) => {
    const { numPages } = pdf._pdfInfo
    for (let i = 1; i <= numPages; i++) {
      let stock = {}
      await pdf.getPage(i).then(async (page) => {
        await page.getTextContent().then(async (content) => {
          await content.items.forEach((item) => {
            const str = item.str.trim()
            if (
              str !== 'Alpha Trade Details by Symbol' &&
              str !== 'TSX Listed Symbols' &&
              str !== 'Symbol' &&
              str !== 'Stock Name' &&
              str !== 'Volume' &&
              str !== 'Value' &&
              str !== 'Trades' &&
              str !== 'Close' &&
              str !== 'Last Sale' &&
              str !== 'High' &&
              str !== 'Low'
            ) {
              switch (columnIndex) {
                case 0:
                  stock = { ...stock, symbol: str }
                  columnIndex++
                  break
                case 1:
                  stock = { ...stock, name: str }
                  columnIndex++
                  break
                case 2:
                  stock = { ...stock, volume: str }
                  columnIndex++
                  break
                case 3:
                  stock = { ...stock, value: str }
                  columnIndex++
                  break
                case 4:
                  stock = { ...stock, trades: str }
                  columnIndex++
                  break
                case 5:
                  stock = { ...stock, high: str }
                  columnIndex++
                  break
                case 6:
                  stock = { ...stock, low: str }
                  columnIndex++
                  break
                case 7:
                  stock = { ...stock, last_sale: str }
                  columnIndex++
                  break
                case 8:
                  stock = { ...stock, close: str }
                  columnIndex++
                  break
                default:
                  break
              }
              if (columnIndex === 9) {
                stocks = [...stocks, stock]
                columnIndex = 0
              }
            }
          })
        })
      })
    }
  })
  console.log(stocks)
}

func()

