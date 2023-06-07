'use client'
import { MemoryDatastore } from 'datastore-core'
import { MemoryBlockstore } from 'blockstore-core'
import { createHelia } from 'helia'
import { useState, useEffect } from 'react'

const IpfsComponent = () => {
    const [id, setId] = useState<any>(null)
    const [helia, setHelia] = useState<any>(null)
    const [isOnline, setIsOnline] = useState(false)

    useEffect(() => {
        const init = async () => {
            if (helia) return

            const heliaNode = await createHelia({
                blockstore: new MemoryBlockstore(),
                datastore: new MemoryDatastore()
            })

            const nodeId = heliaNode.libp2p.peerId.toString()
            const nodeIsOnline = heliaNode.libp2p.isStarted()

            setHelia(heliaNode)
            setId(nodeId)
            setIsOnline(nodeIsOnline)
        }

        init()
    }, [])

    if (!helia || !id) {
        return <h4>Connecting to IPFS...</h4>
    }

    return (
        <div>
            <h4 data-test="id">ID: {id.toString()}</h4>
            <h4 data-test="status">Status: {isOnline ? 'Online' : 'Offline'}</h4>
        </div>
    )
}

export default IpfsComponent