import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import TransactionItem from '../components/TransactionItem'
import '../styles/transactions.css'

// Données mockées des transactions
const mockTransactions = {
  'x8349': [
    {
      id: 1,
      description: 'Virement reçu - Employer Inc',
      date: '2026-05-10',
      amount: 2500,
      type: 'Virement entrant',
      category: 'Salaire',
      balance: 5000.00,
      notes: 'Salaire mensuel'
    },
    {
      id: 2,
      description: 'Paiement - Carrefour',
      date: '2026-05-09',
      amount: -125.50,
      type: 'Débit carte',
      category: 'Courses',
      balance: 2500.00,
      notes: 'Courses alimentaires'
    },
    {
      id: 3,
      description: 'Paiement - EDF Énergie',
      date: '2026-05-08',
      amount: -85.00,
      type: 'Prélèvement',
      category: 'Utilities',
      balance: 2625.50,
      notes: 'Facture électricité'
    },
    {
      id: 4,
      description: 'Retrait au distributeur',
      date: '2026-05-07',
      amount: -200.00,
      type: 'Retrait',
      category: 'Cash',
      balance: 2710.50,
      notes: 'Retrait d\'espèces'
    },
    {
      id: 5,
      description: 'Virement - Netflix',
      date: '2026-05-06',
      amount: -15.99,
      type: 'Virement sortant',
      category: 'Divertissement',
      balance: 2910.50,
      notes: 'Abonnement mensuel'
    }
  ],
  'x6712': [
    {
      id: 1,
      description: 'Intérêts versés',
      date: '2026-05-10',
      amount: 8.50,
      type: 'Intérêt',
      category: 'Intérêts',
      balance: 10928.42,
      notes: 'Intérêts mensuels'
    },
    {
      id: 2,
      description: 'Virement - Épargne',
      date: '2026-05-05',
      amount: 500.00,
      type: 'Virement entrant',
      category: 'Transfert',
      balance: 10919.92,
      notes: 'Transfert du compte courant'
    }
  ]
}

const accountNames = {
  'x8349': 'Argent Bank Checking (x8349)',
  'x6712': 'Argent Bank Savings (x6712)'
}

export default function Transactions() {
  const { accountId } = useParams()
  const navigate = useNavigate()
  const transactions = mockTransactions[accountId] || []
  const accountName = accountNames[accountId] || 'Compte inconnu'

  // Calcul du solde actuel (dernière transaction)
  const currentBalance = transactions.length > 0 ? transactions[0].balance : 0

  return (
    <main className="main">
      <div className="transactions-header">
        <button className="back-button" onClick={() => navigate('/user')}>
          ← Retour
        </button>
        <h1>{accountName}</h1>
        <p className="current-balance">Solde actuel: <strong>${currentBalance.toFixed(2)}</strong></p>
      </div>

      <div className="transactions-container">
        <div className="transactions-list">
          {transactions.length > 0 ? (
            <>
              <h2>Détail des transactions</h2>
              {transactions.map((transaction) => (
                <TransactionItem 
                  key={transaction.id} 
                  transaction={transaction}
                />
              ))}
            </>
          ) : (
            <p className="no-transactions">Aucune transaction disponible pour ce compte.</p>
          )}
        </div>
      </div>
    </main>
  )
}
