const StatsCard = ({ label, value, icon: Icon, color = "success", sub }) => {
  return (
    <div className=" rounded-2xl p-4 border flex flex-col gap-2 md:gap-3 transition-all duration-300 border-border bg-surface shadow-md has-hover:bg-surface-hover">
      <div className=" flex items-center justify-between">
        <span className=" text-sm text-secondary">{label}</span>
        <span
          className={`w-9 h-9 rounded-xl bg-${color}/20 text-${color} flex items-center justify-center`}
        >
          <Icon className=" w-6 h-6" />
        </span>
      </div>
      <div className="">
        <p className={` text-2xl font-bold tracking-tight text-${color}`}>
          {value}
        </p>
        {sub && <p className=" text-xs mt-1 text-secondary">{sub}</p>}
      </div>
    </div>
  );
};

export default StatsCard;
