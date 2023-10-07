'use client'
import React from 'react'
import CollectCard from 'ui/Cards/Collect/CollectCard'

function CardView({ drops }: any) {
  return (
    <div className="w-full mx-auto mt-8 mb-20 content-center my-8">
      <div className="flex md:grid md:grid-cols-3 justify-center justify-items-center content-center gap-2.5 w-full mx-auto">


        {drops?.map(({ drop, metaData }: any) => (
          <div key={drop?.id}>
            <CollectCard drop={drop} metaData={metaData} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default CardView