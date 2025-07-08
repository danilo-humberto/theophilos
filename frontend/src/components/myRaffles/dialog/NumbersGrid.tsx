interface NumbersGridProps {
  total: number;
  selected: number[];
  onSelect: (num: number) => void;
}

const NumbersGrid = ({ total, selected, onSelect }: NumbersGridProps) => {
  const numbers = Array.from({ length: total }, (_, index) => index + 1);
  const rows = [];

  for (let i = 0; i < numbers.length; i += 5) {
    rows.push(numbers.slice(i, i + 5));
  }
  return (
    <div className="space-y-2 w-full mt-4">
      {rows.map((row, index) => (
        <div key={index} className="flex gap-2">
          {row.map((number) => {
            const isSelected = selected.includes(number);
            return (
              <button
                key={number}
                onClick={() => onSelect(number)}
                className={`w-8 h-8 flex items-center cursor-pointer justify-center text-sm rounded-[2px] font-medium transition-all duration-300 flex-1
                  ${
                    isSelected
                      ? "bg-destructive text-white"
                      : "bg-sky-200 hover:bg-sky-300"
                  }`}
              >
                {number}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default NumbersGrid;
