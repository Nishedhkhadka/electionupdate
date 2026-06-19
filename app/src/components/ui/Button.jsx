import { COLORS } from "../../app/config/constants";

/**
 * Button Component - Reusable button with variants
 */
export function Button({
  children,
  variant = "primary",
  size = "md",
  onClick,
  style = {},
  className = "",
  ...props
}) {
  const baseStyle = {
    border: "none",
    borderRadius: "8px",
    fontWeight: "700",
    cursor: "pointer",
    transition: "all 0.2s ease",
  };

  const variants = {
    primary: {
      backgroundColor: COLORS.primary,
      color: "#fff",
    },
    secondary: {
      backgroundColor: "#f5f5f5",
      color: COLORS.text,
      border: `1px solid ${COLORS.border}`,
    },
    success: {
      backgroundColor: COLORS.success,
      color: "#fff",
    },
  };

  const sizes = {
    sm: { padding: "6px 12px", fontSize: "12px" },
    md: { padding: "10px 18px", fontSize: "14px" },
    lg: { padding: "14px 24px", fontSize: "16px" },
  };

  return (
    <button
      className={className}
      onClick={onClick}
      style={{
        ...baseStyle,
        ...variants[variant],
        ...sizes[size],
        ...style,
      }}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
