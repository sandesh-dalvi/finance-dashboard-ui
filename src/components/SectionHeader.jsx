const PageHeading = ({ title, subtitle }) => {
  return (
    <div className="mb-5">
      <h2 className="text-lg font-bold">{title}</h2>
      {subtitle && <p className="text-sm mt-0.5 text-secondary">{subtitle}</p>}
    </div>
  );
};

export default PageHeading;
