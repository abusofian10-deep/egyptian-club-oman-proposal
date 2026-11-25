import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ProposalApp } from './ProposalApp';

const root = document.getElementById('proposal-root');
if (root) {
  createRoot(root).render(
    <StrictMode>
      <ProposalApp />
    </StrictMode>
  );
}
