'use client'
import { useState, useEffect } from 'react'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import { supabase } from 'lib/supabaseClient'
import { useSession } from 'next-auth/react'
export default function Account() {
  const {data:session} = useSession()
  const user = session?.id
  console.log(session)
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState('')
  const [ email, setEmail ] = useState(session?.user?.email!)
  const [wallet, setWallet] = useState('')
  const [avatar_url, setAvatarUrl] = useState('')

  useEffect(() => {
    getProfile()
  }, [session])

  async function getProfile() {
    if (session) 
    try {
      setLoading(true)
      let { data, error, status } = await supabase
        .from('users')
        .select(` wallet_address, image`)
        .eq('id', user)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setWallet(data.wallet_address)
        setAvatarUrl(data.image)
      
      }
    } catch (error) {
      alert('Error loading user data!')
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  async function updateProfile({ username, wallet, avatar_url }: any) {
    try {
      setLoading(true)
      const updates = {
        user_id: session?.user.id,
        wallet_address: wallet,
        handle: username,
        image: avatar_url,
        updated_at: new Date().toISOString(),
      }

      let { error } = await supabase.from('profiles').upsert(updates)
      if (error) throw error
      alert('Profile updated!')
    } catch (error) {
      alert('Error updating the data!')
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="form-widget">
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email" 
          type="text" 
          value={email} 
          onChange={(e: any) => setEmail(e.target.value)}
          disabled />
      </div>
      <div>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e: any) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="wallet">Wallet</label>
        <input
          id="wallet"
          type="text"
          value={wallet}
          onChange={(e: any) => setWallet(e?.target.value)}
        />
      </div>

      <div>
        <button
          className="button primary block"
          onClick={() => updateProfile({ username, wallet, avatar_url })}
          disabled={loading}
        >
          {loading ? 'Loading ...' : 'Update'}
        </button>
      </div>

      <div>
        <button className="button block" onClick={() => supabase.auth.signOut()}>
          Sign Out
        </button>
      </div>
    </div>
  )
}