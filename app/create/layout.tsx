import React from 'react'
import CreateBackButton from 'ui/Buttons/CreateBackButton'
function layout({ children }: { children: React.ReactNode }) {

    return (
        <div className='relative overflow-y-hidden w-full'>
            <CreateBackButton />

            {children}</div>
    )
}

export default layout