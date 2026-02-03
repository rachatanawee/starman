/**
 * Sales Module Mock Data
 * Mock data for quotations, sales orders, and invoices
 */

export interface Quotation {
  id: string
  quotationNumber: string
  customer: string
  date: string
  validUntil: string
  amount: number
  status: string
  items: number
}

export interface SalesOrder {
  id: string
  orderNumber: string
  customer: string
  date: string
  deliveryDate: string
  amount: number
  status: string
  items: number
}

export interface SalesInvoice {
  id: string
  invoiceNumber: string
  salesOrderId?: string
  quotationId?: string
  customer: string
  invoiceDate: string
  dueDate: string
  grandTotal: number
  totalPaid: number
  balanceDue: number
  paymentStatus: string
}

export const mockQuotations: Quotation[] = [
  { id: '1', quotationNumber: 'QT-2026-001', customer: 'Acme Corp', date: '2026/01/15', validUntil: '2026/02/15', amount: 15000, status: 'Sent', items: 5 },
  { id: '2', quotationNumber: 'QT-2026-002', customer: 'Tech Solutions', date: '2026/01/16', validUntil: '2026/02/16', amount: 28500, status: 'Draft', items: 8 },
  { id: '3', quotationNumber: 'QT-2026-003', customer: 'Global Industries', date: '2026/01/17', validUntil: '2026/02/17', amount: 42000, status: 'Accepted', items: 12 },
  { id: '4', quotationNumber: 'QT-2026-004', customer: 'Smart Systems', date: '2026/01/18', validUntil: '2026/02/18', amount: 19800, status: 'Sent', items: 6 },
  { id: '5', quotationNumber: 'QT-2026-005', customer: 'Digital Dynamics', date: '2026/01/19', validUntil: '2026/02/19', amount: 33600, status: 'Rejected', items: 10 },
  { id: '6', quotationNumber: 'QT-2026-006', customer: 'Innovate Ltd', date: '2026/01/20', validUntil: '2026/02/20', amount: 25000, status: 'Draft', items: 7 },
  { id: '7', quotationNumber: 'QT-2026-007', customer: 'Future Tech', date: '2026/01/21', validUntil: '2026/02/21', amount: 18500, status: 'Sent', items: 4 },
  { id: '8', quotationNumber: 'QT-2026-008', customer: 'Mega Corp', date: '2026/01/22', validUntil: '2026/02/22', amount: 52000, status: 'Accepted', items: 15 },
  { id: '9', quotationNumber: 'QT-2026-009', customer: 'Prime Solutions', date: '2026/01/23', validUntil: '2026/02/23', amount: 31200, status: 'Expired', items: 9 },
  { id: '10', quotationNumber: 'QT-2026-010', customer: 'Alpha Industries', date: '2026/01/24', validUntil: '2026/02/24', amount: 22500, status: 'Sent', items: 6 },
  { id: '11', quotationNumber: 'QT-2026-011', customer: 'Beta Systems', date: '2026/01/25', validUntil: '2026/02/25', amount: 38000, status: 'Accepted', items: 11 },
  { id: '12', quotationNumber: 'QT-2026-012', customer: 'Gamma Tech', date: '2026/01/26', validUntil: '2026/02/26', amount: 16800, status: 'Draft', items: 5 },
  { id: '13', quotationNumber: 'QT-2026-013', customer: 'Delta Corp', date: '2026/01/27', validUntil: '2026/02/27', amount: 45000, status: 'Sent', items: 13 },
  { id: '14', quotationNumber: 'QT-2026-014', customer: 'Epsilon Ltd', date: '2026/01/28', validUntil: '2026/02/28', amount: 27500, status: 'Rejected', items: 8 },
  { id: '15', quotationNumber: 'QT-2026-015', customer: 'Zeta Industries', date: '2026/01/29', validUntil: '2026/03/01', amount: 35000, status: 'Accepted', items: 10 },
  { id: '16', quotationNumber: 'QT-2026-016', customer: 'Omega Solutions', date: '2026/01/30', validUntil: '2026/03/02', amount: 29800, status: 'Draft', items: 7 },
  { id: '17', quotationNumber: 'QT-2026-017', customer: 'Nexus Corp', date: '2026/01/31', validUntil: '2026/03/03', amount: 41000, status: 'Sent', items: 12 },
  { id: '18', quotationNumber: 'QT-2026-018', customer: 'Vertex Systems', date: '2026/02/01', validUntil: '2026/03/04', amount: 23500, status: 'Expired', items: 6 },
  { id: '19', quotationNumber: 'QT-2026-019', customer: 'Quantum Tech', date: '2026/02/02', validUntil: '2026/03/05', amount: 36000, status: 'Accepted', items: 10 },
  { id: '20', quotationNumber: 'QT-2026-020', customer: 'Stellar Industries', date: '2026/02/03', validUntil: '2026/03/06', amount: 48500, status: 'Sent', items: 14 },
]

export const mockSalesOrders: SalesOrder[] = [
  { id: '1', orderNumber: 'SO-2026-001', customer: 'Acme Corp', date: '2026/01/15', deliveryDate: '2026/01/20', amount: 8750000, status: 'Confirmed', items: 5 },
  { id: '2', orderNumber: 'SO-2026-002', customer: 'Tech Solutions', date: '2026/01/16', deliveryDate: '2026/01/22', amount: 12450000, status: 'Processing', items: 8 },
  { id: '3', orderNumber: 'SO-2026-003', customer: 'Global Industries', date: '2026/01/17', deliveryDate: '2026/01/25', amount: 15200000, status: 'Pending', items: 12 },
  { id: '4', orderNumber: 'SO-2026-004', customer: 'Smart Systems', date: '2026/01/18', deliveryDate: '2026/01/23', amount: 6800000, status: 'Completed', items: 6 },
  { id: '5', orderNumber: 'SO-2026-005', customer: 'Digital Dynamics', date: '2026/01/19', deliveryDate: '2026/01/26', amount: 18900000, status: 'Shipped', items: 10 },
  { id: '6', orderNumber: 'SO-2026-006', customer: 'Innovate Ltd', date: '2026/01/20', deliveryDate: '2026/01/27', amount: 11200000, status: 'Processing', items: 7 },
  { id: '7', orderNumber: 'SO-2026-007', customer: 'Future Tech', date: '2026/01/21', deliveryDate: '2026/01/28', amount: 9350000, status: 'Draft', items: 4 },
  { id: '8', orderNumber: 'SO-2026-008', customer: 'Mega Corp', date: '2026/01/22', deliveryDate: '2026/01/30', amount: 22800000, status: 'Completed', items: 15 },
  { id: '9', orderNumber: 'SO-2026-009', customer: 'Prime Solutions', date: '2026/01/23', deliveryDate: '2026/01/31', amount: 14600000, status: 'Shipped', items: 9 },
  { id: '10', orderNumber: 'SO-2026-010', customer: 'Alpha Industries', date: '2026/01/24', deliveryDate: '2026/02/01', amount: 10500000, status: 'Confirmed', items: 6 },
  { id: '11', orderNumber: 'SO-2026-011', customer: 'Beta Systems', date: '2026/01/25', deliveryDate: '2026/02/02', amount: 17300000, status: 'Completed', items: 11 },
  { id: '12', orderNumber: 'SO-2026-012', customer: 'Gamma Tech', date: '2026/01/26', deliveryDate: '2026/02/03', amount: 7900000, status: 'Pending', items: 5 },
  { id: '13', orderNumber: 'SO-2026-013', customer: 'Delta Corp', date: '2026/01/27', deliveryDate: '2026/02/05', amount: 19500000, status: 'Shipped', items: 13 },
  { id: '14', orderNumber: 'SO-2026-014', customer: 'Epsilon Ltd', date: '2026/01/28', deliveryDate: '2026/02/06', amount: 13200000, status: 'Processing', items: 8 },
  { id: '15', orderNumber: 'SO-2026-015', customer: 'Zeta Industries', date: '2026/01/29', deliveryDate: '2026/02/07', amount: 16800000, status: 'Completed', items: 10 },
  { id: '16', orderNumber: 'SO-2026-016', customer: 'Omega Solutions', date: '2026/01/30', deliveryDate: '2026/02/08', amount: 14100000, status: 'Draft', items: 7 },
  { id: '17', orderNumber: 'SO-2026-017', customer: 'Nexus Corp', date: '2026/01/31', deliveryDate: '2026/02/09', amount: 18400000, status: 'Confirmed', items: 12 },
  { id: '18', orderNumber: 'SO-2026-018', customer: 'Vertex Systems', date: '2026/02/01', deliveryDate: '2026/02/10', amount: 11700000, status: 'Shipped', items: 6 },
  { id: '19', orderNumber: 'SO-2026-019', customer: 'Quantum Tech', date: '2026/02/02', deliveryDate: '2026/02/12', amount: 16200000, status: 'Completed', items: 10 },
  { id: '20', orderNumber: 'SO-2026-020', customer: 'Stellar Industries', date: '2026/02/03', deliveryDate: '2026/02/13', amount: 21500000, status: 'Processing', items: 14 },
  { id: '21', orderNumber: 'SO-2026-021', customer: 'Horizon Ltd', date: '2026/02/04', deliveryDate: '2026/02/14', amount: 9800000, status: 'Pending', items: 5 },
  { id: '22', orderNumber: 'SO-2026-022', customer: 'Apex Solutions', date: '2026/02/05', deliveryDate: '2026/02/15', amount: 15600000, status: 'Shipped', items: 9 },
  { id: '23', orderNumber: 'SO-2026-023', customer: 'Pinnacle Corp', date: '2026/02/06', deliveryDate: '2026/02/16', amount: 12900000, status: 'Completed', items: 7 },
  { id: '24', orderNumber: 'SO-2026-024', customer: 'Summit Tech', date: '2026/02/07', deliveryDate: '2026/02/17', amount: 17800000, status: 'Confirmed', items: 11 },
  { id: '25', orderNumber: 'SO-2026-025', customer: 'Zenith Industries', date: '2026/02/08', deliveryDate: '2026/02/18', amount: 20300000, status: 'Shipped', items: 13 },
]

export const mockSalesInvoices: SalesInvoice[] = [
  { id: '1', invoiceNumber: 'INV-2026-001', salesOrderId: 'SO-2026-001', quotationId: 'QT-2026-001', customer: 'Acme Corp', invoiceDate: '2026/01/15', dueDate: '2026/02/14', grandTotal: 16050, totalPaid: 16050, balanceDue: 0, paymentStatus: 'Paid' },
  { id: '2', invoiceNumber: 'INV-2026-002', salesOrderId: 'SO-2026-002', quotationId: 'QT-2026-002', customer: 'Tech Solutions', invoiceDate: '2026/01/16', dueDate: '2026/02/15', grandTotal: 30495, totalPaid: 15000, balanceDue: 15495, paymentStatus: 'Partially Paid' },
  { id: '3', invoiceNumber: 'INV-2026-003', salesOrderId: 'SO-2026-003', customer: 'Global Industries', invoiceDate: '2026/01/17', dueDate: '2026/02/16', grandTotal: 44940, totalPaid: 0, balanceDue: 44940, paymentStatus: 'Unpaid' },
  { id: '4', invoiceNumber: 'INV-2026-004', salesOrderId: 'SO-2026-004', customer: 'Smart Systems', invoiceDate: '2026/01/18', dueDate: '2026/02/17', grandTotal: 21186, totalPaid: 21186, balanceDue: 0, paymentStatus: 'Paid' },
  { id: '5', invoiceNumber: 'INV-2026-005', salesOrderId: 'SO-2026-005', customer: 'Digital Dynamics', invoiceDate: '2026/01/19', dueDate: '2026/02/18', grandTotal: 35952, totalPaid: 35952, balanceDue: 0, paymentStatus: 'Paid' },
  { id: '6', invoiceNumber: 'INV-2026-006', salesOrderId: 'SO-2026-006', customer: 'Innovate Ltd', invoiceDate: '2026/01/20', dueDate: '2026/01/25', grandTotal: 26750, totalPaid: 0, balanceDue: 26750, paymentStatus: 'Overdue' },
  { id: '7', invoiceNumber: 'INV-2026-007', customer: 'Future Tech', invoiceDate: '2026/01/21', dueDate: '2026/02/20', grandTotal: 19795, totalPaid: 0, balanceDue: 19795, paymentStatus: 'Unpaid' },
  { id: '8', invoiceNumber: 'INV-2026-008', salesOrderId: 'SO-2026-008', customer: 'Mega Corp', invoiceDate: '2026/01/22', dueDate: '2026/02/21', grandTotal: 55640, totalPaid: 55640, balanceDue: 0, paymentStatus: 'Paid' },
  { id: '9', invoiceNumber: 'INV-2026-009', salesOrderId: 'SO-2026-009', customer: 'Prime Solutions', invoiceDate: '2026/01/23', dueDate: '2026/02/22', grandTotal: 33384, totalPaid: 20000, balanceDue: 13384, paymentStatus: 'Partially Paid' },
  { id: '10', invoiceNumber: 'INV-2026-010', salesOrderId: 'SO-2026-010', customer: 'Alpha Industries', invoiceDate: '2026/01/24', dueDate: '2026/01/29', grandTotal: 24075, totalPaid: 0, balanceDue: 24075, paymentStatus: 'Overdue' },
]
