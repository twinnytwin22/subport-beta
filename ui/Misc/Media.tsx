'use client'
import { MediaRenderer } from "@thirdweb-dev/react";
import { ThirdwebProvider } from "@thirdweb-dev/react";

export const Media = (data: any) => {
  const audioUrl = data?.audio;
  const imageUrl = data?.image;

  const testImage = "ipfs://QmUHnUjuKjgoe5N1H5hVnGWEcFXiTNfNoAyvRNZBEp5J3r";
  const testAudio = "ipfs://QmSDprFUJu1q9e14xGdUnibGkFY3fTF5LAzW9j1DxkY6sH";

  const mediaProps = {
    src: audioUrl,
    poster: imageUrl,
    alt: 'Nft Media',
    requireinteraction: 'false'
  };

  return (
    <div className="mx-auto block content-center" suppressHydrationWarning>
      <ThirdwebProvider activeChain="ethereum">
        <MediaRenderer {...mediaProps} />
      </ThirdwebProvider>
    </div>
  );
};
