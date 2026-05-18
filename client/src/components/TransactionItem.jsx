import React, { useState } from 'react'
import '../styles/transactions.css'

export default function TransactionItem({ transaction }) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <>
      <tr className="transaction-row">
        <td className="transaction-toggle-cell">
          <button
            type="button"
            className="transaction-toggle"
            onClick={() => setIsExpanded(!isExpanded)}
            aria-expanded={isExpanded}
            aria-label={isExpanded ? `Masquer le détail de ${transaction.description}` : `Afficher le détail de ${transaction.description}`}
          >
            <span className={`transaction-chevron ${isExpanded ? 'expanded' : ''}`} aria-hidden="true" />
          </button>
        </td>
        <td className="transaction-date">{transaction.date}</td>
        <td className="transaction-description">{transaction.description}</td>
        <td className={`transaction-amount ${transaction.amount < 0 ? 'amount-debit' : 'amount-credit'}`}>
          {transaction.amount < 0 ? '-' : '+'} ${Math.abs(transaction.amount).toFixed(2)}
        </td>
        <td className="transaction-balance">${transaction.balance.toFixed(2)}</td>
      </tr>
      {isExpanded && (
        <tr className="transaction-detail-row">
          <td colSpan="5">
            <div className="transaction-detail">
              <div className="detail-row">
                <span className="detail-label">Type de transaction :</span>
                <span className="detail-value">{transaction.type}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Catégorie :</span>
                <span className="detail-value">{transaction.category}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Notes :</span>
                <span className="detail-value">{transaction.notes}</span>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  )
}
