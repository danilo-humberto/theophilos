interface HeaderFormProps {
  title: string;
  description: string;
}

const HeaderForm = ({ title, description }: HeaderFormProps) => {
  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <img src="./logo.jpg" alt="logo do theophilos" className="w-18 h-18" />
      <div className="flex flex-col items-center">
        <h2 className="font-bold text-xl">{title}</h2>
        <p className="text-muted-foreground text-[12px] text-center">
          {description}
        </p>
      </div>
    </div>
  );
};

export default HeaderForm;
