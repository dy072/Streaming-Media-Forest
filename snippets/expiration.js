document.addEventListener('DOMContentLoaded', () => {
  const addHeader = () => {
    document.querySelectorAll('th.node-cell.name.center').forEach((cell) => {
      const newTh = document.createElement('th')
      newTh.className = 'node-cell downtime center'
      newTh.textContent = '过期时间'
      cell.parentNode.insertBefore(newTh, cell.nextSibling)
    })
  }

  const affLinks = {
    1: { content: '免费' },
    2: { expiration: '2024-09-30', content: ' ' },
    12: { expiration: '2024-08-27T22:14:55', content: ' ' },
    13: { content: '免费' },
    14: { expiration: '2025-05-28T23:44:09', content: ' ' },
    15: { content: '免费' },
    16: { content: '免费' },
    17: { expiration: '2024-09-01', content: ' ' },
    18: { expiration: '2024-09-01', content: ' ' },
    19: { expiration: '2024-09-01', content: ' ' },
    20: { expiration: '2024-08-11', content: ' ' },
    21: { expiration: '2024-08-11', content: ' ' },
    22: { expiration: '2025-06-13', content: ' ' },
    24: { expiration: '2025-06-17', content: ' ' },
    26: { expiration: '2024-09-01', content: ' ' },
    27: { expiration: '2025-07-24', content: ' ' }
  }

  const createCountdown = (expirationDate) => {
    const countdown = document.createElement('span')
    const update = () => {
      const diff = new Date(expirationDate).getTime() - Date.now()
      countdown.textContent = diff <= 0 ? 'Expired' : `${Math.floor(diff / (1000 * 60 * 60 * 24))} 天`
    }
    update()
    setInterval(update, 1000)
    return countdown
  }

  const addDowntimeCells = () => {
    document.querySelectorAll('tr').forEach((row) => {
      const osCell = row.querySelector('td.node-cell.name.center')
      if (!osCell) return
      const nodeId = row.id.substring(1)
      const affLink = affLinks[nodeId] || { content: '永久' }
      const downtimeCell = document.createElement('td')
      downtimeCell.className = 'node-cell downtime center'
      downtimeCell.textContent = affLink.content
      if (affLink.expiration) downtimeCell.appendChild(createCountdown(affLink.expiration))
      osCell.parentNode.insertBefore(downtimeCell, osCell.nextSibling)
    })
  }

  addHeader()
  addDowntimeCells()
})
