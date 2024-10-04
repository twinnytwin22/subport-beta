'use client'
import { useStore } from '@/lib/providers/swiper/swiperStore';
import { useEffect } from 'react';
import ProfileCard from 'ui/Cards/ProfileCard';
import dummyData from '../lib/providers/swiper/dummyData.json';
//import Counter from '@/ui/Counter';

export default function Home() {
  const { profiles, fetchProfiles, likedProfiles, dislikedProfiles } = useStore();

  const data: any = dummyData;

  const decisions = [
    likedProfiles, 
    dislikedProfiles
  ]

  const results = new Set(decisions)
  const count = results.size
  useEffect(() => {
    if (data) {
      fetchProfiles(data); // Store profiles in Zustand
    }
  }, [data, fetchProfiles]);

  if (!profiles.length) return <p>Loading...</p>;

  return (
    <div className="flex flex-col justify-start items-center h-screen relative mt-20">
      {profiles.map((profile: any, index: number) => (
        <ProfileCard key={profile.id} profile={profile} index={index} />
      ))}
      {decisions.map((result:any, index: any) => {
        return (
        <div key={index}>
      {/* <Counter count={count} testid={index} label='label' /> */}
      </div>)})}
    </div>
  );
}

