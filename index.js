const mineflayer = require('mineflayer')
const express = require('express')
const app = express()

// Membuat web server sederhana agar Render tidak mematikan service
app.get('/', (req, res) => {
  res.send('Bot AFK Aternos sedang berjalan!')
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Web server aktif di port ${PORT}`)
})

// Konfigurasi Bot
const options = {
  host: 'Gabriel-ikhq.aternos.me',
  port: 25500,
  username: 'Dhumyk_AFK_Cloud',
  version: '1.21.2',
  auth: 'offline' // Karena Aternos cracked sudah ON
}

function createBot() {
  const bot = mineflayer.createBot(options)

  bot.on('spawn', () => {
    console.log('✅ BERHASIL: Bot sudah masuk ke server Aternos!')
  })

  bot.on('chat', (username, message) => {
    if (username === bot.username) return
    console.log(`${username}: ${message}`)
  })

  bot.on('error', (err) => {
    console.log('❌ Error terjadi:', err.message)
  })

  bot.on('end', () => {
    console.log('⚠️ Bot terputus, mencoba masuk kembali dalam 10 detik...')
    setTimeout(createBot, 10000)
  })
}

// Jalankan Bot
createBot()
