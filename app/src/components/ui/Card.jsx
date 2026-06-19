/**
 * Card Component - Reusable card container
 */
export function Card({ children, style = {}, className = "" }) {
  const defaultStyle = {
    background: "#fff",
    border: "1px solid #e6e6e6",
    borderRadius: "12px",
    padding: "20px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
  };

  return (
    <div className={className} style={{ ...defaultStyle, ...style }}>
      {children}
    </div>
  );
}

export default Card;
