'use client'
import React from 'react'
import ViewButtons from 'ui/Buttons/ViewButtons';

function template({ children }: { children: React.ReactNode }) {


    return (
        <div className=''>
            <ViewButtons path='#' />
            {children
            }</div>
    )
}

export default template