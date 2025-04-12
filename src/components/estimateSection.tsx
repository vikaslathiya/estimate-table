import { KeyboardEvent, useState } from "react";
import { EstimateSectionProps } from "../types/estimateSection";
import { formatCurrency } from "../lib/utils";
import eyeIcon from "../assets/eye.svg";
import "../styles/estimateSection.scss";

const EstimateSection = ({ section, onItemUpdate }: EstimateSectionProps) => {
    const [isCollapsed, setIsCollapsed] = useState(true);

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "ArrowUp" || e.key === "ArrowDown") {
            e.preventDefault();
        }
    };

    const calculateSectionTotal = () => {
        let total = 0;
        section.items.forEach((item) => {
            if (item.quantity && item.unit_cost) {
                const qty = Number.parseFloat(item.quantity) || 0;
                const unitCost = Number.parseFloat(item.unit_cost) / 100 || 0;
                total += qty * unitCost;
            }
        });
        return total;
    };

    const sectionTotal = calculateSectionTotal();

    return (
        <div className="section-container">
            <div
                className="section-header"
                onClick={() => setIsCollapsed(!isCollapsed)}
            >
                <h2 className="section-title">
                    <span className="collapse-icon">{isCollapsed ? "+" : "-"}</span>
                    {section.section_name}
                </h2>
                <div className="section-total">
                    <span>{formatCurrency(sectionTotal)}</span>
                </div>
            </div>

            {!isCollapsed && (
                <div className="table-container">
                    <table className="items-table">
                        <thead>
                            <tr>
                                <th>Type</th>
                                <th>Item Name</th>
                                <th>QTY</th>
                                <th>Unit Cost</th>
                                <th>Unit</th>
                                <th>Total</th>
                                <th>Tax</th>
                                <th>Cost Code</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {section.items.length === 0 && (
                                <tr>
                                    <td className="no-data" colSpan={9}>No records found</td>
                                </tr>
                            )}
                            {section.items.length > 0 &&
                                section.items.map((item) => {
                                    const quantity = Number.parseFloat(item.quantity) || 0;
                                    const unitCost = Number.parseFloat(item.unit_cost) / 100 || 0;
                                    const itemTotal = quantity * unitCost;

                                    return (
                                        <tr key={item.item_id}>
                                            <td>{item.item_type_display_name || "—"}</td>
                                            <td>{item.subject}</td>
                                            <td className="qty-cell">
                                                <input
                                                    type="number"
                                                    className="qty-input"
                                                    value={item.quantity || ""}
                                                    onChange={(e) =>
                                                        onItemUpdate(
                                                            section.section_id,
                                                            item.item_id,
                                                            "quantity",
                                                            e.target.value
                                                        )
                                                    }
                                                    onKeyDown={handleKeyDown}
                                                />
                                            </td>
                                            <td className="unit-cost-cell">
                                                <input
                                                    type="number"
                                                    className="unit-cost-input"
                                                    value={unitCost.toFixed(2)}
                                                    onChange={(e) => {
                                                        const value = (
                                                            Number.parseFloat(e.target.value) * 100
                                                        ).toString();
                                                        onItemUpdate(
                                                            section.section_id,
                                                            item.item_id,
                                                            "unit_cost",
                                                            value
                                                        );
                                                    }}
                                                    onKeyDown={handleKeyDown}
                                                />
                                            </td>
                                            <td className="unit-cell">{item.unit}</td>
                                            <td className="total-cell">
                                                {formatCurrency(itemTotal)}
                                            </td>
                                            <td className="tax-cell">
                                                <input type="checkbox" disabled />
                                            </td>
                                            <td>{item.cost_code_name ?? ""}</td>
                                            <td className="actions-cell">
                                                <button className="view-button">
                                                    <img
                                                        src={eyeIcon}
                                                        alt="eye icon"
                                                        width={24}
                                                        height={24}
                                                    />
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default EstimateSection;
