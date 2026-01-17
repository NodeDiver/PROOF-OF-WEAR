'use client';

import { useState } from 'react';
import { Zap, RefreshCw, Wallet, Copy, Check } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { cn } from '@/lib/utils';

interface WalletInfo {
  name: string;
  balance: number;
  role: 'sender' | 'receiver' | null;
}

/**
 * Pipeline Test Page
 * For testing Lightning payments with dual wallets
 * Access at: /pipeline-test
 */
export default function PipelineTestPage() {
  const [walletA, setWalletA] = useState<WalletInfo>({ name: 'Wallet A', balance: 0, role: null });
  const [walletB, setWalletB] = useState<WalletInfo>({ name: 'Wallet B', balance: 0, role: null });
  const [testStatus, setTestStatus] = useState<'idle' | 'running' | 'success' | 'error'>('idle');
  const [log, setLog] = useState<string[]>([]);
  const [currentInvoice, setCurrentInvoice] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLog((prev) => [...prev, `[${timestamp}] ${message}`]);
  };

  // Assign random roles (50/50)
  const assignRoles = () => {
    const random = Math.random() > 0.5;
    setWalletA((prev) => ({ ...prev, role: random ? 'sender' : 'receiver' }));
    setWalletB((prev) => ({ ...prev, role: random ? 'receiver' : 'sender' }));
    addLog(`Roles assigned: ${random ? 'A→B' : 'B→A'}`);
  };

  // Copy invoice to clipboard
  const handleCopy = async () => {
    if (currentInvoice) {
      await navigator.clipboard.writeText(currentInvoice);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Run test payment
  const runTest = async () => {
    setTestStatus('running');
    setLog([]);
    setCurrentInvoice(null);
    addLog('Starting test payment...');

    try {
      assignRoles();

      // Create order with 1-sat test product
      addLog('Creating order with Propaganda Pack (1 sat)...');
      const orderRes = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: [{ productId: 'stickers-propaganda', quantity: 1 }],
          customer: {
            email: 'test@pipeline.local',
            fullName: 'Pipeline Test',
            address: '21 Satoshi Street',
            city: 'Bitcoin City',
            country: 'Cryptoland',
            postalCode: '21000000',
          },
          totalSats: 1,
        }),
      });

      if (!orderRes.ok) {
        throw new Error('Failed to create order');
      }

      const order = await orderRes.json();
      addLog(`Order created: ${order.id}`);

      // Create invoice
      addLog('Creating Lightning invoice via NWC...');
      const invoiceRes = await fetch('/api/invoices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId: order.id, amountSats: 1 }),
      });

      if (!invoiceRes.ok) {
        const error = await invoiceRes.json();
        throw new Error(error.error || 'Failed to create invoice');
      }

      const invoice = await invoiceRes.json();
      addLog(`Invoice created!`);
      addLog(`Payment Hash: ${invoice.paymentHash.substring(0, 24)}...`);
      setCurrentInvoice(invoice.bolt11);

      addLog('');
      addLog('=== SCAN QR OR COPY INVOICE ===');
      addLog('Pay this invoice to complete the test');
      addLog('');
      addLog('Polling for payment status...');

      // Poll for payment
      let attempts = 0;
      const maxAttempts = 60; // 2 minutes

      const poll = setInterval(async () => {
        attempts++;
        try {
          const statusRes = await fetch(`/api/invoices/${invoice.paymentHash}/status`);
          const status = await statusRes.json();

          if (status.paid) {
            clearInterval(poll);
            addLog('');
            addLog('=== PAYMENT CONFIRMED! ===');
            addLog(`Preimage: ${status.preimage?.substring(0, 24)}...`);
            setTestStatus('success');
          } else if (attempts >= maxAttempts) {
            clearInterval(poll);
            addLog('Timeout - payment not received within 2 minutes');
            setTestStatus('error');
          } else if (attempts % 5 === 0) {
            addLog(`Still waiting... (${attempts * 2}s elapsed)`);
          }
        } catch {
          // Ignore polling errors
        }
      }, 2000);

    } catch (error) {
      addLog(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setTestStatus('error');
    }
  };

  // Reset test
  const resetTest = () => {
    setTestStatus('idle');
    setLog([]);
    setCurrentInvoice(null);
    setWalletA((prev) => ({ ...prev, role: null }));
    setWalletB((prev) => ({ ...prev, role: null }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="font-display text-4xl uppercase mb-2 text-center">
        Pipeline Test Page
      </h1>
      <p className="text-muted-foreground text-center mb-8">
        Lightning Payment E2E Testing
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Wallet A */}
        <Card
          className={cn(
            walletA.role === 'sender' && 'border-fire',
            walletA.role === 'receiver' && 'border-green-500'
          )}
        >
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Wallet size={24} />
              <h2 className="font-display text-xl uppercase">{walletA.name}</h2>
            </div>
            <p className="font-mono text-2xl" data-wallet-1-balance>
              {walletA.balance} sats
            </p>
            {walletA.role && (
              <p
                className={cn(
                  'mt-2 text-sm font-bold uppercase',
                  walletA.role === 'sender' ? 'text-fire' : 'text-green-500'
                )}
              >
                {walletA.role}
              </p>
            )}
          </CardContent>
        </Card>

        {/* Wallet B */}
        <Card
          className={cn(
            walletB.role === 'sender' && 'border-fire',
            walletB.role === 'receiver' && 'border-green-500'
          )}
        >
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Wallet size={24} />
              <h2 className="font-display text-xl uppercase">{walletB.name}</h2>
            </div>
            <p className="font-mono text-2xl" data-wallet-2-balance>
              {walletB.balance} sats
            </p>
            {walletB.role && (
              <p
                className={cn(
                  'mt-2 text-sm font-bold uppercase',
                  walletB.role === 'sender' ? 'text-fire' : 'text-green-500'
                )}
              >
                {walletB.role}
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* QR Code Display */}
      {currentInvoice && testStatus === 'running' && (
        <Card className="max-w-md mx-auto mt-8">
          <CardContent className="p-6">
            <h3 className="font-display text-lg uppercase mb-4 text-center">
              Scan to Pay (1 sat)
            </h3>
            <div
              className={cn(
                'bg-white p-4 mx-auto w-fit',
                'border-[3px] border-border',
                'shadow-[4px_4px_0px_0px_var(--border)]'
              )}
            >
              <QRCodeSVG
                value={currentInvoice.toUpperCase()}
                size={200}
                level="M"
                includeMargin={false}
              />
            </div>
            <button
              onClick={handleCopy}
              className={cn(
                'w-full mt-4 py-2 text-sm',
                'text-muted-foreground hover:text-foreground',
                'flex items-center justify-center gap-2',
                'transition-colors'
              )}
            >
              {copied ? (
                <>
                  <Check size={16} className="text-green-500" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy size={16} />
                  Copy Invoice
                </>
              )}
            </button>
          </CardContent>
        </Card>
      )}

      {/* Controls */}
      <div className="flex justify-center gap-4 mt-8">
        <Button
          variant="primary"
          size="lg"
          onClick={runTest}
          disabled={testStatus === 'running'}
          data-run-test
        >
          {testStatus === 'running' ? (
            <>
              <RefreshCw className="animate-spin" size={20} />
              Running...
            </>
          ) : (
            <>
              <Zap size={20} />
              Run Test Payment
            </>
          )}
        </Button>

        {testStatus !== 'idle' && testStatus !== 'running' && (
          <Button variant="secondary" size="lg" onClick={resetTest}>
            Reset
          </Button>
        )}
      </div>

      {/* Status */}
      <div className="text-center mt-4">
        <span
          data-payment-status
          className={cn(
            'font-mono text-lg',
            testStatus === 'success' && 'text-green-500',
            testStatus === 'error' && 'text-fire',
            testStatus === 'idle' && 'text-muted-foreground',
            testStatus === 'running' && 'text-accent'
          )}
        >
          {testStatus}
        </span>
      </div>

      {/* Log */}
      <Card className="max-w-4xl mx-auto mt-8">
        <CardContent className="p-4">
          <h3 className="font-display text-lg uppercase mb-2">Test Log</h3>
          <div className="bg-muted p-4 h-64 overflow-y-auto font-mono text-sm border-[2px] border-border">
            {log.length === 0 ? (
              <span className="text-muted-foreground">
                Click &quot;Run Test Payment&quot; to start...
              </span>
            ) : (
              log.map((entry, i) => (
                <div key={i} className={entry.includes('===') ? 'text-accent font-bold' : ''}>
                  {entry}
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Instructions */}
      <Card className="max-w-4xl mx-auto mt-8">
        <CardContent className="p-6">
          <h3 className="font-display text-lg uppercase mb-4">How to Test</h3>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li>Configure NWC_URL in .env.local (receiver wallet)</li>
            <li>Click &quot;Run Test Payment&quot; to create a 1 sat invoice</li>
            <li>Scan the QR code with any Lightning wallet</li>
            <li>Pay the 1 sat invoice</li>
            <li>Watch the status change to &quot;success&quot;</li>
          </ol>
        </CardContent>
      </Card>
    </div>
  );
}
