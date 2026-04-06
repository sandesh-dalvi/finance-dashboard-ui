const PageHeader = ({ title, desc }) => {
  return (
    <div className="">
      <h1 className=" text-2xl font-bold">{title}</h1>
      <p className=" text-sm mt-1 text-secondary">{desc}</p>
    </div>
  );
};

export default PageHeader;
