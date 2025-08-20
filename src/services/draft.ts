// Mock draft service
export interface DraftTemplate {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  fields: FormField[];
  preview: string;
}

export interface FormField {
  id: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select' | 'date';
  required: boolean;
  options?: string[];
  placeholder?: string;
}

const mockTemplates: DraftTemplate[] = [
  {
    id: '1',
    title: 'Power of Attorney',
    description: 'Legal document granting someone authority to act on your behalf',
    category: 'Legal Authorization',
    price: 49.99,
    preview: 'This Power of Attorney grants [ATTORNEY_NAME] the authority to act on behalf of [PRINCIPAL_NAME]...',
    fields: [
      { id: 'principal_name', label: 'Principal Name (Your Name)', type: 'text', required: true },
      { id: 'principal_address', label: 'Principal Address', type: 'textarea', required: true },
      { id: 'attorney_name', label: 'Attorney-in-Fact Name', type: 'text', required: true },
      { id: 'attorney_address', label: 'Attorney-in-Fact Address', type: 'textarea', required: true },
      { id: 'powers_granted', label: 'Powers Granted', type: 'textarea', required: true, placeholder: 'Describe the specific powers being granted' },
      { id: 'effective_date', label: 'Effective Date', type: 'date', required: true },
    ],
  },
  {
    id: '2',
    title: 'Rental Agreement',
    description: 'Comprehensive rental agreement for residential properties',
    category: 'Real Estate',
    price: 39.99,
    preview: 'This Rental Agreement is between [LANDLORD_NAME] (Landlord) and [TENANT_NAME] (Tenant)...',
    fields: [
      { id: 'landlord_name', label: 'Landlord Name', type: 'text', required: true },
      { id: 'tenant_name', label: 'Tenant Name', type: 'text', required: true },
      { id: 'property_address', label: 'Property Address', type: 'textarea', required: true },
      { id: 'rent_amount', label: 'Monthly Rent', type: 'text', required: true, placeholder: '$0.00' },
      { id: 'lease_term', label: 'Lease Term', type: 'select', required: true, options: ['6 months', '1 year', '2 years'] },
      { id: 'start_date', label: 'Lease Start Date', type: 'date', required: true },
      { id: 'security_deposit', label: 'Security Deposit', type: 'text', required: true, placeholder: '$0.00' },
    ],
  },
  {
    id: '3',
    title: 'Affidavit',
    description: 'Sworn written statement of fact for legal proceedings',
    category: 'Legal Declaration',
    price: 29.99,
    preview: 'I, [AFFIANT_NAME], being duly sworn, depose and state as follows...',
    fields: [
      { id: 'affiant_name', label: 'Affiant Name (Person Making Statement)', type: 'text', required: true },
      { id: 'affiant_address', label: 'Affiant Address', type: 'textarea', required: true },
      { id: 'statement_title', label: 'Statement Title', type: 'text', required: true },
      { id: 'statement_body', label: 'Statement of Facts', type: 'textarea', required: true, placeholder: 'State the facts you are swearing to be true' },
      { id: 'date_of_oath', label: 'Date of Oath', type: 'date', required: true },
    ],
  },
  {
    id: '4',
    title: 'Non-Disclosure Agreement',
    description: 'Protect confidential information with a comprehensive NDA',
    category: 'Business',
    price: 59.99,
    preview: 'This Non-Disclosure Agreement is between [DISCLOSING_PARTY] and [RECEIVING_PARTY]...',
    fields: [
      { id: 'disclosing_party', label: 'Disclosing Party', type: 'text', required: true },
      { id: 'receiving_party', label: 'Receiving Party', type: 'text', required: true },
      { id: 'purpose', label: 'Purpose of Disclosure', type: 'textarea', required: true },
      { id: 'confidential_info', label: 'Definition of Confidential Information', type: 'textarea', required: true },
      { id: 'term_duration', label: 'Term Duration', type: 'select', required: true, options: ['1 year', '2 years', '3 years', '5 years', 'Indefinite'] },
      { id: 'effective_date', label: 'Effective Date', type: 'date', required: true },
    ],
  },
];

export const draftAPI = {
  getTemplates: async (): Promise<DraftTemplate[]> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    return mockTemplates;
  },

  getTemplate: async (id: string): Promise<DraftTemplate> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const template = mockTemplates.find(t => t.id === id);
    if (!template) {
      throw new Error('Template not found');
    }
    return template;
  },

  submitCustomization: async (templateId: string, data: Record<string, string>) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
      id: 'draft-' + Date.now(),
      templateId,
      data,
      status: 'pending_payment',
    };
  },
};