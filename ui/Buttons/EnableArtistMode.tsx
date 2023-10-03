import { supabase } from 'lib/constants';
import React, { useState } from 'react';

function EnableArtistMode({ profile }: { profile: any }) {
    // Step 2: Create a state variable for the checkbox status
    const isChecked = profile.is_artist;
    const checkedMessage = 'Disable Artist Mode'
    const uncheckedMessage = 'Enable Artist Mode'

    const handleEnable = async () => {
        if (!isChecked) {
            const { data, error } = await supabase
                .from('artist_settings')
                .insert([{ user_id: profile.id }])
                .select()
               // .single()
            if (data && data?.length === 1) {
                const { data: profileUpdate, error: profileUpdateError } = await supabase
                    .from('profiles')
                    .update({ is_artist: true })
                    .eq('id', profile?.id)
                    .select()
                    .single()
                    
                if (profileUpdateError) {
                    console.log(profileUpdateError)
                }

            } else if (error) {
                return error
            }
        }
    }
    console.log(profile)
    // Step 3: Use isChecked to control the checked attribute
    return (
        <label className="relative inline-flex items-center cursor-pointer">
            <input
                type="checkbox"
                value=""
                className="sr-only peer"
                checked={isChecked} // Use isChecked here
                onChange={handleEnable} // Toggle the isChecked state when the checkbox changes
            />
            <div className="w-11 h-6 bg-zinc-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-zinc-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-zinc-600 peer-checked:bg-blue-600"></div>
            <span className="ml-3 text-sm font-medium text-zinc-900 dark:text-zinc-300">
                {isChecked ? checkedMessage : uncheckedMessage} {/* Display text based on isChecked */}
            </span>
        </label>
    );
}

export default EnableArtistMode;
