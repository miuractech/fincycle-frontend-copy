import React from 'react'
import { useParams } from 'react-router-dom'


export function EditInvoice() {
    const {invoiceId} = useParams()
  return (
    <div>EditInvoice</div>
  )
}