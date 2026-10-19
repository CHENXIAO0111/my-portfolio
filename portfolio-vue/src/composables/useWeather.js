import { ref, computed } from 'vue'

const CITY_COORDS = {
  长沙: { lat: 28.1767, lng: 112.9430 },
  北京: { lat: 39.9042, lng: 116.4074 },
  拉萨: { lat: 29.6520, lng: 91.1721 }
}

// 默认走同源 /api（开发用 Vite 代理、nginx 用反向代理）；
// GitHub Pages 无服务端，构建时通过 .env.ghpages 指向接口绝对地址
const API_BASE = import.meta.env.VITE_WEATHER_BASE || '/api'

export function useWeather(initialCity = '长沙') {
  const city = ref(initialCity)
  const data = ref(null)
  const loading = ref(false)
  const error = ref('')

  async function load(name = city.value) {
    const coord = CITY_COORDS[name] || CITY_COORDS['长沙']
    loading.value = true
    error.value = ''
    try {
      const url = `${API_BASE}/v1/forecast?latitude=${coord.lat}&longitude=${coord.lng}` +
                  '&current=temperature_2m,wind_speed_10m,weather_code&timezone=Asia%2FShanghai'
      const res = await fetch(url)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      data.value = await res.json()
      city.value = name
    } catch (e) {
      error.value = `天气获取失败：${e.message}`
      data.value = null
    } finally {
      loading.value = false
    }
  }

  const temp = computed(() => data.value?.current?.temperature_2m ?? null)
  const windspeed = computed(() => data.value?.current?.wind_speed_10m ?? null)
  const code = computed(() => data.value?.current?.weather_code ?? null)
  const weatherText = computed(() => {
    const c = code.value
    if (c === null) return ''
    if (c === 0) return '晴'
    if (c <= 3) return '多云'
    if (c <= 48) return '雾'
    if (c <= 67) return '雨'
    if (c <= 77) return '雪'
    return '阵雨'
  })
  const advice = computed(() => {
    const t = weatherText.value
    if (!t) return ''
    if (t.includes('雨')) return '今天有雨，记得带伞再去外业。'
    if (t.includes('雪')) return '有降雪，注意路面湿滑。'
    if (t === '晴') return '天气不错，适合外出采点。'
    return '出门前留意天气变化。'
  })

  return { city, data, loading, error, temp, windspeed, weatherText, advice, load }
}
