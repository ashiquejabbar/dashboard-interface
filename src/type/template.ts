export interface WhatsAppTemplate {
    id: string;
    name: string;
    category: 'MARKETING';
    status: 'PENDING' | 'APPROVED' | 'REJECTED';
    createdAt: string;
    sections: {
      header: {
        text: string;
      };
      body: {
        text: string;
      };
      footer: {
        text: string;
      };
      buttons: {
        type: 'URL';
        text: string;
        url: string;
      }[];
    };
  }
  