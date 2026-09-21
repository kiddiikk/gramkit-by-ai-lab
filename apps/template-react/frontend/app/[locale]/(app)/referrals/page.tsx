'use client';

import { useState } from 'react';
import { Copy, Gift, Percent, ChevronDown, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { BackButton } from '@/components/shared/BackButton';

const REFERRAL_PERCENT = 20;

export default function ReferralsPage() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const referralLink = 'https://t.me/feelit_ailab_bot?start=ref_XXXXXX';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };

  return (
    <div className="min-h-dvh px-5 py-6 space-y-6">
      <div className="flex items-center gap-3 motion-opacity-in-[0%] motion-translate-y-in-[15px] motion-duration-[0.5s] motion-ease-spring-smooth">
        <BackButton />
        <div className="space-y-0.5">
          <h1 className="text-2xl font-bold tracking-tight">Мои рефералы</h1>
          <p className="text-sm text-muted-foreground">Приглашай друзей — получай бонусы</p>
        </div>
      </div>

      <div className="rounded-2xl bg-gradient-to-br from-primary/[0.08] to-primary/[0.02] p-5 space-y-4 motion-opacity-in-[0%] motion-translate-y-in-[20px] motion-duration-[0.6s] motion-ease-spring-smooth">
        <div className="text-center space-y-1">
          <div className="text-4xl font-bold tabular-nums">0</div>
          <div className="text-xs text-muted-foreground">приглашённых друзей</div>
        </div>

        <div className="rounded-lg bg-background/50 px-3 py-2.5 text-xs text-muted-foreground break-all text-center">
          {referralLink}
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center justify-center gap-2 w-full h-10 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors active:scale-[0.98] cursor-pointer"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          {copied ? 'Скопировано' : 'Скопировать ссылку'}
        </button>
      </div>

      <div className="space-y-1">
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between py-3 cursor-pointer text-sm font-semibold hover:text-primary transition-colors"
        >
          <span>О реферальной программе</span>
          <ChevronDown
            className={cn(
              'w-4 h-4 text-muted-foreground transition-transform duration-300',
              open && 'rotate-180'
            )}
          />
        </button>
        <div
          className={cn(
            'overflow-hidden transition-all duration-300 ease-out',
            open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          )}
        >
          <div className="space-y-4 pt-1 pb-2">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-primary/10 shrink-0">
                <Percent className="w-4 h-4 text-primary" />
              </div>
              <div className="space-y-0.5">
                <div className="text-sm font-medium">Ты получаешь {REFERRAL_PERCENT}%</div>
                <div className="text-xs text-muted-foreground leading-relaxed">
                  от каждой покупки приглашённого — Stars падают на твой счёт
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-primary/10 shrink-0">
                <Gift className="w-4 h-4 text-primary" />
              </div>
              <div className="space-y-0.5">
                <div className="text-sm font-medium">Друг тоже в плюсе</div>
                <div className="text-xs text-muted-foreground leading-relaxed">
                  получает бонусные дни при первой оплате по твоей ссылке
                </div>
              </div>
            </div>

            <div className="space-y-2 pt-1">
              <div className="text-sm font-medium">Как это работает</div>
              <ol className="text-xs text-muted-foreground space-y-1.5 leading-relaxed">
                <li>1. Отправь другу свою ссылку</li>
                <li>2. Друг запускает бота по ссылке</li>
                <li>3. Он оформляет подписку</li>
                <li>4. Ты получаешь {REFERRAL_PERCENT}% Stars на счёт</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
