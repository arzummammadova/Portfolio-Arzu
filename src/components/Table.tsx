import React from 'react';

interface TableProps {
  headers: string[];
  data: string[][]; 
}

const Table: React.FC<TableProps> = ({ headers, data }) => {
  return (
    <table className='mx-auto px-9 w-4/5 table-fixed mt-[80px] '>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <td
                key={cellIndex}
                className={`
                  px-9 py-8
                  ${cellIndex === 0 ? 'order font-bold text-xl lg:text-4xl w-1/12' : ''}
                  ${cellIndex === 1 ? 'font-bold text-md lg:text-2xl w-5/12' : ''}
                  ${cellIndex >= 2 ? 'text-xl text-gray-500' : ''}
                `}
              >
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;