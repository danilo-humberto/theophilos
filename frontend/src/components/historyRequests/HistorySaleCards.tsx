interface HistorySaleCardsProps {
  icon: React.ReactNode;
  description: string;
  values: string;
}

const HistorySaleCards = ({
  icon,
  description,
  values,
}: HistorySaleCardsProps) => {
  return (
    <div className="border border-sidebar-border rounded-sm p-3 flex gap-2 h-24 items-center">
      {icon}
      <div>
        <p className="text-[10px] text-muted-foreground">{description}</p>
        <span className="font-semibold">{values}</span>
      </div>
    </div>
  );
};

export default HistorySaleCards;
