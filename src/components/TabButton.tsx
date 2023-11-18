type TabButtonProps = {
  id: string;
  target: string;
  label: string;
  isActive: boolean;
  onClick?: () => void;
};

function TabButton({ id, target, label, isActive, onClick }: TabButtonProps) {
  return (
    <li className="nav-item" role="presentation">
      <button
        className={`nav-link ${isActive ? "active" : ""}`}
        id={`${id}-tab`}
        data-bs-toggle="tab"
        data-bs-target={`#${target}`}
        type="button"
        role="tab"
        aria-controls={target}
        aria-selected={isActive}
        onClick={onClick}
      >
        {label}
      </button>
    </li>
  );
}

export default TabButton;
