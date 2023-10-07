'use client'
import { useQuery } from '@tanstack/react-query'
import { useAuthProvider } from 'app/context/auth'
import { supabase } from 'lib/constants'
import React, { useState, useEffect } from 'react'
import { getProfileSettings } from './actions'
import Toggle from './Toggle'

function Preferences () {
  const { profile } = useAuthProvider()
  const { data: userSettings } = useQuery({
    queryKey: ['userSettings', profile.id],
    queryFn: () => getProfileSettings(profile.id)
  })

  const handleFollowPreference = async (newState: boolean) => {
    const { data: followPref } = await supabase
      .from('user_preferences').update({ super_follow: newState }).eq('user_id', profile.id).select()
    return followPref
  }

  const prefs = [
    {
      text: 'Allow Super Follow',
      initialState: userSettings?.super_follow || true,
      onToggle: handleFollowPreference
    }
  ]

  return (
    <div className='mx-auto w-full max-w-sm content-start items-center h-full my-8 flex-col justify-between mt-8'>
      {prefs.map((props) => (
        <Toggle key={props.text} {...props} />
      ))}
    </div>
  )
}

export default Preferences

