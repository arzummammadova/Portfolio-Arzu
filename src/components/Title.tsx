import React from 'react';

type TitleProps = {
  text?: string;
};

const Title: React.FC<TitleProps> = ({ text }) => {
  return (
    <div className="mt-5 overflow-hidden whitespace-nowrap border-t border-b py-4 border-gray-200">
      <div className="flex animate-scroll gap-10">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="text-7xl uppercase list-disc">
            {text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Title;
<style>
    
</style>