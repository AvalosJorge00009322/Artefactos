function DashboardElement({ title, value }) {
  return (
    <div className="bg-[#2F4F4F] p-4 rounded-lg text-center shadow-md">
      <h2 className="font-semibold text-lg mb-2">{title}</h2>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}

export default DashboardElement;
