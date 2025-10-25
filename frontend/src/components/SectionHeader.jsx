// components/SectionHeader.jsx
const SectionHeader = ({ icon, title, baseClass = "section-header" }) => {
  return (
    <div className={baseClass}>
      <img src={icon} alt="icon" className={`${baseClass}__icon`} />
      <h2 className={`${baseClass}__title`}>{title}</h2>
    </div>
  );
};

export default SectionHeader;
