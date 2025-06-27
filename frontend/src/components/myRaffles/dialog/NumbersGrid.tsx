interface NumbersGridProps {
  total: number;
}

const NumbersGrid = ({ total }: NumbersGridProps) => {
  const numbers = Array.from({ length: total }, (_, index) => index + 1);
  const rows = [];

  for (let i = 0; i < numbers.length; i += 5) {
    rows.push(numbers.slice(i, i + 5));
  }
  return (
    <div className="space-y-2 w-full mt-4">
      {rows.map((row, index) => (
        <div key={index} className="flex gap-2">
          {row.map((number) => (
            <div
              key={number}
              className="w-8 h-8 flex items-center justify-center text-sm rounded-[2px] font-medium bg-sky-200 hover:bg-sky-300 transition-all duration-300 flex-1"
            >
              {number}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default NumbersGrid;
