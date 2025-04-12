import { formatCurrency } from "../lib/utils"
import { EstimateHeaderProps } from "../types/estimateHeader"
import "../styles/estimateHeader.scss"

const EstimateHeader = ({ grandTotal }: EstimateHeaderProps) => {
  return (
    <div className="estimate-header">
      <h1 className="estimate-title">Estimate</h1>
      <div className="grand-total-container">
        <span className="grand-total-label">Grand Total:</span>
        <span className="grand-total-value">{formatCurrency(grandTotal)}</span>
      </div>
    </div>
  )
}

export default EstimateHeader;