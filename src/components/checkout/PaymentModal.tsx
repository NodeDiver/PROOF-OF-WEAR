'use client';

import { useEffect, useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { X, Loader2, CheckCircle, AlertCircle, Zap, Copy, Check } from 'lucide-react';
import { launchPaymentModal } from '@getalby/bitcoin-connect-react';
import { QRCodeSVG } from 'qrcode.react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import type { NWCInvoice } from '@/types';

interface PaymentModalProps {
  invoice: NWCInvoice;
  onSuccess: () => void;
  onClose: () => void;
}

/**
 * Neo-Brutalist Payment Modal
 * Displays QR code, countdown timer, and Bitcoin Connect integration
 */
export function PaymentModal({ invoice, onSuccess, onClose }: PaymentModalProps) {
  const t = useTranslations('payment');
  const [status, setStatus] = useState<'pending' | 'paid' | 'expired'>('pending');
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const [useBitcoinConnect, setUseBitcoinConnect] = useState(false);
  const [copied, setCopied] = useState(false);

  // Poll for payment status
  useEffect(() => {
    if (status !== 'pending') return;

    const pollStatus = async () => {
      try {
        const response = await fetch(`/api/invoices/${invoice.paymentHash}/status`);
        const data = await response.json();

        if (data.paid) {
          setStatus('paid');
          setTimeout(onSuccess, 1500); // Brief celebration before redirect
        }
      } catch (error) {
        console.error('Error polling status:', error);
      }
    };

    const interval = setInterval(pollStatus, 2000);
    return () => clearInterval(interval);
  }, [invoice.paymentHash, status, onSuccess]);

  // Countdown timer
  useEffect(() => {
    if (status !== 'pending' || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setStatus('expired');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [status, timeLeft]);

  // Launch Bitcoin Connect modal
  const handleBitcoinConnect = useCallback(() => {
    setUseBitcoinConnect(true);
    launchPaymentModal({
      invoice: invoice.bolt11,
      onPaid: () => {
        setStatus('paid');
        setTimeout(onSuccess, 1500);
      },
      onCancelled: () => {
        setUseBitcoinConnect(false);
      },
    });
  }, [invoice.bolt11, onSuccess]);

  // Copy invoice to clipboard
  const handleCopy = async () => {
    await navigator.clipboard.writeText(invoice.bolt11);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
      <Card className="w-full max-w-md animate-in fade-in zoom-in duration-200">
        <CardContent className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-2xl uppercase flex items-center gap-2">
              <Zap className="text-accent" size={24} />
              {t('title')}
            </h2>
            <button
              onClick={onClose}
              className={cn(
                'p-2 transition-colors',
                'hover:bg-muted',
                'border-[2px] border-transparent hover:border-border'
              )}
              aria-label="Close"
            >
              <X size={20} />
            </button>
          </div>

          {/* Status-based content */}
          {status === 'pending' && (
            <>
              {/* Amount */}
              <div className="text-center mb-6">
                <p className="text-muted-foreground text-sm">{t('amount')}</p>
                <p className="font-mono text-3xl font-bold text-accent">
                  {invoice.amountSats.toLocaleString()} sats
                </p>
              </div>

              {/* QR Code */}
              <div
                className={cn(
                  'bg-white p-4 mx-auto w-fit',
                  'border-[3px] border-border',
                  'shadow-[4px_4px_0px_0px_var(--border)]'
                )}
              >
                <QRCodeSVG
                  value={invoice.bolt11.toUpperCase()}
                  size={200}
                  level="M"
                  includeMargin={false}
                />
              </div>

              {/* Timer */}
              <div className="text-center mt-4">
                <p className="text-muted-foreground text-sm">{t('expiresIn')}</p>
                <p className={cn(
                  'font-mono text-xl',
                  timeLeft < 60 && 'text-fire'
                )}>
                  {formatTime(timeLeft)}
                </p>
              </div>

              {/* Status indicator */}
              <div className="flex items-center justify-center gap-2 mt-4 text-muted-foreground">
                <Loader2 className="animate-spin" size={16} />
                <span className="text-sm">{t('waitingForPayment')}</span>
              </div>

              {/* Bitcoin Connect button */}
              <Button
                variant="primary"
                size="lg"
                className="w-full mt-6"
                onClick={handleBitcoinConnect}
                disabled={useBitcoinConnect}
              >
                {useBitcoinConnect ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    {t('connecting')}
                  </>
                ) : (
                  <>
                    <Zap size={20} />
                    {t('payWithWallet')}
                  </>
                )}
              </Button>

              {/* Copy invoice */}
              <button
                onClick={handleCopy}
                className={cn(
                  'w-full mt-3 py-2 text-sm',
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
                    {t('copyInvoice')}
                  </>
                )}
              </button>
            </>
          )}

          {status === 'paid' && (
            <div className="text-center py-8">
              <CheckCircle className="mx-auto text-green-500 mb-4" size={64} />
              <p className="font-display text-2xl uppercase">{t('paymentSuccess')}</p>
              <p className="text-muted-foreground mt-2">{t('redirecting')}</p>
            </div>
          )}

          {status === 'expired' && (
            <div className="text-center py-8">
              <AlertCircle className="mx-auto text-fire mb-4" size={64} />
              <p className="font-display text-2xl uppercase">{t('invoiceExpired')}</p>
              <p className="text-muted-foreground mt-2">{t('pleaseRetry')}</p>
              <Button variant="primary" className="mt-4" onClick={onClose}>
                {t('tryAgain')}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
