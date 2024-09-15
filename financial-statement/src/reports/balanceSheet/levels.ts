export interface levelsType {
    id: number;
    description: string;
    children: {
        id: number;
        description: string;
        children: {
            id: number;
            description: string;
            children: {
                id: number;
                description: string;
            }[];
        }[];
    }[];
}

export const levels:levelsType[] = [
    {
        "id": 100000,
        "description": "Assets",
        "children": [
            {
                "id": 110000,
                "description": "Non-Current Assets",
                "children": [
                    {
                        "id": 110100,
                        "description": "Property, Plant, and Equipment",
                        "children": [
                            {
                                "id": 110101,
                                "description": "Land"
                            },
                            {
                                "id": 110102,
                                "description": "Buildings"
                            },
                            {
                                "id": 110103,
                                "description": "Machinery"
                            },
                            {
                                "id": 110104,
                                "description": "Vehicles"
                            },
                            {
                                "id": 110105,
                                "description": "Furniture and Fixtures"
                            }
                        ]
                    },
                    {
                        "id": 110200,
                        "description": "Intangible Assets",
                        "children": [
                            {
                                "id": 110201,
                                "description": "Goodwill"
                            },
                            {
                                "id": 110202,
                                "description": "Patents and Trademarks"
                            },
                            {
                                "id": 110203,
                                "description": "Software"
                            }
                        ]
                    },
                    {
                        "id": 110300,
                        "description": "Capital Work-in-Progress",
                        "children": [
                            {
                                "id": 110301,
                                "description": "Construction in Progress"
                            },
                            {
                                "id": 110302,
                                "description": "Machinery under Installation"
                            }
                        ]
                    }
                ]
            },
            {
                "id": 120000,
                "description": "Current Assets",
                "children": [
                    {
                        "id": 120100,
                        "description": "Inventories",
                        "children": [
                            {
                                "id": 120101,
                                "description": "Raw Materials"
                            },
                            {
                                "id": 120102,
                                "description": "Work-in-Progress"
                            },
                            {
                                "id": 120103,
                                "description": "Finished Goods"
                            },
                            {
                                "id": 120104,
                                "description": "Stock in Trade"
                            }
                        ]
                    },
                    {
                        "id": 120200,
                        "description": "Trade Receivables",
                        "children": [
                            {
                                "id": 120201,
                                "description": "Debtors"
                            },
                            {
                                "id": 120202,
                                "description": "Bills Receivable"
                            }
                        ]
                    },
                    {
                        "id": 120300,
                        "description": "Cash and Cash Equivalents",
                        "children": [
                            {
                                "id": 120301,
                                "description": "Cash in Hand"
                            },
                            {
                                "id": 120302,
                                "description": "Bank Accounts"
                            },
                            {
                                "id": 120303,
                                "description": "Short-Term Investments"
                            }
                        ]
                    },
                    {
                        "id": 120400,
                        "description": "Other Current Assets",
                        "children": [
                            {
                                "id": 120401,
                                "description": "Prepaid Expenses"
                            },
                            {
                                "id": 120402,
                                "description": "Advances to Suppliers"
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "id": 200000,
        "description": "Liabilities",
        "children": [
            {
                "id": 210000,
                "description": "Non-Current Liabilities",
                "children": [
                    {
                        "id": 210100,
                        "description": "Long-Term Borrowings",
                        "children": [
                            {
                                "id": 210101,
                                "description": "Term Loans"
                            },
                            {
                                "id": 210102,
                                "description": "Debentures"
                            },
                            {
                                "id": 210103,
                                "description": "Bonds Payable"
                            }
                        ]
                    },
                    {
                        "id": 210200,
                        "description": "Deferred Tax Liabilities",
                        "children": [
                            {
                                "id": 210201,
                                "description": "Deferred Tax on Depreciation"
                            },
                            {
                                "id": 210202,
                                "description": "Deferred Tax on Revaluation"
                            }
                        ]
                    }
                ]
            },
            {
                "id": 220000,
                "description": "Current Liabilities",
                "children": [
                    {
                        "id": 220100,
                        "description": "Short-Term Borrowings",
                        "children": [
                            {
                                "id": 220101,
                                "description": "Bank Overdraft"
                            },
                            {
                                "id": 220102,
                                "description": "Cash Credit"
                            },
                            {
                                "id": 220103,
                                "description": "Short-Term Loans"
                            }
                        ]
                    },
                    {
                        "id": 220200,
                        "description": "Trade Payables",
                        "children": [
                            {
                                "id": 220201,
                                "description": "Creditors"
                            },
                            {
                                "id": 220202,
                                "description": "Bills Payable"
                            }
                        ]
                    },
                    {
                        "id": 220300,
                        "description": "Other Current Liabilities",
                        "children": [
                            {
                                "id": 220301,
                                "description": "Statutory Dues Payable"
                            },
                            {
                                "id": 220302,
                                "description": "Employee Benefits Payable"
                            },
                            {
                                "id": 220303,
                                "description": "Accrued Expenses"
                            },
                            {
                                "id": 220304,
                                "description": "Advance from Customers"
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "id": 300000,
        "description": "Equity",
        "children": [
            {
                "id": 310000,
                "description": "Share Capital",
                "children": [
                    {
                        "id": 310100,
                        "description": "Equity Share Capital",
                        "children": [
                            {
                                "id": 310101,
                                "description": "Authorized Share Capital"
                            },
                            {
                                "id": 310102,
                                "description": "Issued Share Capital"
                            },
                            {
                                "id": 310103,
                                "description": "Subscribed and Paid-up Share Capital"
                            }
                        ]
                    },
                    {
                        "id": 310200,
                        "description": "Preference Share Capital",
                        "children": [
                            {
                                "id": 310201,
                                "description": "Authorized Preference Share Capital"
                            },
                            {
                                "id": 310202,
                                "description": "Redeemable Preference Shares"
                            },
                            {
                                "id": 310203,
                                "description": "Irredeemable Preference Shares"
                            }
                        ]
                    }
                ]
            },
            {
                "id": 320000,
                "description": "Reserves and Surplus",
                "children": [
                    {
                        "id": 320200,
                        "description": "Securities Premium Reserve",
                        "children": [
                            {
                                "id": 320200,
                                "description": "Securities Premium Reserve"
                            }
                        ]
                    },
                    {
                        "id": 320300,
                        "description": "Revaluation Reserve",
                        "children": [
                            {
                                "id": 320300,
                                "description": "Revaluation Reserve"
                            }
                        ]
                    },
                    {
                        "id": 320400,
                        "description": "Retained Earnings",
                        "children": [
                            {
                                "id": 320400,
                                "description": "Retained Earnings"
                            }
                        ]
                    },
                    {
                        "id": 320500,
                        "description": "Capital Redemption Reserve",
                        "children": [
                            {
                                "id": 320500,
                                "description": "Capital Redemption Reserve"
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "id": 400000,
        "description": "Revenue",
        "children": [
            {
                "id": 410000,
                "description": "Operating Revenue",
                "children": [
                    {
                        "id": 410100,
                        "description": "Sales Revenue",
                        "children": [
                            {
                                "id": 410101,
                                "description": "Domestic Sales"
                            },
                            {
                                "id": 410102,
                                "description": "Export Sales"
                            }
                        ]
                    },
                    {
                        "id": 410200,
                        "description": "Service Revenue",
                        "children": [
                            {
                                "id": 410201,
                                "description": "Consulting Services"
                            },
                            {
                                "id": 410202,
                                "description": "Maintenance Services"
                            }
                        ]
                    }
                ]
            },
            {
                "id": 420000,
                "description": "Other Income",
                "children": [
                    {
                        "id": 420100,
                        "description": "Interest Income",
                        "children": [
                            {
                                "id": 420100,
                                "description": "Interest Income"
                            }
                        ]
                    },
                    {
                        "id": 420200,
                        "description": "Dividend Income",
                        "children": [
                            {
                                "id": 420200,
                                "description": "Dividend Income"
                            }
                        ]
                    },
                    {
                        "id": 420300,
                        "description": "Rental Income",
                        "children": [
                            {
                                "id": 420300,
                                "description": "Rental Income"
                            }
                        ]
                    },
                    {
                        "id": 420400,
                        "description": "Profit on Sale of Assets",
                        "children": [
                            {
                                "id": 420400,
                                "description": "Profit on Sale of Assets"
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "id": 500000,
        "description": "Expenses",
        "children": [
            {
                "id": 510000,
                "description": "Cost of Goods Sold (COGS)",
                "children": [
                    {
                        "id": 510100,
                        "description": "Raw Material Consumed",
                        "children": [
                            {
                                "id": 510101,
                                "description": "Raw Material Purchases"
                            }
                        ]
                    },
                    {
                        "id": 510200,
                        "description": "Direct Labor",
                        "children": [
                            {
                                "id": 510201,
                                "description": "Wages for Production"
                            }
                        ]
                    },
                    {
                        "id": 510300,
                        "description": "Manufacturing Overheads",
                        "children": [
                            {
                                "id": 510301,
                                "description": "Factory Rent"
                            },
                            {
                                "id": 510302,
                                "description": "Power and Fuel"
                            },
                            {
                                "id": 510303,
                                "description": "Depreciation on Plant"
                            }
                        ]
                    }
                ]
            },
            {
                "id": 520000,
                "description": "Operating Expenses",
                "children": [
                    {
                        "id": 520100,
                        "description": "Administrative Expenses",
                        "children": [
                            {
                                "id": 520101,
                                "description": "Salaries and Wages"
                            },
                            {
                                "id": 520102,
                                "description": "Office Supplies"
                            },
                            {
                                "id": 520103,
                                "description": "Rent and Utilities"
                            }
                        ]
                    },
                    {
                        "id": 520200,
                        "description": "Selling and Distribution Expenses",
                        "children": [
                            {
                                "id": 520201,
                                "description": "Advertising and Marketing"
                            },
                            {
                                "id": 520202,
                                "description": "Sales Commissions"
                            },
                            {
                                "id": 520203,
                                "description": "Freight Outwards"
                            }
                        ]
                    }
                ]
            },
            {
                "id": 530000,
                "description": "Finance Costs",
                "children": [
                    {
                        "id": 530100,
                        "description": "Interest on Loans",
                        "children": [
                            {
                                "id": 530100,
                                "description": "Interest on Loans"
                            }
                        ]
                    },
                    {
                        "id": 530200,
                        "description": "Bank Charges",
                        "children": [
                            {
                                "id": 530200,
                                "description": "Bank Charges"
                            }
                        ]
                    },
                    {
                        "id": 530300,
                        "description": "Interest on Debentures",
                        "children": [
                            {
                                "id": 530300,
                                "description": "Interest on Debentures"
                            }
                        ]
                    }
                ]
            },
            {
                "id": 540000,
                "description": "Depreciation and Amortization",
                "children": [
                    {
                        "id": 540100,
                        "description": "Depreciation on Buildings",
                        "children": [
                            {
                                "id": 540100,
                                "description": "Depreciation on Buildings"
                            }
                        ]
                    },
                    {
                        "id": 540200,
                        "description": "Depreciation on Machinery",
                        "children": [
                            {
                                "id": 540200,
                                "description": "Depreciation on Machinery"
                            }
                        ]
                    },
                    {
                        "id": 540300,
                        "description": "Amortization of Intangibles",
                        "children": [
                            {
                                "id": 540300,
                                "description": "Amortization of Intangibles"
                            }
                        ]
                    }
                ]
            },
            {
                "id": 550000,
                "description": "Other Expenses",
                "children": [
                    {
                        "id": 550100,
                        "description": "Legal and Professional Fees",
                        "children": [
                            {
                                "id": 550100,
                                "description": "Legal and Professional Fees"
                            }
                        ]
                    },
                    {
                        "id": 550200,
                        "description": "Miscellaneous Expenses",
                        "children": [
                            {
                                "id": 550200,
                                "description": "Miscellaneous Expenses"
                            }
                        ]
                    }
                ]
            }
        ]
    }
]