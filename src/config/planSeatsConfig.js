// Pricing constants
export const PRICING = {
  COLD_CALLER: 1080,
  ACQUISITION_MANAGER: 1800,
  DISPOSITION_MANAGER: 1800,
  LIST: 500, // per 50,000 records
  DIALER_MONTHLY: 200,
};

// Default form data
export const getDefaultFormData = () => ({
  coldCallers: {
    enabled: false,
    numberOfCallers: 2,
    hourlyRate: 4,
    numberOfDialers: 1,
    totalCost: 0,
  },
  acquisitionManager: {
    enabled: false,
    numberOfManagers: 2,
    hourlyRate: 4,
    totalCost: 0,
  },
  dispositions: {
    enabled: false,
    numberOfDispositions: 2,
    hourlyRate: 4,
    totalCost: 0,
  },
  listPrice: {
    enabled: false,
    quantity: 1000,
    pricePerClient: 0.2,
    totalCost: 0,
  },
});

// Section configurations
export const leftColumnSections = [
  {
    key: "coldCallers",
    label: "Cold Callers",
    fieldRows: [
      {
        gridClass: "grid grid-cols-2 gap-4",
        fields: [
          {
            key: "numberOfCallers",
            label: "Number of Cold Callers",
            type: "number",
            placeholder: "2",
          },
          {
            key: "hourlyRate",
            label: "Hourly Rate",
            type: "number",
            placeholder: "4",
          },
        ],
      },
      {
        gridClass: "grid grid-cols-2 gap-4",
        fields: [
          {
            key: "numberOfDialers",
            label: "Number of Dialers",
            type: "number",
            placeholder: "1",
          },
          {
            key: "totalCost",
            label: "Total Cost",
            type: "text",
            placeholder: "1000$",
            disabled: true,
          },
        ],
      },
    ],
  },
  {
    key: "acquisitionManager",
    label: "Acquisition Manager",
    fieldRows: [
      {
        gridClass: "",
        fields: [
          {
            key: "numberOfManagers",
            label: "Number of Acquisition managers",
            type: "number",
            placeholder: "2",
          },
        ],
      },
      {
        gridClass: "grid grid-cols-2 gap-4",
        fields: [
          {
            key: "hourlyRate",
            label: "Hourly Rate",
            type: "number",
            placeholder: "4",
          },
          {
            key: "totalCost",
            label: "Total Cost",
            type: "text",
            placeholder: "1000$",
            disabled: true,
          },
        ],
      },
    ],
  },
];

export const rightColumnSections = [
  {
    key: "dispositions",
    label: "Dispositions",
    fieldRows: [
      {
        gridClass: "",
        fields: [
          {
            key: "numberOfDispositions",
            label: "Number of Dispositions",
            type: "number",
            placeholder: "2",
          },
        ],
      },
      {
        gridClass: "grid grid-cols-2 gap-4",
        fields: [
          {
            key: "hourlyRate",
            label: "Hourly Rate",
            type: "number",
            placeholder: "4",
            hint: "For reference only (not used in calculation)",
          },
          {
            key: "totalCost",
            label: "Total Cost",
            type: "text",
            placeholder: "1000$",
            disabled: true,
            hint: "Auto-calculated: Dispositions × $1,800",
          },
        ],
      },
    ],
  },
  {
    key: "listPrice",
    label: "List Price",
    fieldRows: [
      {
        gridClass: "grid grid-cols-3 gap-4",
        fields: [
          {
            key: "quantity",
            label: "Quantity",
            type: "number",
            placeholder: "1000",
          },
          {
            key: "pricePerClient",
            label: "Price / Client",
            type: "number",
            step: "0.01",
            placeholder: "0.2",
          },
          {
            key: "totalCost",
            label: "Total Cost",
            type: "text",
            placeholder: "200$",
            disabled: true,
          },
        ],
      },
    ],
  },
];
