import React from "react";
import MainLayout from "../../layouts/MainLayout";

const Loading = () => {
	const containerStyle = {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		minHeight: "60vh",
		textAlign: "center",
	};

	const spinnerStyle = {
		width: "48px",
		height: "48px",
		border: "4px solid #e5e7eb",
		borderTop: "4px solid #2563eb",
		borderRadius: "50%",
		animation: "spin 1s linear infinite",
	};

	const textStyle = {
		marginTop: "12px",
		fontSize: "14px",
		color: "#555",
		animation: "pulse 1.5s infinite",
	};

	return (
		<>
			<MainLayout />

			<main style={containerStyle}>
				<div style={spinnerStyle}></div>
				<p style={textStyle}>लोड हुँदैछ...</p>

				{/* keyframes injected inline */}
				<style>
					{`
            @keyframes spin {
              to { transform: rotate(360deg); }
            }

            @keyframes pulse {
              0%, 100% { opacity: 1; }
              50% { opacity: 0.4; }
            }
          `}
				</style>
			</main>
		</>
	);
};

export default Loading;
