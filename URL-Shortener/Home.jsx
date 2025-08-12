import React, { useState } from 'react'
import ShortenForm from '../components/ShortenForm'
import axios from 'axios'

export default function Home(){
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleShorten = async (originalUrl) => {
    try{
      setLoading(true)
      const res = await axios.post('http://localhost:5000/api/url/shorten', { originalUrl })
      setResult(res.data)
    }catch(err){
      console.error(err)
      alert('Error creating short url')
    }finally{ setLoading(false) }
  }

  return (
    <div className="bg-white p-8 rounded-2xl shadow-md">
      <h1 className="text-2xl font-semibold mb-2">Shorten your link</h1>
      <p className="text-sm text-slate-500 mb-6">Paste a long URL and get a short, shareable link.</p>

      <ShortenForm onShorten={handleShorten} loading={loading} />

      {result && (
        <div className="mt-6 p-4 bg-slate-50 border rounded">
          <p className="text-sm text-slate-600">Short URL:</p>
          <a href={result.shortUrl} target="_blank" rel="noreferrer" className="text-blue-600 break-all">{result.shortUrl}</a>
          <div className="mt-2 text-sm text-slate-500">Original: <span className="break-all">{result.originalUrl}</span></div>
        </div>
      )}

      <footer className="mt-6 text-xs text-slate-400">Built with ❤️ — Simple MERN URL Shortener</footer>
    </div>
  )
}