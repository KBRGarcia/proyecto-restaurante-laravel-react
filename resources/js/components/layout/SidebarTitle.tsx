import { Link } from "@refinedev/core";

type SidebarTitleProps = {
    collapsed: boolean;
};

export function SidebarTitle({ collapsed }: SidebarTitleProps) {
    return (
        <Link to="/dashboard">
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "12px",
                    textDecoration: "none",
                }}
            >
                <img src="/logo.png" alt="Logo" style={{ maxHeight: "40px" }} />
                {!collapsed && (
                    <span
                        style={{
                            fontSize: "18px",
                            fontWeight: "bold",
                            color: "#ef4444",
                            whiteSpace: "nowrap",
                        }}
                    >
                        Sabor & Tradición
                    </span>
                )}
            </div>
        </Link>
    );
}
