'use server'
const host =
  process?.env.NODE_ENV === 'development'
    ? 'localhost:3000'
    : 'subport.vercel.app'
const protocol = process?.env.NODE_ENV === 'development' ? 'http' : 'https'

type FetchTypes = {
  contractAddress?: string | null
  slug?: string | null
  id?: string | null
  refreshCache?: boolean | null
}


const refreshCache = async () => {
  try {
    // const slug = 'twinny-twin-always'
    //  const contractArray = ['0x658d2ce7c5c05dd1f128bf54ce45bc3a49a37e85']
    //  const contractAddress = '0x658d2ce7c5c05dd1f128bf54ce45bc3a49a37e85'
    const res = await fetch('/api/v1/refreshCache')

    // const res = await fetch('/api/v1/getCollectibles')
    //  const res = await fetch(`/api/v1/getSingleCollectibleBySlug?slug=${slug}`)
    //const res = await readSingleContractURI(contractAddress)
    // const res = await readContractURIs(contractArray)
    const data = await res.json()
    if (data) {
      return data
    }
  } catch (error) {
    return error
  }
}

const fetchSingleCollectible = async ({
  contractAddress,
  slug, 
  refreshCache
}: FetchTypes) => {
  if (contractAddress) {
    try {
      await fetch(`${protocol}://${host}/api/v1/getCollectibles`)
      const res = await fetch(
        `${protocol}://${host}/api/v1/getSingleCollectible?contractAddress=${contractAddress}`
      )

      await new Promise((resolve) => setTimeout(resolve, 1500))
      //  return await res.json()
      return await res.json()
    } catch (error) {
      console.log(error)
      return error
    }
  }
  if (slug) {
    try {
      const noRefresh = `${protocol}://${host}//api/v1/getSingleCollectibleBySlug?slug=${slug}`
      const withRefresh = `${protocol}://${host}//api/v1/getSingleCollectibleBySlug?slug=${slug}&refreshCache=true`

      await fetch(`${protocol}://${host}//api/v1/getCollectibles`)
      const res = await fetch(
      refreshCache ? withRefresh : noRefresh
      )
      const data = res.json()
      await new Promise((resolve) => setTimeout(resolve, 2000))
      //  return await res.json()
      return data
    } catch (error) {
      console.log(error)
      return error
    }
  }
}

const fetchCreators = async () => {
  try {
    // await fetch(`${protocol}://${host}//api/v1/getCollectibles`)
    const res = await fetch(`${protocol}://${host}//api/v1/getAllCreators`)
    const data = res.json()
    await new Promise((resolve) => setTimeout(resolve, 1000))
    //  return await res.json()
    return data
  } catch (error) {
    console.log(error)
    return error
  }
}

const fetchAllCollectibles = async () => {
  try {
    //await fetch(`${protocol}://${host}//api/v1/getCollectibles`);
    const res = await fetch(`${protocol}://${host}/api/v1/getCollectibles`, {
      method: 'GET',
      /// headers: { "Content-Type": "application/json" },
      cache: 'no-store'
    })
    const data = res.json()
    await new Promise((resolve) => setTimeout(resolve, 1000))
    //  return await res.json()
    return data
  } catch (error) {
    console.log(error)
    return error
  }
}

const fetchAllEvents = async () => {
  try {
    //await fetch(`${protocol}://${host}//api/v1/getCollectibles`);
    const res = await fetch(`${protocol}://${host}/api/v1/getEvents`, {
      method: 'GET',
      /// headers: { "Content-Type": "application/json" },
      cache: 'no-store'
    })
    const data = res.json()
    await new Promise((resolve) => setTimeout(resolve, 1000))
    //  return await res.json()
    return data
  } catch (error) {
    console.log(error)
    return error
  }
}

const fetchProfilesForDrops = async (id: string) => {
  // cookies().set('test-cookie', 'subport')

  try {
    let res = await fetch(
      `${protocol}://${host}//api/v1/getProfilesForDrops?userId=${id}`
    )
    const data = await res.json()
    await new Promise((resolve) => setTimeout(resolve, 1000))
    //  return await res.json()
    return data
  } catch (error) {
    console.log(error)
    return error
  }
}

export interface ArtistData {
  spotify_url?: string | null
}

const fetchArtistData = async (id: string) => {
  try {
    let res = await fetch(`${protocol}://${host}//api/v1/getArtistData?userId=${id}`)
    const data = await res.json()
    await new Promise((resolve) => setTimeout(resolve, 500))
    return data
  } catch (error) {
    console.log(error)
    return error
  }
}



const fetchProfileForEvent = async (id: string) => {
  try {
    let res = await fetch(
      `${protocol}://${host}//api/v1/getProfileForEvent?userId=${id}`
    )
    const data = await res.json()
    await new Promise((resolve) => setTimeout(resolve, 1000))
    //  return await res.json()
    return data
  } catch (error) {
    console.log(error)
    return error
  }
}

export {
  fetchCreators,
  fetchSingleCollectible,
  refreshCache,
  fetchProfilesForDrops,
  fetchProfileForEvent,
  fetchAllCollectibles,
  fetchAllEvents, 
  fetchArtistData
}
