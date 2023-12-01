import React, { ReactElement } from 'react';

interface SplitScreenProps {
  left: React.ComponentType;
  right: React.ComponentType;
}

function SplitScreen({ left: Left, right: Right }: SplitScreenProps): ReactElement {
  return (
    <div className='flex gap-2'>
      <div className='hidden md:block'>
        <Left />
      </div>
      <div className='w-[100%] mt-2'>
        <Right />
      </div>
    </div>
  );
}

export default SplitScreen;
