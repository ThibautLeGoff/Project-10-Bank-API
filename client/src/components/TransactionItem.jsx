import React, { useState } from 'react'
import '../styles/transactions.css'

export default function TransactionItem({ transaction }) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="transaction-item">
      <div 
        className="transaction-header"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="transaction-summary">
          <span className="transaction-description">{transaction.description}</span>
          <span className="transaction-date">{transaction.date}</span>
        </div>
        <div className="transaction-amount">
          <span className={transaction.amount < 0 ? 'amount-debit' : 'amount-credit'}>
            {transaction.amount < 0 ? '-' : '+'} ${Math.abs(transaction.amount).toFixed(2)}
          </span>
          <span className={`transaction-arrow ${isExpanded ? 'expanded' : ''}`}>
            ▼
          </span>
        </div>
      </div>

      {isExpanded && (
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
            <span className="detail-label">Montant :</span>
            <span className="detail-value">${Math.abs(transaction.amount).toFixed(2)}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Bilan :</span>
            <span className="detail-value">${transaction.balance.toFixed(2)}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Notes :</span>
            <span className="detail-value">{transaction.notes}</span>
          </div>
        </div>
      )}
    </div>
  )
}
